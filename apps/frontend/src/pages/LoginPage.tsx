import React, { useState } from 'react';
import { Login, type LoginProps } from '../components/Login'; 
import { loginUser, type AuthResponse } from '../services/api'; 

export interface LoginPageProps {
    onLoginSuccess: (user: { name: string, token: string }) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit: LoginProps['onSubmit'] = async ({ email, password }) => {
    setLoading(true);
    setError(undefined);

    try {
      const authData: AuthResponse = await loginUser({ email, password }); 
      
      console.log(`Usuario ${email} autenticado exitosamente.`);
      
      alert('Inicio de sesión exitoso. ¡Bienvenido, ' + authData.user.name + '!');
      
      onLoginSuccess({ 
          name: authData.user.name, 
          token: authData.token 
      });
      
    } catch (err) {
      console.error('Login error:', err);
      setError((err as Error).message || 'Error de autenticación. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Login 
        loading={loading}
        error={error}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
