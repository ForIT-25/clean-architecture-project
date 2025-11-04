# Sistema de Gestión Hotelera

Aplicación para la administración de hoteles desarrollada con **React**, **Vite**, **Tailwind CSS**, **TypeScript** y **Storybook**.

## Características

- **Autenticación**: Login y registro de usuarios
- **Gestión de Hoteles**: Visualización de hoteles disponibles
- **Reservas**: Sistema de reservas de habitaciones
- **Panel de Usuario**: Visualización de reservas propias
- **Panel de Administración**: Gestión de hoteles, habitaciones y reservas
- **Storybook**: Documentación de componentes

## Tecnologías

- React 18
- TypeScript 5
- Tailwind CSS 3
- Storybook 7
- Vite 5

## Instalación

```bash
# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev

# Iniciar Storybook
npm run storybook

# Build para producción
npm run build

# Build de Storybook
npm run build-storybook
```

## Estructura del Proyecto

```
src/
├── assets/
├── components/
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── HotelList.tsx
│   ├── HotelCard.tsx
│   ├── Navbar.tsx
│   ├── MyReservations.tsx
│   └── AdminPanel.tsx
├── pages/
│   └── HomePage.tsx
├── services/
│   └── api.tsx
├── stories/
│   ├── Login.stories.tsx
│   ├── Register.stories.tsx
│   ├── HotelList.stories.tsx
│   ├── HotelCard.stories.tsx
│   ├── Navbar.stories.tsx
│   ├── MyReservations.stories.tsx
│   └── AdminPanel.stories.tsx
├── App.tsx
└── main.tsx
```
