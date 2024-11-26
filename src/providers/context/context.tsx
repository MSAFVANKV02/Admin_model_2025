import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the context type
interface ModalContextType {
  isOpen: boolean;
  selectedTask: any | null;
  openModal: (task: any) => void;
  closeModal: () => void;
  isOfflineTable: boolean;
  isKycTable: boolean;
  isTopStoresTable: boolean;
  isTopProductsTable: boolean;
  isTopSellerTable: boolean;

}

// Create the context
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Create a provider component
export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [isOfflineTable, setIsOfflineTable] = useState(false);
  const [isKycTable, setIsKycTable] = useState(false);
  const [isTopStoresTable, setIsTopStoresTable] = useState(false);
  const [isTopProductsTable, setIsTopProductsTable] = useState(false);
  const [isTopSellerTable, setIsTopSellerTable] = useState(false);


  const openModal = (task: any) => {
    setSelectedTask(task);
    setIsOpen(true);

  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedTask(null);
    setIsOfflineTable(false);
    setIsKycTable(false);
    setIsTopStoresTable(false);
    setIsTopProductsTable(false);
    setIsTopSellerTable(false);
    
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        selectedTask,
        openModal,
        closeModal,
        isOfflineTable,
        isKycTable,
        isTopStoresTable,
        isTopProductsTable,
        isTopSellerTable,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook to use the ModalContext
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
