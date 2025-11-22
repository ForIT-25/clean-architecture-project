import React, { useState } from 'react';
import { Register, type RegisterData, type RegisterProps } from '../components/Register'; 
import { registerUser } from '../services/api'; 
import type { CreateUserData } from '@hotel-project/domain';

export interface RegisterPageProps {
    onRegisterSuccess: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onRegisterSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit: RegisterProps['onSubmit'] = async (data: RegisterData) => {
    if (data.password !== data.confirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    setError(undefined);

    try {
      const registrationData: CreateUserData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      
      await registerUser(registrationData); 
      
      console.log(`Usuario ${data.name} registrado exitosamente.`);
      
      alert('Registro exitoso. ¡Inicia sesión para continuar!');
      onRegisterSuccess();
      
    } catch (err) {
      console.error('Registration error:', err);
      setError((err as Error).message || 'Error en el registro. Intenta con otro email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Register 
        loading={loading}
        error={error}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
