"use server";

import crypto from "crypto";
import { Resend } from "resend";
import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);

// Admin credentials configured from env with secure fallbacks
const ADMIN_CREDENTIALS = {
  email: (process.env.ADMIN_EMAIL || "admin@civicsplease.gov").trim().toLowerCase(),
  password: process.env.ADMIN_PASSWORD || "AdminPassword123@",
};

// Cryptographic password hashing using native scrypt
function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

// Timing-safe password verification with legacy plaintext fallback
function verifyPassword(password: string, storedHash: string): boolean {
  if (!storedHash) return false;
  
  // Legacy plaintext support (for previously registered test accounts)
  if (!storedHash.includes(":")) {
    return password === storedHash;
  }

  const [salt, key] = storedHash.split(":");
  if (!salt || !key) return false;

  const derivedKey = crypto.scryptSync(password, salt, 64);
  const keyBuffer = Buffer.from(key, "hex");
  
  if (keyBuffer.length !== derivedKey.length) return false;
  return crypto.timingSafeEqual(keyBuffer, derivedKey);
}

export async function registerUser(formData: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const name = formData.name ? formData.name.trim().slice(0, 80) : "";
    const email = formData.email ? formData.email.trim().toLowerCase().slice(0, 120) : "";
    const password = formData.password ? formData.password.trim() : "";

    // Input validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return { success: false, error: "Please provide a valid email address." };
    }

    if (!name || name.length < 2) {
      return { success: false, error: "Please enter your name (minimum 2 characters)." };
    }

    if (!password || password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters long." };
    }

    if (password.length > 128) {
      return { success: false, error: "Password cannot exceed 128 characters." };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, error: "This email address is already registered." };
    }

    const hashedPassword = hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Optional email dispatch (non-blocking)
    try {
      await resend.emails.send({
        from: "Civics Please <onboarding@resend.dev>",
        to: email,
        subject: "CIVICS PLEASE: Verify Your Citizen Account",
        html: `
          <div style="font-family: monospace; background-color: #050806; color: #ffffff; padding: 40px;">
            <h2 style="color: #4ade80;">OFFICIAL SYSTEM NOTICE</h2>
            <p>Citizen <strong>${name}</strong>,</p>
            <p>Your registration request for the Civics Please portal has been received and saved to the secure database.</p>
            <br/>
            <p style="color: #9ca3af; font-size: 12px;">You can now log in to the portal using your credentials.</p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.warn("Registration confirmation email not sent (sandbox mode):", emailErr);
    }

    return { 
      success: true, 
      user: { id: newUser.id, name: newUser.name, email: newUser.email } 
    };
  } catch (error) {
    console.error("Database registration error:", error);
    return { success: false, error: "Database error during registration." };
  }
}

export async function loginUser(formData: { email: string; password: string }) {
  try {
    const emailInput = formData.email ? formData.email.trim().toLowerCase() : "";
    const passwordInput = formData.password ? formData.password.trim() : "";

    if (!emailInput || !passwordInput) {
      return { success: false, error: "Email and password are required." };
    }

    // 1. Check Admin Credentials
    if (emailInput === ADMIN_CREDENTIALS.email && passwordInput === ADMIN_CREDENTIALS.password) {
      const cookieStore = await cookies();
      cookieStore.set("user_session", "ADMIN_ROOT_USER", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return { 
        success: true, 
        userId: "ADMIN_ROOT_USER", 
        isAdmin: true 
      };
    }

    // 2. Check regular user in database
    const user = await prisma.user.findUnique({
      where: { email: emailInput },
    });

    if (!user || !verifyPassword(passwordInput, user.password)) {
      return { success: false, error: "Invalid email or password." };
    }

    // Upgrade plaintext legacy password to hashed password if encountered
    if (!user.password.includes(":")) {
      try {
        await prisma.user.update({
          where: { id: user.id },
          data: { password: hashPassword(passwordInput) },
        });
      } catch (upgradeErr) {
        console.warn("Could not upgrade legacy password hash:", upgradeErr);
      }
    }

    // Set secure user session cookie
    const cookieStore = await cookies();
    cookieStore.set("user_session", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return { 
      success: true, 
      userId: user.id, 
      isAdmin: false 
    };
  } catch (error: any) {
    console.error("Login error:", error);
    return { 
      success: false, 
      error: "Database error during login. Please try again." 
    };
  }
}

export async function logoutUser() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("user_session");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}