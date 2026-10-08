import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const latestResponse = await prisma.proposalResponse.findFirst({
      where: { accepted: true },
      orderBy: { acceptedAt: 'desc' },
    });

    if (latestResponse) {
      return NextResponse.json({
        accepted: true,
        acceptedAt: latestResponse.acceptedAt,
      });
    }

    return NextResponse.json({ accepted: false });
  } catch (error) {
    console.error('Error checking proposal status:', error);
    return NextResponse.json({ accepted: false, error: 'Database check failed' }, { status: 500 });
  }
}
