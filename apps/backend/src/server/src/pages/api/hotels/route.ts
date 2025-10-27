import { NextResponse } from "next/server";
import { HotelServiceImplementation } from "@hotel-project/backend";
import { CreateHotelData, Hotel } from "@hotel-project/domain";

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
    const requiredFields = ["name", "address", "description"];
    
    for (const field of requiredFields) {
      if (!data[field]) {
        throw new Error(`Missind required field: ${field}`);
      }
    }
    
    const createHotelData: CreateHotelData = {
      name: data.name,
      address: data.address,
      description: data.description,
    };

    const newHotel = await hotelService.registerHotel(createHotelData);

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
