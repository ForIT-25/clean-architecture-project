import { NextResponse } from "next/server";
import { RoomServiceImplementation } from "../../../../../service/index"; 
import { Room, createRoom, RoomService, CreateRoomData, findRoomsByHotelId } from "@hotel-project/domain";

const getRoomService = (): RoomService => {
  return new RoomServiceImplementation(); 
};

type HotelRoomParams = {
  params: Promise<{ hotelId: string }>;
};

export async function GET(
  request: Request,
  { params }: HotelRoomParams,
  service: RoomService = getRoomService()
) {
  try {
    const { hotelId } = await params;

    const rooms: Room[] = await findRoomsByHotelId(service, hotelId);

    return NextResponse.json(rooms, { status: 200 });
  } catch (error) {
    const errorMessage = (error as Error).message;
    
    if (errorMessage.includes("Hotel ID is required")) {
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: HotelRoomParams,
  service: RoomService = getRoomService()
) {
  try {
    const { hotelId } = await params;
    const data = await request.json();
    
    const requiredFields: (keyof CreateRoomData)[] = [
      "name", "type", "description", "price", "isAvailable"
    ];
    
    for (const field of requiredFields) {
      if (data[field] === undefined) { 
        return NextResponse.json(
          { error: `Missing required field: ${field}` }, 
          { status: 400 } 
        );
      }
    }
    
    const createRoomData: CreateRoomData = {
      ...data,
      hotelId: hotelId,
    }

    const newRoom: Room = await createRoom(service, createRoomData); 

    return NextResponse.json(
      { message: "Created room successfully", room: newRoom },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage = (error as Error).message;
    
    if (errorMessage.includes("Price must be positive")) {
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
