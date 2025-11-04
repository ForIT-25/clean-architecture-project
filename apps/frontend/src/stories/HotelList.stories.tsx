import type { Meta, StoryObj } from '@storybook/react';
import { HotelList } from '../components/HotelList';
import type { HotelListProps } from '../components/HotelList';
import type { Hotel } from '../components/HotelCard';

const mockHotels: Hotel[] = [
  { id: '1', name: 'Grand Hyatt', address: 'Buenos Aires, Argentina', description: 'Hotel de Lujo', imageUrl: 'https://www.grandimperial.com.my/wp-content/uploads/2024/02/Grand-Imperial-Group-Outlet-Banner-3.jpg' },
  { id: '2', name: 'Sheraton Tower', address: 'Santiago, Chile', description: 'Hotel Internacional', imageUrl: 'https://via.placeholder.com/300x200?text=Sheraton' },
  { id: '3', name: 'Hilton Garden', address: 'Lima, Perú', description: 'Hotel y Naturaleza', imageUrl: 'https://via.placeholder.com/300x200?text=Hilton' },
];

const meta: Meta<HotelListProps> = {
  title: 'Components/HotelList',
  component: HotelList,
  parameters: {
    layout: 'fullscreen', 
  },
  args: {
    onSelectHotel: (id) => console.log('Hotel seleccionado:', id),
  },
};

export default meta;

type Story = StoryObj<HotelListProps>;

export const EmptyList: Story = {
  args: {
    hotels: [],
  },
};

export const FullList: Story = {
  args: {
    hotels: mockHotels,
  },
};

export const LoadingState: Story = {
  args: {
    hotels: null,
    loading: true,
  },
};

export const ErrorState: Story = {
  args: {
    hotels: null,
    error: 'The hotels could not be found.',
  },
};
