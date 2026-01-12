import { NextRequest, NextResponse } from 'next/server';
import { insertHistory } from '@/lib/dbWrk';

export const dynamic = 'force-dynamic';

// In-memory storage for wheel values (since we can't use WebSockets)
// In production, you'd want to use Redis or a database for this
let globalWheelValues = {
  a1: null, a2: null, b1: null, b2: null, c1: null, c2: null
};

let lastUpdateTime = Date.now();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { a1, a2, b1, b2, c1, c2 } = body;

    // Update global wheel values
    if (a1 !== undefined) globalWheelValues.a1 = a1;
    if (a2 !== undefined) globalWheelValues.a2 = a2;
    if (b1 !== undefined) globalWheelValues.b1 = b1;
    if (b2 !== undefined) globalWheelValues.b2 = b2;
    if (c1 !== undefined) globalWheelValues.c1 = c1;
    if (c2 !== undefined) globalWheelValues.c2 = c2;

    lastUpdateTime = Date.now();

    // Insert history (this might need optimization for high traffic)
    await insertHistory(globalWheelValues);

    return NextResponse.json({
      success: true,
      wheelValues: globalWheelValues,
      timestamp: lastUpdateTime
    });
  } catch (error) {
    console.error('User selection error:', error);
    return NextResponse.json({ error: 'Failed to process selection' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      wheelValues: globalWheelValues,
      lastUpdateTime,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Get wheel values error:', error);
    return NextResponse.json({ error: 'Failed to get wheel values' }, { status: 500 });
  }
}
