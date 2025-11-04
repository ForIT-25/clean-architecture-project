import React, { useState, useCallback } from 'react';
import { HomePage } from './pages/HomePage';
import { Login, type LoginProps } from './components/Login';
import { Register, type RegisterData } from './components/Register';

type AppView = 'home' | 'login' | 'register';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const handleLoginSubmit = useCallback((data: { email: string; password: string }) => {
    console.log("Intentando iniciar sesión con:", data);
    if (data.email === 'demo@app.com' && data.password === 'password') {
      setIsAuthenticated(true);
      setUserName('Usuario Demo');
      setCurrentView('home');
      alert('¡Inicio de sesión exitoso!');
    } else {
      alert('Error: Credenciales incorrectas');
    }
  }, []);

  const handleRegisterSubmit = useCallback((data: RegisterData) => {
    console.log("Intentando registrar usuario:", data);
    if (data.password !== data.confirm) {
      alert('Error: Las contraseñas no coinciden');
      return;
    }
    alert(`Registro exitoso para ${data.name}. Por favor, inicie sesión.`);
    setCurrentView('login');
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setUserName(undefined);
    setCurrentView('login');
  }, []);

  const handleNavigateToProfile = useCallback(() => {
    alert('Navegando a la vista de Perfil. (Aún no implementada)');
  }, []);

  const renderView = () => {
    if (!isAuthenticated && currentView !== 'register') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <Login 
                    onSubmit={handleLoginSubmit} 
                />
                <button 
                    onClick={() => setCurrentView('register')}
                    className="absolute bottom-10 text-sm text-blue-600 hover:text-blue-700"
                >
                    ¿No tienes cuenta? Regístrate aquí
                </button>
            </div>
        );
    }
    
    if (currentView === 'register') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <Register 
                    onSubmit={handleRegisterSubmit} 
                />
                <button 
                    onClick={() => setCurrentView('login')}
                    className="absolute bottom-10 text-sm text-blue-600 hover:text-blue-700"
                >
                    ¿Ya tienes cuenta? Inicia sesión
                </button>
            </div>
        );
    }

    return (
      <HomePage 
        appName="Hotellium"
        isLoggedIn={isAuthenticated}
        userName={userName}
        onLogin={() => setCurrentView('login')}
        onLogout={handleLogout}
        onNavigateToProfile={handleNavigateToProfile}
      />
    );
  };

  return (
    <div className="App">
      {renderView()}
    </div>
  );
};
