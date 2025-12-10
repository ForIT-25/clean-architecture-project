import { NextResponse } from 'next/server';
import { findBookingsByRoomId, BookingService } from '@hotel-project/domain';
import { BookingServiceImplementation } from '../../../../../service/index'; 

const service: BookingService = new BookingServiceImplementation();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ roomId: string }> }
) {
  const { roomId } = await params;

  try {
    const bookings = await findBookingsByRoomId(service, roomId);

    return NextResponse.json(bookings, { status: 200 });

  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('required')) {
        return NextResponse.json({ message: error.message }, { status: 400 });
      }
    }

    console.error(`Error fetching bookings for room ${roomId}:`, error);

    return NextResponse.json(
      { message: 'Internal Server Error while fetching bookings by room.' },
      { status: 500 }
    );
  }
}
