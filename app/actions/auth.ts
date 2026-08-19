"use server";

import { Resend } from "resend";
import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);

// Define your hardcoded/provided admin credentials here
const ADMIN_CREDENTIALS = {
  email: "admin@civicsplease.gov", // Change this to your preferred admin email
  password: "AdminPassword123@",    // Change this to your preferred admin password
};

export async function registerUser(formData: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: formData.email },
    });

    if (existingUser) {
      return { success: false, error: "Email is already registered." };
    }

    const newUser = await prisma.user.create({
      data: {
        name: formData.name,
        email: formData.email,
        password: formData.password, 
      },
    });

    await resend.emails.send({
      from: "Civics Please <support@civicsplease.com>",
      to: formData.email,
      subject: "CIVICS PLEASE: Verify Your Citizen Account",
      html: `
        <div style="font-family: monospace; background-color: #050806; color: #ffffff; padding: 40px;">
          <h2 style="color: #4ade80;">OFFICIAL SYSTEM NOTICE</h2>
          <p>Citizen <strong>${formData.name}</strong>,</p>
          <p>Your registration request for the Civics Please portal has been received and saved to the secure database.</p>
          <br/>
          <a href="http://localhost:3000/login" style="background-color: #4ade80; color: #000000; padding: 12px 24px; text-decoration: none; font-weight: bold;">
            ACCESS PORTAL LOGIN
          </a>
        </div>
      `,
    });

    return { success: true, user: newUser };
  } catch (error) {
    console.error("Database registration error:", error);
    return { success: false, error: "Internal server error during registration." };
  }
}

export async function loginUser(formData: { email: string; password: string }) {
  try {
    const emailInput = formData.email.trim().toLowerCase();

    // 1. Check if login attempt matches the hardcoded admin credentials
    if (emailInput === ADMIN_CREDENTIALS.email.toLowerCase() && formData.password === ADMIN_CREDENTIALS.password) {
      const cookieStore = await cookies();
      cookieStore.set("user_session", "ADMIN_ROOT_USER", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return { 
        success: true, 
        userId: "ADMIN_ROOT_USER", 
        isAdmin: true 
      };
    }

    // 2. Otherwise, check regular user in the database
    const user = await prisma.user.findUnique({
      where: { email: emailInput },
    });

    if (!user || user.password !== formData.password) {
      return { success: false, error: "Invalid email or password." };
    }

    // Set user session cookie
    const cookieStore = await cookies();
    cookieStore.set("user_session", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
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
    return { success: false, error: "Database connection error during login." };
  }
}