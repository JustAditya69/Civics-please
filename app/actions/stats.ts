// app/actions/stats.ts
"use server";

import { prisma } from "@/app/lib/prisma";

export async function getLandingPageStats() {
  try {
    // 1. Overall Stats
    const total = await prisma.report.count();
    const resolved = await prisma.report.count({ where: { status: "RESOLVED" } });
    const inProgress = await prisma.report.count({ where: { status: "IN_PROGRESS" } });
    
    // 2. This Month's Stats
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const thisMonthTotal = await prisma.report.count({ 
      where: { createdAt: { gte: startOfMonth } } 
    });
    const thisMonthResolved = await prisma.report.count({ 
      where: { status: "RESOLVED", createdAt: { gte: startOfMonth } } 
    });
    const thisMonthInProgress = await prisma.report.count({ 
      where: { status: "IN_PROGRESS", createdAt: { gte: startOfMonth } } 
    });

    // 3. Category Breakdowns (using loose matching for your progress bars)
    const roads = await prisma.report.count({ where: { category: { contains: "Road", mode: "insensitive" } } });
    const garbage = await prisma.report.count({ where: { category: { contains: "Garbage", mode: "insensitive" } } });
    const lights = await prisma.report.count({ where: { category: { contains: "Light", mode: "insensitive" } } });
    const water = await prisma.report.count({ where: { category: { contains: "Water", mode: "insensitive" } } });

    return {
      total,
      resolved,
      inProgress,
      thisMonthTotal,
      thisMonthResolved,
      thisMonthInProgress,
      categories: { roads, garbage, lights, water }
    };
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    // Fallback data if DB is empty or fails
    return {
      total: 0, resolved: 0, inProgress: 0,
      thisMonthTotal: 0, thisMonthResolved: 0, thisMonthInProgress: 0,
      categories: { roads: 0, garbage: 0, lights: 0, water: 0 }
    };
  }
}