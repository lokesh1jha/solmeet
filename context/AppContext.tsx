import { Expert } from "@/app/(public)/experts/page";
import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context
interface AppContextType {
  user: string | null;
  setUser: (user: string | null) => void;
  expertForBooking: Expert | null;
  setExpertForBooking: (expert: Expert) => void;
}

// Create the context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [expertForBooking, setExpertForBooking] = useState<Expert | null>(null);
  return (
    <AppContext.Provider value={{ user, setUser, expertForBooking, setExpertForBooking }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
