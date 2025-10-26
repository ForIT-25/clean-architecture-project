import { NextResponse } from "next/server";
import { HotelServiceImplementation } from "@hotel-project/backend";
import { Hotel } from "@hotel-project/domain";

const hotelService = new HotelServiceImplementation();

export async function GET(
    request: Request, 
    { params }: { params: { hotelId: string } }
) {
  const { hotelId } = params;

  try {
    const hotel: Hotel | undefined = await hotelService.findHotelById(hotelId);

    if (!hotel) {
      return NextResponse.json({ error: "Hotel Not found" }, { status: 404 });
    }

    return NextResponse.json(hotel, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(
    request: Request, 
    { params }: { params: { hotelId: string } }
) {
  const { hotelId } = params;

  try {
    const data = await request.json();

    if (!hotelId || Object.keys(data).length === 0) {
      return NextResponse.json({ error: "Missing Update data." }, { status: 400 });
    }

    await hotelService.updateHotel(hotelId, data);

    return NextResponse.json(
      { message: `Hotel ${hotelId} updated successfully` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}

export async function DELETE(
    request: Request, 
    { params }: { params: { hotelId: string } }
) {
  const { hotelId } = params;
  
  try {
    await hotelService.deleteHotel(hotelId);

    return new NextResponse(null, { status: 204 }); 
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
