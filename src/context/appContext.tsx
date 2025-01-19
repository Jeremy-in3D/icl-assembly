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
  openPdf: boolean;
  setOpenPdf: React.Dispatch<React.SetStateAction<boolean>>;
  isNarrationMuted: boolean;
  setIsNarrationMuted: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppContext = createContext<Context | null>(null);

export default function AppContextProvider({
  children,
}: AppContextProviderProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<any>(null);
  const [menuData, setMenuData] = useState<any[]>([]);
  const [openPdf, setOpenPdf] = useState<boolean>(false);
  const [isNarrationMuted, setIsNarrationMuted] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        menuOpen,
        setMenuOpen,
        currentStep,
        setCurrentStep,
        menuData,
        setMenuData,
        openPdf,
        setOpenPdf,
        isNarrationMuted,
        setIsNarrationMuted,
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
      menuOpen: false,
      setMenuOpen: () => {},
      currentStep: "",
      setCurrentStep: () => {},
      menuData: [],
      setMenuData: () => {},
      openPdf: false,
      setOpenPdf: () => {},
      isNarrationMuted: false,
      setIsNarrationMuted: () => {},
    };
  }

  return context;
}
