import React from 'react';

export interface Hotel {
  id: string;
  name: string;
  address: string;
  description: string;
  imageUrl: string;
}

interface HotelCardProps {
  hotel: Hotel;
  onSelect: (hotelId: string) => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel, onSelect }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl cursor-pointer"
      onClick={() => onSelect(hotel.id)}
    >
      <img
        className="w-full h-48 object-cover"
        src={hotel.imageUrl}
        alt={`Imagen de ${hotel.name}`}
      />
      <div className="p-4 space-y-1">
        <h3 className="text-xl font-semibold text-gray-900">{hotel.name}</h3>
        <p className="text-sm text-gray-600">
          {hotel.address}, {hotel.description}
        </p>
      </div>
    </div>
  );
};
