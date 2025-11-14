import { NextResponse } from 'next/server';
import { deleteBooking, updateBooking, findBookingById  } from '@hotel-project/domain';
import { BookingService, BookingUpdateData } from '@hotel-project/domain';
import { BookingServiceImplementation } from '@hotel-project/backend';

const service: BookingService = new BookingServiceImplementation();

interface Params {
    params: {
        bookingId: string;
    };
}

function mapDomainErrorToHttp(error: Error): NextResponse {
    if (error.message.includes('required') || error.message.includes('positive') || error.message.includes('date')) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
    console.error('Unhandled internal server error:', error);
    return NextResponse.json(
        { message: 'Internal Server Error' }, 
        { status: 500 }
    );
}

export async function GET(request: Request, { params }: Params) {
  const { bookingId } = params;

  try {
    const booking = await findBookingById(service, bookingId); 
    
    if (!booking) {
      return NextResponse.json({ message: `Booking with ID ${bookingId} not found.` }, { status: 404 });
    }
    return NextResponse.json(booking, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
        return mapDomainErrorToHttp(error);
    }
    return NextResponse.json({ message: 'Internal Server Error fetching booking.' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  const { bookingId } = params;

  try {
    const updates: BookingUpdateData = await request.json();
    
    if (updates.startDate) updates.startDate = new Date(updates.startDate);
    if (updates.endDate) updates.endDate = new Date(updates.endDate);

    const updatedBooking = await updateBooking(service, bookingId, updates);

    if (!updatedBooking) {
      return NextResponse.json({ message: `Booking with ID ${bookingId} not found for update.` }, { status: 404 });
    }
    return NextResponse.json(updatedBooking, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
        return mapDomainErrorToHttp(error);
    }
    return NextResponse.json({ message: 'Internal Server Error updating booking.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const { bookingId } = params;

  try {
    await deleteBooking(service, bookingId);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error) {
        return mapDomainErrorToHttp(error);
    }
    return NextResponse.json({ message: 'Internal Server Error deleting booking.' }, { status: 500 });
  }
}
