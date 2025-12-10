import { NextResponse } from 'next/server';
import { 
  deleteBooking, 
  updateBooking, 
  findBookingById, 
  BookingService, 
  BookingUpdateData 
} from '@hotel-project/domain';
import { BookingServiceImplementation } from '../../../../service/index';

const getBookingService = (): BookingService => {
  return new BookingServiceImplementation();
};

function mapDomainErrorToHttp(error: Error): NextResponse {
  const errorMessage = error.message;
  
  if (errorMessage.includes('required') || errorMessage.includes('positive') || errorMessage.includes('date')) {
    return NextResponse.json({ message: errorMessage }, { status: 400 }); 
  }
  if (errorMessage.includes('not found')) {
    return NextResponse.json({ message: errorMessage }, { status: 404 });
  }
  
  console.error('Unhandled internal server error:', error);
  return NextResponse.json(
    { message: 'Internal Server Error' }, 
    { status: 500 }
  );
}

export async function GET(
  request: Request, 
  { params }: { params: Promise<{ bookingId: string }> },
  service: BookingService = getBookingService()
) {
  const { bookingId } = await params;

  try {
    const booking = await findBookingById(service, bookingId);
    
    if (!booking) {
      return NextResponse.json({ message: `Booking with ID ${bookingId} not found.` }, { status: 404 });
    }

    return NextResponse.json(booking, { status: 200 });
  } catch (error) {
    if (error instanceof Error) return mapDomainErrorToHttp(error);
    return NextResponse.json({ message: 'Internal Server Error fetching booking.' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ bookingId: string }> },
  service: BookingService = getBookingService()
) {
  const { bookingId } = await params;

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
    if (error instanceof Error) return mapDomainErrorToHttp(error);
    return NextResponse.json({ message: 'Internal Server Error updating booking.' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request, 
  { params }: { params: Promise<{ bookingId: string }> },
  service: BookingService = getBookingService()
){
  const { bookingId } = await params;

  try {
    await deleteBooking(service, bookingId);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error) return mapDomainErrorToHttp(error);
    return NextResponse.json({ message: 'Internal Server Error deleting booking.' }, { status: 500 });
  }
}
