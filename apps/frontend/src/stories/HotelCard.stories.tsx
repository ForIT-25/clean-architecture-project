import type { Meta, StoryObj } from "@storybook/react";
import { HotelCard } from "../components/HotelCard";
import type { Hotel } from "../components/HotelCard";

const FiveStarHotel: Hotel = {
  id: 'H001',
  name: 'The Grand Imperial',
  address: 'Buenos Aires, Argentina',
  description: 'Hotel de Lujo',
  imageUrl: 'https://www.grandimperial.com.my/wp-content/uploads/2024/02/Grand-Imperial-Group-Outlet-Banner-3.jpg',
};

const PremiumHotel: Hotel = {
  id: 'H002',
  name: 'Hotel Laplace',
  address: 'Córdoba, Argentina',
  description: 'Hotel de Lujo',
  imageUrl: 'https://turismo.cordoba.gob.ar/wp-content/uploads/2021/11/Hotel-Laplace-1-533x300.jpg',
};

const meta: Meta<typeof HotelCard> = {
  title: "Components/HotelCard",
  component: HotelCard,
  args: {
    hotel: FiveStarHotel,
    onSelect: (id) => console.log('Card Selected:', id),
  },
  parameters: {
    layout: 'centered',
  }
};

export default meta;

type Story = StoryObj<typeof HotelCard>;

export const FiveStar: Story = {
  args: {
  },
};

export const PremiumFriendly: Story = {
  args: {
    hotel: PremiumHotel,
  },
};

export const LongName: Story = {
  args: {
    hotel: {
      ...FiveStarHotel,
      name: 'El Mejor Hotel 5 Estrellas del Continente, para disfrutar en familia o en pareja',
    },
  },
};
