import { NextResponse } from "next/server";
import { RoomServiceImplementation } from "../../../../service/index";
import { Room, RoomService, UpdateRoomData, findRoomById, updateRoom, deleteRoom } from "@hotel-project/domain";

const getRoomService = (): RoomService => {
  return new RoomServiceImplementation(); 
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ roomId: string }> },
  service: RoomService = getRoomService()
) {
  try {
    const { roomId } = await params;

    const room: Room | undefined = await findRoomById(service, roomId);

    if (!room) {
      return NextResponse.json({ error: `Room ID ${roomId} Not found` }, { status: 404 });
    }

    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    const errorMessage = (error as Error).message;
    if (errorMessage.includes("required for searching")) {
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ roomId: string }> },
  service: RoomService = getRoomService()
) {
  try {
    const { roomId } = await params;
    const updates = await request.json();

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "Missing Update data. Body is empty." }, 
        { status: 400 }
      );
    }
    
    const updatedRoom = await updateRoom(service, roomId, updates as UpdateRoomData);
    
    if (!updatedRoom) {
      throw new Error(`Room with ID ${roomId} not found`);
    }

    return NextResponse.json(updatedRoom, { status: 200 });
  } catch (error) {
    const errorMessage = (error as Error).message;

    if (errorMessage.includes("must be positive")) {
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
  { params }: { params: Promise<{ roomId: string }> },
  service: RoomService = getRoomService()
) {
  try {
    const { roomId } = await params;

    await deleteRoom(service, roomId);

    return new NextResponse(null, { status: 204 }); 
  } catch (error) {
    const errorMessage = (error as Error).message;

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
