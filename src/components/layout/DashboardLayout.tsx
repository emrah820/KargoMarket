import React, { useState } from 'react';
import BetaBanner from '../common/BetaBanner';
import Header from '../Header';
import Sidebar from '../Sidebar';
import MainContent from '../MainContent';

interface DashboardLayoutProps {
  onBackToPublic: () => void;
  profile?: { full_name: string } | null;
  onLogout?: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ onBackToPublic, profile, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Beta Banner - Dashboard'da da görünür */}
      <BetaBanner />
      <Header 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        onBackToPublic={onBackToPublic}
        profile={profile}
        onLogout={onLogout}
      />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <MainContent profile={profile} />
      </div>
    </div>
  );
};

export default DashboardLayout;