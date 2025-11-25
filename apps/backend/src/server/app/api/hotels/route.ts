import { NextResponse } from "next/server";
import { HotelServiceImplementation } from "@hotel-project/backend";
import { Hotel, HotelService, createHotel, CreateHotelData, findHotelAll } from "@hotel-project/domain";

const getHotelService = (): HotelService => {
  return new HotelServiceImplementation(); 
};

export async function GET() {
  try {
    const service: HotelService = getHotelService()
    const hotels: Hotel[] = await findHotelAll({ hotelService: service });
    
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
    const service: HotelService = getHotelService()
    const data = await request.json();
    const requiredFields = ["name", "address", "description"];
    
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` }, 
          { status: 400 } 
        );
      }
    }
    
    const createHotelData: CreateHotelData = {
      name: data.name,
      address: data.address,
      description: data.description,
    };

    const newHotel = await createHotel(createHotelData, { 
      hotelService: service 
    });

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
