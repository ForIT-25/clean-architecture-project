import React from 'react';
import IconMenuSvg from '../../public/icon-menu.svg';
import IconUserSvg from '../../public/Icon-user.svg';
import IconLogoutSvg from '../../public/icon-logout.svg';

export interface NavbarProps {
  appName: string;
  isLoggedIn: boolean;
  userName?: string;
  onLogin?: () => void;
  onLogout?: () => void;
  onNavigateToProfile?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  appName,
  isLoggedIn,
  userName,
  onLogin,
  onLogout,
  onNavigateToProfile,
}) => {
  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <div className="flex items-center space-x-3">
          <div className="text-blue-600">
            <img src={IconMenuSvg} alt="Menu" className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-gray-800">{appName}</span>
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <button
                onClick={onNavigateToProfile}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition"
              >
                <img src={IconUserSvg} alt="Perfil" className="w-5 h-5"/>
                <span className="font-medium text-gray-700 hidden sm:block">
                  {userName || 'Perfil'}
                </span>
              </button>

              <button
                onClick={onLogout}
                className="p-2 text-red-600 hover:text-red-700 transition"
                title="Cerrar Sesión"
              >
                <img src={IconLogoutSvg} alt="Cerrar Sesión" className="w-6 h-6" />
              </button>
            </>
          ) : (
            <button
              onClick={onLogin}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
