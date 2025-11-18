import React, { useState, useEffect } from 'react';
import { Navbar, type NavbarProps } from '../components/Navbar';
import { HotelList } from '../components/HotelList';
import type { Hotel } from '@hotel-project/domain'
import { fetchAllHotels } from '../services/api';

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
    const loadHotels = async () => {
      try {
        setLoading(true);
        setError(undefined);

        const data = await fetchAllHotels();
        
        setHotels(data);
      } catch (err) {
        console.error("Error fetching hotels:", err);
        setError(
          (err as Error).message || 'Fallo al cargar hoteles desde el servidor.'
        );
        setHotels(null);
      } finally {
        setLoading(false);
      }
    };

    loadHotels();
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
