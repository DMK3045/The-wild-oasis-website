import { getBookedDatesByCabinId, getCabin } from '@/app/_lib/data-service';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const cabinId = Number(params.cabinId);

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    return NextResponse.json({ cabin, bookedDates });
  } catch {
    return NextResponse.json({ message: 'Cabin not found' });
  }
}
