"use server";

import { prisma } from "@/app/lib/prisma";

export async function submitContactQuery(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    const name = formData.name ? formData.name.trim().slice(0, 80) : "";
    const email = formData.email ? formData.email.trim().toLowerCase().slice(0, 120) : "";
    const subject = formData.subject ? formData.subject.trim().slice(0, 150) : "";
    const message = formData.message ? formData.message.trim().slice(0, 3000) : "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return { success: false, error: "Please enter a valid email address." };
    }

    if (!name || name.length < 2) {
      return { success: false, error: "Please enter a valid name." };
    }

    if (!message || message.length < 5) {
      return { success: false, error: "Message must be at least 5 characters long." };
    }

    await prisma.contactQuery.create({
      data: {
        name,
        email,
        subject: subject || "Citizen Inquiry",
        message,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to submit contact query:", error);
    return { success: false, error: "Failed to send message to the server." };
  }
}