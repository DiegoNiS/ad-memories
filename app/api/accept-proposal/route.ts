import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    const newRecord = await prisma.proposalResponse.create({
      data: {
        accepted: true,
        acceptedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      acceptedAt: newRecord.acceptedAt,
    });
  } catch (error) {
    console.error('Error recording proposal acceptance:', error);
    return NextResponse.json({ success: false, error: 'Database record failed' }, { status: 500 });
  }
}
