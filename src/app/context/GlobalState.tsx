// context/GlobalContext.tsx
"use client"; // <-- Add this at the top

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the global state
interface GlobalState {
    isDarkMode: boolean;
    setIsDarkMode: (value: boolean) => void;
    tronAddressWall: string;
    setTronAddressWall: (address: string) => void;
    tronCheck: string;
    setTronCheck: (address: string) => void;
}

// Create the context with default values
const GlobalContext = createContext<GlobalState | undefined>(undefined);

// Provider component
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [tronAddressWall, setTronAddressWall] = useState('');
    const [tronCheck, setTronCheck] = useState('');

    return (
        <GlobalContext.Provider value={{ isDarkMode, setIsDarkMode, tronAddressWall, setTronAddressWall, tronCheck, setTronCheck }}>
            {children}
        </GlobalContext.Provider>
    );
};

// Custom hook to use the context
export const useGlobalState = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalState must be used within a GlobalProvider");
    }
    return context;
};
