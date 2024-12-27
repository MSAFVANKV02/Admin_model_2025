import { IModalTypes } from "@/components/tasks/table_actions/data-table-action-dashboard";
import { ICategory } from "@/types/categorytypes";
import { IProducts } from "@/types/productType";
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

// Define the context type
interface ModalContextType {
  isOpen: boolean;
  selectedTask: any;
  openModal: (task: any, type:IModalTypes) => void;
  openProductModal:(task: any) => void;
  closeModal: () => void;
  isOfflineTable: boolean;
  isKycTable: boolean;
  isTopStoresTable: boolean;
  isTopProductsTable: boolean;
  isTopSellerTable: boolean;
  modalTypeDashboard: IModalTypes;
  selectedPage: string | null;
  setSelectedPage: Dispatch<SetStateAction<string | null>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedCategory: Dispatch<SetStateAction<ICategory | null>>;
  selectedProducts:IProducts | null;
  selectedCategory: ICategory | null;
  openCategoryModal: (task: ICategory) => void;


}

// Create the context
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Create a provider component
export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<null>(null);
  const [selectedProducts, setSelectedProducts] = useState<IProducts | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [isOfflineTable, setIsOfflineTable] = useState(false);
  const [isKycTable, setIsKycTable] = useState(false);
  const [isTopStoresTable, setIsTopStoresTable] = useState(false);
  const [isTopProductsTable, setIsTopProductsTable] = useState(false);
  const [isTopSellerTable, setIsTopSellerTable] = useState(false);
  const [modalTypeDashboard, setModalTypeDashboard] = useState<IModalTypes>("");
  const [selectedPage, setSelectedPage] = useState<string | null>("general");


//  ===== modal open in dashboard =================
  const openModal = (task: null, type:IModalTypes) => {
    setSelectedTask(task);
    setIsOpen(true);
    setModalTypeDashboard(type);

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


//  ===== modal open in product all page =================

  const openProductModal = (task: IProducts) => { // Accept a single product
    setSelectedProducts(task); // Wrap in an array
    setIsOpen(true);
  };

//  ===== modal open in category page =================

  const openCategoryModal = (task: ICategory) => { 
    setSelectedCategory(task); // Wrap in an array
    setIsOpen(true);
  };



  return (
    <ModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        selectedTask,
        openModal,
        openProductModal,
        closeModal,
        isOfflineTable,
        isKycTable,
        isTopStoresTable,
        isTopProductsTable,
        isTopSellerTable,
        modalTypeDashboard,
        selectedPage,
        setSelectedPage,
        selectedProducts,
        openCategoryModal,
        selectedCategory,
        setSelectedCategory
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
