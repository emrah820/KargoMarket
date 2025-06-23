import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { UserRole, ActiveSection } from './dashboardConstants';

const DashboardContext = createContext<{
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  notifications: number;
  setNotifications: (count: number) => void;
}>({
  activeSection: 'overview',
  setActiveSection: () => {},
  userRole: 'alici-satici',
  setUserRole: () => {},
  notifications: 0,
  setNotifications: () => {},
});

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview');
  const [userRole, setUserRole] = useState<UserRole>('alici-satici');
  const [notifications, setNotifications] = useState(3);

  return (
    <DashboardContext.Provider
      value={{
        activeSection,
        setActiveSection,
        userRole,
        setUserRole,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};