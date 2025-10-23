import { NextResponse } from "next/server";
import { HotelServiceImplementation } from "../../../../../service/hotel-service";
import { Hotel } from "../../../../../../../../domain/src/entities/hotel";

const hotelService = new HotelServiceImplementation();

export async function GET() {
  try {
    const hotels: Hotel[] = await hotelService.findHotelAll();
    return NextResponse.json(hotels, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const requiredFields = ["id", "name", "address", "description"];
    
    for (const field of requiredFields) {
      if (!data[field]) {
        throw new Error(`Missind required field: ${field}`);
      }
    }
    const rooms = data.rooms || [];
    
    const newHotel: Hotel = {
      id: data.id,
      name: data.name,
      address: data.address,
      description: data.description,
      rooms
    };

    await hotelService.saveHotel(newHotel);

    return NextResponse.json(
      { message: "Created hotel successfully", hotel: newHotel },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
