import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

// Importación de Páginas (de src/pages/)
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import type { NavbarProps } from './components/Navbar'; // Usamos el tipo de la Navbar

// --- 1. Componente Guardián de Rutas (ProtectedRoute) ---
/**
 * Un componente que protege rutas. Si el usuario no está logueado,
 * redirige a la ruta de Login.
 */
interface ProtectedRouteProps {
    isLoggedIn: boolean;
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    // Si no está logueado, lo envía a /login (con 'replace' para no dejar historial)
    return <Navigate to="/login" replace />; 
  }
  return children;
};


// --- 2. Componente Principal App ---
export const App: React.FC = () => {
  // --- Estado Global de Autenticación (Simple) ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  // NOTA: En un proyecto real, usarías useEffect aquí para:
  // 1. Cargar el token/estado de autenticación del localStorage.
  // 2. Verificar si el token es válido.
  // useEffect(() => { /* Cargar estado de auth */ }, []);

  // --- Funciones de Manejo de Navegación y Autenticación ---
  const handleLoginSuccess = (user: { name: string, token: string }) => {
    // Lógica para guardar el token y actualizar el estado
    setIsLoggedIn(true);
    setUserName(user.name);
    // Redirigir al usuario al Home después de un login exitoso
    navigate('/'); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName(undefined);
    navigate('/login');
  };

  const handleNavigateToLogin = () => navigate('/login');
  const handleNavigateToRegister = () => navigate('/register');
  const handleNavigateToProfile = () => alert('Navegando a la página de perfil...');


  const commonNavbarProps: NavbarProps = {
    appName: "HotelManager",
    isLoggedIn: isLoggedIn,
    userName: userName,
    onLogin: handleNavigateToLogin,
    onLogout: handleLogout,
    onNavigateToProfile: handleNavigateToProfile,
  };

  return (
    <Routes>
      
      <Route path="/" element={
        <ProtectedRoute isLoggedIn={isLoggedIn}>
          <HomePage {...commonNavbarProps} />
        </ProtectedRoute>
      } />
      
      <Route 
          path="/login" 
          element={<LoginPage onLoginSuccess={handleLoginSuccess} />} 
      />
      <Route 
          path="/register" 
          element={<RegisterPage onRegisterSuccess={() => navigate('/login')} />} 
      />
      
      <Route 
          path="*" 
          element={
            <div className="p-8 text-center min-h-screen bg-gray-50">
              <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
              <p className="text-gray-700">Página no encontrada.</p>
              <button 
                  onClick={() => navigate('/')} 
                  className="mt-4 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
              >
                  Ir a Inicio
              </button>
            </div>
          } 
      />

    </Routes>
  );
};
