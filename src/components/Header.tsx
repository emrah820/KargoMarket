import React from 'react';
import { Menu, Bell, User, ArrowLeft, LogOut } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  onBackToPublic?: () => void;
  profile?: { full_name: string } | null;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onBackToPublic, profile, onLogout }) => {
  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-20 glass-effect">
      <div className="flex items-center">
        {onBackToPublic && (
          <button
            onClick={onBackToPublic}
            className="mr-4 p-2 text-gray-600 hover:text-primary-600 transition-all duration-300 transform hover:scale-110"
            title="Ana Siteye Dön"
          >
            <ArrowLeft size={24} />
          </button>
        )}
        <button
          onClick={onToggleSidebar}
          className="mr-4 md:hidden text-gray-700 hover:text-primary-600 transition-all duration-300 transform hover:scale-110"
        >
          <Menu size={24} />
        </button>
        <h1 
          className="font-pacifico text-primary-600 text-2xl font-bold cursor-pointer hover:text-primary-700 transition-all duration-300 transform hover:scale-110"
          onClick={() => onBackToPublic?.()}
        >
          Kargo Market
        </h1>
        <span className="ml-3 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          Dashboard
        </span>
      </div>
      
      <div className="flex items-center gap-4">
        {profile && (
          <span className="flex items-center gap-2 text-gray-700 font-medium">
            <User size={20} />
            {profile.full_name}
          </span>
        )}
        <button className="relative p-2 text-gray-600 hover:text-primary-600">
          <Bell size={22} />
          {/* Bildirim sayısı eklenebilir */}
        </button>
        {onLogout && (
          <button
            onClick={onLogout}
            className="ml-2 p-2 text-gray-600 hover:text-red-600 transition-all duration-300"
            title="Çıkış Yap"
          >
            <LogOut size={22} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;