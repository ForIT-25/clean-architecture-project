import React, { useState, useEffect } from 'react';
import { Navbar, type NavbarProps } from '../components/Navbar';
import { HotelList } from '../components/HotelList';
import type { Hotel } from '../components/HotelCard'; 

const mockHotels: Hotel[] = [
  { 
    id: '1',
    name: 'Grand Hyatt',
    address: 'Buenos Aires, Argentina',
    description: 'Hotel de Lujo',
    imageUrl: 'https://www.grandimperial.com.my/wp-content/uploads/2024/02/Grand-Imperial-Group-Outlet-Banner-3.jpg'
  },
  { 
    id: '2',
    name: 'Sheraton Tower',
    address: 'Santiago, Chile',
    description: 'Hotel Internacional',
    imageUrl: 'https://via.placeholder.com/300x200?text=Sheraton' 
  },
  { 
    id: '3',
    name: 'Hilton Garden',
    address: 'Lima, Perú',
    description: 'Hotel y Naturaleza',
    imageUrl: 'https://via.placeholder.com/300x200?text=Hilton' 
  },
];

export const HomePage: React.FC<NavbarProps> = ({
    appName,
    isLoggedIn,
    userName,
    onLogin,
    onLogout,
    onNavigateToProfile,
}) => {
  const [hotels, setHotels] = useState<Hotel[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setHotels(mockHotels);
      setLoading(false);
      //setError('Fallo la conexión con el servidor');
    }, 1000);
  }, []);

  const handleSelectHotel = (hotelId: string) => {
    const hotel = hotels?.find(h => h.id === hotelId);
    alert(`Hotel seleccionado: ${hotel?.name} (ID: ${hotelId})`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        appName={appName}
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogin={onLogin}
        onLogout={onLogout}
        onNavigateToProfile={onNavigateToProfile}
      />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4 px-6">
          Explora Hoteles
        </h1>
        <HotelList
          hotels={hotels}
          loading={loading}
          error={error}
          onSelectHotel={handleSelectHotel}
        />
      </main>
    </div>
  );
};
