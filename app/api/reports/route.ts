import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    const reports = await prisma.report.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      select: {
        id: true,
        trackingId: true,
        category: true,
        title: true,
        description: true,
        imageUrl: true,
        latitude: true,
        longitude: true,
        address: true,
        priority: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json(reports);
  } catch (error) {
    console.error("API GET /api/reports error:", error);
    return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 });
  }
}
