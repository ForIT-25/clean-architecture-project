import type { Meta, StoryObj } from '@storybook/react';
import { App } from '../App'; 
import { userEvent, within, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof App> = {
  title: 'Application/App Router',
  component: App,
  parameters: {
    layout: 'fullscreen', 
  },
};

export default meta;
type Story = StoryObj<typeof App>;

export const LoggedOutView: Story = {
  name: '1. Vista Sin Iniciar Sesión (Login)',
};

export const RegisterView: Story = {
  name: '2. Vista de Registro',
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    
    await step('Navegar a Registro', async () => {
      const registerButton = canvas.getByText('¿No tienes cuenta? Regístrate aquí');
      await userEvent.click(registerButton);
    });
    
    await step('Verificar formulario de Registro', async () => {
      await expect(canvas.getByText('Crear cuenta')).toBeInTheDocument();
    });
  },
};

export const LoggedInView: Story = {
  name: '3. Vista Autenticada (Hoteles)',
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    
    await step('Simular Inicio de Sesión', async () => {
      await userEvent.type(canvas.getByLabelText('Email'), 'demo@app.com');
      await userEvent.type(canvas.getByLabelText('Password'), 'password');
      
      const loginButton = canvas.getByRole('button', { name: 'Ingresar' });
      await userEvent.click(loginButton);
    });
    
    await step('Verificar carga de Hoteles', async () => {
      await waitFor(() => expect(canvas.getByText('Explora Hoteles')).toBeInTheDocument(), { timeout: 2000 });
      await expect(canvas.getByText('Usuario Demo')).toBeInTheDocument();
    });
  },
};

export const LogoutFlow: Story = {
  name: '4. Flujo Completo de Cierre de Sesión',
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    
    await step('Simular Login Exitoso', async () => {
      await userEvent.type(canvas.getByLabelText('Email'), 'demo@app.com');
      await userEvent.type(canvas.getByLabelText('Password'), 'password');
      const loginButton = canvas.getByRole('button', { name: 'Ingresar' });
      await userEvent.click(loginButton);
      
      await waitFor(() => expect(canvas.getByText('Explora Hoteles')).toBeInTheDocument());
    });
    
    await step('Hacer clic en Cerrar Sesión', async () => {
      const logoutButton = canvas.getByTitle('Cerrar Sesión');
      await userEvent.click(logoutButton);
    });

    await step('Verificar redirección a Login', async () => {
      await waitFor(() => expect(canvas.getByText('Iniciar sesión')).toBeInTheDocument());
      await expect(canvas.getByRole('button', { name: 'Ingresar' })).toBeInTheDocument();
    });
  },
};
