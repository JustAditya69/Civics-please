import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data || typeof data !== 'object') {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    const category = typeof data.category === 'string' ? data.category.trim().slice(0, 100) : '';
    const title = typeof data.title === 'string' ? data.title.trim().slice(0, 150) : (category || 'Civic Issue');
    const description = typeof data.description === 'string' ? data.description.trim().slice(0, 2000) : '';

    if (!category || !description) {
      return NextResponse.json({ error: 'Category and description are required.' }, { status: 400 });
    }

    const numLat = Number(data.latitude);
    const numLng = Number(data.longitude);
    const validCoords = !isNaN(numLat) && !isNaN(numLng) && numLat >= -90 && numLat <= 90 && numLng >= -180 && numLng <= 180;

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const trackingId = `CP-2026-${randomNum}`;

    const newReport = await prisma.report.create({
      data: {
        trackingId,
        category,
        title,
        description,
        latitude: validCoords ? String(numLat) : '0.0',
        longitude: validCoords ? String(numLng) : '0.0',
        address: typeof data.address === 'string' ? data.address.trim().slice(0, 250) : 'Unknown Address',
        imageUrl: typeof data.imageUrl === 'string' && data.imageUrl.length < 8000000 ? data.imageUrl : null,
        priority: 'Medium',
        status: 'AWAITING_REVIEW'
      },
      select: {
        id: true,
        trackingId: true,
        category: true,
        title: true,
        description: true,
        address: true,
        status: true,
        priority: true,
        createdAt: true,
      }
    });

    return NextResponse.json({ success: true, report: newReport });
  } catch (error) {
    console.error("API POST /api/reports/create error:", error);
    return NextResponse.json({ error: 'Failed to create report' }, { status: 500 });
  }
}
