import React, { createContext, useContext, useState } from "react";

type AppContextProviderProps = {
  children: React.ReactNode;
};

type Context = {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentStep: any;
  setCurrentStep: React.Dispatch<React.SetStateAction<any>>;
  menuData: any[];
  setMenuData: React.Dispatch<React.SetStateAction<any[]>>;
};

export const AppContext = createContext<Context | null>(null);

export default function AppContextProvider({
  children,
}: AppContextProviderProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<any>(null);
  const [menuData, setMenuData] = useState<any[]>([]);

  return (
    <AppContext.Provider
      value={{
        menuOpen,
        setMenuOpen,
        currentStep,
        setCurrentStep,
        menuData,
        setMenuData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    console.log(
      "Error with a Context - likely that must be used within AppContextProvider"
    );
    return {
      menuOpen: "",
      setMenuOpen: () => {},
      currentStep: "",
      setCurrentStep: () => {},
      menuData: [],
      setMenuData: () => {},
    };
  }

  return context;
}
