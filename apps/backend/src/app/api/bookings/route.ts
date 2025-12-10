import { NextResponse } from 'next/server';
import { findBookingAll,
  createBooking,
  BookingService,
  BookingCreateData } from '@hotel-project/domain';
import { BookingServiceImplementation } from '../../../service/index'; 

const service: BookingService = new BookingServiceImplementation; 

export async function GET() {
  try {
    const bookings = await findBookingAll(service);
    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error('Error fetching all bookings:', error);
    return NextResponse.json(
      { message: 'Internal Server Error fetching all bookings.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data: BookingCreateData = await request.json();
    
    data.startDate = new Date(data.startDate);
    data.endDate = new Date(data.endDate);

    const newBooking = await createBooking(service, data);

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
        if (error.message.includes('required') || error.message.includes('positive') || error.message.includes('date')) {
            return NextResponse.json({ message: error.message }, { status: 400 });
        }
    }
    console.error('Error creating booking:', error);
    return NextResponse.json(
        { message: 'Internal Server Error while creating booking.' }, 
        { status: 500 }
    );
  }
}
