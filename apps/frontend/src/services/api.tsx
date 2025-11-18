import type { 
  Hotel, 
  CreateHotelData, 
  UpdateHotelParams, 
  Room,
  CreateRoomData,
  UpdateRoomData,
  Booking,
  BookingCreateData,
  BookingUpdateData,
} from "@hotel-project/domain";

const API_BASE_URL = 'localhost:3000';
const API_URL_HOTEL = `${API_BASE_URL}/api/hotels`;
const API_URL_ROOM = `${API_BASE_URL}/api/rooms`;
const API_URL_BOOKING = `${API_BASE_URL}/api/bookings`;

export async function fetchAllHotels(): Promise<Hotel[]> {
  const response = await fetch(API_URL_HOTEL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ error: "Error desconocido" }));
    throw new Error(errorBody.error || `Fallo al obtener hoteles: ${response.statusText}`);
  }

  return (await response.json()) as Hotel[];
}

export async function createNewHotel(data: CreateHotelData): Promise<Hotel> {
  const response = await fetch(API_URL_HOTEL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ error: "Error desconocido" }));
    throw new Error(errorBody.error || `Fallo al crear hotel: ${response.statusText}`);
  }
  const result = await response.json();

  return result.hotel as Hotel;
}

export async function fetchHotelById(hotelId: string): Promise<Hotel> {
  const url = `${API_URL_HOTEL}/${hotelId}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ error: "Hotel no encontrado" }));
    throw new Error(
      errorBody.error || `Fallo al obtener hotel ${hotelId}: ${response.statusText}`
    );
  }

  return (await response.json()) as Hotel;
}

export async function updateExistingHotel(
  hotelId: string, 
  updates: UpdateHotelParams
): Promise<Hotel> {
  const url = `${API_URL_HOTEL}/${hotelId}`;
  
  if (Object.keys(updates).length === 0) {
      throw new Error("Missing Update data.");
  }
  
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ error: "Error de actualización" }));
    throw new Error(
      errorBody.error || `Fallo al actualizar hotel ${hotelId}: ${response.statusText}`
    );
  }

  return (await response.json()) as Hotel;
}

export async function deleteHotelById(hotelId: string): Promise<void> {
  const url = `${API_URL_HOTEL}/${hotelId}`;
  const response = await fetch(url, {
    method: "DELETE",
  });

  if (response.status === 204) {
    return;
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ error: "Error de eliminación" }));
    throw new Error(errorBody.error || `Fallo al eliminar hotel ${hotelId}: ${response.statusText}`);
  }
}

export async function fetchRoomsByHotelId(hotelId: string): Promise<Room[]> {
  const url = `${API_URL_HOTEL}/${hotelId}/rooms`;
  const response = await fetch(url, { method: "GET" });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ error: "Error desconocido" }));
    throw new Error(
      errorBody.error || `Fallo al obtener habitaciones del hotel ${hotelId}: ${response.statusText}`
    );
  }

  return (await response.json()) as Room[];
}

export async function createNewRoom(
  hotelId: string, 
  data: Omit<CreateRoomData, 'hotelId'>
): Promise<Room> {
  const url = `${API_URL_HOTEL}/${hotelId}/rooms`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ error: "Error desconocido" }));
    throw new Error(
      errorBody.error || `Fallo al crear habitación en hotel ${hotelId}: ${response.statusText}`
    );
  }
  const result = await response.json();

  return result.room as Room;
}

export async function fetchRoomById(roomId: string): Promise<Room> {
  const url = `${API_URL_ROOM}/${roomId}`;
  const response = await fetch(url, { method: "GET" });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ error: "Habitación no encontrada" }));
    throw new Error(
      errorBody.error || `Fallo al obtener habitación ${roomId}: ${response.statusText}`
    );
  }

  return (await response.json()) as Room;
}

export async function updateExistingRoom(
  roomId: string, 
  updates: UpdateRoomData
): Promise<Room> {
  const url = `${API_URL_ROOM}/${roomId}`;
  
  if (Object.keys(updates).length === 0) {
      throw new Error("Missing Update data.");
  }
  
  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ error: "Error de actualización" }));
    throw new Error(
      errorBody.error || `Fallo al actualizar habitación ${roomId}: ${response.statusText}`
    );
  }
  return (await response.json()) as Room;
}

export async function deleteRoomById(roomId: string): Promise<void> {
  const url = `${API_URL_ROOM}/${roomId}`;
  const response = await fetch(url, { method: "DELETE" });

  if (response.status === 204) { return; }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ error: "Error de eliminación" }));
    throw new Error(
      errorBody.error || `Fallo al eliminar habitación ${roomId}: ${response.statusText}`
    );
  }
}

export async function fetchAllBookings(): Promise<Booking[]> {
  const response = await fetch(API_URL_BOOKING, { method: "GET" });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => (
      { error: "Error desconocido" })
    );
    throw new Error(
      errorBody.error || `Fallo al obtener todas las reservas: ${response.statusText}`
    );
  }

  return (await response.json()) as Booking[];
}

export async function createNewBooking(data: BookingCreateData): Promise<Booking> {
  const response = await fetch(API_URL_BOOKING, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ error: "Error desconocido" }));
    throw new Error(
      errorBody.error || `Fallo al crear reserva: ${response.statusText}`
    );
  }

  return (await response.json()) as Booking;
}

export async function fetchBookingById(bookingId: string): Promise<Booking> {
  const url = `${API_URL_BOOKING}/${bookingId}`;
  const response = await fetch(url, { method: "GET" });

  if (response.status === 404) {
     throw new Error(`Booking ID ${bookingId} not found.`);
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ error: "Error desconocido" }));
    throw new Error(
      errorBody.error || `Fallo al obtener reserva ${bookingId}: ${response.statusText}`
    );
  }

  return (await response.json()) as Booking;
}

export async function updateExistingBooking(
  bookingId: string, 
  updates: BookingUpdateData
): Promise<Booking> {
  const url = `${API_URL_BOOKING}/${bookingId}`;
  
  if (Object.keys(updates).length === 0) {
      throw new Error("Missing Update data.");
  }
  
  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  if (response.status === 404) {
     throw new Error(`Booking ID ${bookingId} not found for update.`);
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ error: "Error de actualización" }));
    throw new Error(
      errorBody.error || `Fallo al actualizar reserva ${bookingId}: ${response.statusText}`
    );
  }
  return (await response.json()) as Booking;
}

export async function deleteBookingById(bookingId: string): Promise<void> {
  const url = `${API_URL_BOOKING}/${bookingId}`;
  const response = await fetch(url, { method: "DELETE" });

  if (response.status === 204) { return; }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ error: "Error de eliminación" }));
    throw new Error(
      errorBody.error || `Fallo al eliminar reserva ${bookingId}: ${response.statusText}`
    );
  }
}

export async function fetchBookingsByRoomId(roomId: string): Promise<Booking[]> {
  const url = `${API_URL_BOOKING}/room/${roomId}`;
  const response = await fetch(url, { method: "GET" });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ error: "Error desconocido" }));
    throw new Error(
      errorBody.error || `Fallo al obtener reservas para habitación ${roomId}: ${response.statusText}`
    );
  }

  return (await response.json()) as Booking[];
}

export async function fetchBookingsByUserId(userId: string): Promise<Booking[]> {
  const url = `${API_URL_BOOKING}/user/${userId}`;
  const response = await fetch(url, { method: "GET" });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ error: "Error desconocido" }));
    throw new Error(
      errorBody.error || `Fallo al obtener reservas para usuario ${userId}: ${response.statusText}`
    );
  }

  return (await response.json()) as Booking[];
}
