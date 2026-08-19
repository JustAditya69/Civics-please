"use server";

import { prisma } from "@/app/lib/prisma";

export async function submitContactQuery(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    await prisma.contactQuery.create({
      data: {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to submit contact query:", error);
    return { success: false, error: "Failed to send message to the server." };
  }
}