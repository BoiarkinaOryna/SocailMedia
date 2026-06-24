import { createContext, useContext, useState, ReactNode } from "react";

interface ContextProps {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const PublicationModalContext = createContext<ContextProps | null>(null);

export function PublicationModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <PublicationModalContext.Provider
            value={{
                isOpen,
                open: () => setIsOpen(true),
                close: () => setIsOpen(false),
            }}
        >
            {children}
        </PublicationModalContext.Provider>
    );
}

export function usePublicationModal() {
    const ctx = useContext(PublicationModalContext);
    if (!ctx) {
        throw new Error("usePublicationModal must be used inside provider");
    }
    return ctx;
}