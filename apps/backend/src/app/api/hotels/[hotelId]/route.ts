import { NextResponse } from "next/server";
import { HotelServiceImplementation } from "../../../../service/index";
import { 
  Hotel, 
  HotelService, 
  findHotelById, 
  deleteHotel, 
  updateHotel, 
  UpdateHotelParams 
} from "@hotel-project/domain";

const getHotelService = (): HotelService => {
  return new HotelServiceImplementation(); 
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ hotelId: string }> },
  service: HotelService = getHotelService()
) {
  const { hotelId } = await params;

  try {
    const hotel: Hotel | undefined = await findHotelById(hotelId, { hotelService: service });

    if (!hotel) {
      return NextResponse.json({ error: "Hotel Not found" }, { status: 404 });
    }

    return NextResponse.json(hotel, { status: 200 });
  } catch (error) {
    if ((error as Error).message.includes("required")) {
      return NextResponse.json(
        { error: (error as Error).message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ hotelId: string }> },
  service: HotelService = getHotelService()
) {
  const { hotelId } = await params;

  try {
    const data = await request.json();

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "Missing Update data." }, { status: 400 });
    }

    const updates: UpdateHotelParams = data;

    const updatedHotel: Hotel | undefined = await updateHotel(
      hotelId,
      updates,
      { hotelService: service }
    );

    return NextResponse.json(updatedHotel, { status: 200 });
  } catch (error) {
    const errorMessage = (error as Error).message;

    if (errorMessage.includes("Invalid update request")) {
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    if (errorMessage.includes("not found")) {
      return NextResponse.json({ error: errorMessage }, { status: 404 });
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ hotelId: string }> },
  service: HotelService = getHotelService()
) {
  const { hotelId } = await params;

  try {
    await deleteHotel(hotelId, { hotelService: service });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    const errorMessage = (error as Error).message;

    if (errorMessage.includes("Hotel ID is required for deletion")) {
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
