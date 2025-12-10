import { NextResponse } from 'next/server';
import { findBookingsByUserId, BookingService } from '@hotel-project/domain';
import { BookingServiceImplementation } from '../../../../../service/index'; 

const service: BookingService = new BookingServiceImplementation();

interface Params {
  userId: string;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<Params> }
) {
  const { userId } = await params;

  try {
    const bookings = await findBookingsByUserId(service, userId);

    return NextResponse.json(bookings, { status: 200 });

  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('required')) {
        return NextResponse.json({ message: error.message }, { status: 400 });
      }
    }

    console.error(`Error fetching bookings for user ${userId}:`, error);
    return NextResponse.json(
      { message: 'Internal Server Error while fetching bookings by user.' },
      { status: 500 }
    );
  }
}
