import React from 'react';
import type{ Hotel } from './HotelCard';
import { HotelCard } from './HotelCard';

export interface HotelListProps {
  hotels: Hotel[] | null;
  loading?: boolean;
  error?: string;
  onSelectHotel: (hotelId: string) => void;
}

export const HotelList: React.FC<HotelListProps> = ({
  hotels,
  loading = false,
  error,
  onSelectHotel,
}) => {
  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading hotels...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center bg-red-100 text-red-700 rounded-md">
        Error loading hotels: {error}
      </div>
    );
  }

  if (!hotels || hotels.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 border border-dashed rounded-md">
        No hotels were found matching the search.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} onSelect={onSelectHotel} />
      ))}
    </div>
  );
};
