"use client";

import { Row } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";

import { taskSchema } from "../data/schema";
import { useModal } from "@/providers/context/context";
import TaskModal from "@/components/modals/TaskModal";
import KycDashModal from "@/components/modals/kyc_dash_modal";
import TopStoresDashModal from "@/components/modals/top_stores_dash_modal";
import TopProductsDashModal from "@/components/modals/top_products_dash_modal";
import TopSellerDashModal from "@/components/modals/top_seller_dash_modal";
import OfflineDashModal from "@/components/modals/offline_dash_modal";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  isOfflineTable?: boolean;
  isKycTable?: boolean;
  isTopStoresTable?: boolean;
  isTopProductsTable?: boolean;
  isTopSellerTable?: boolean;
}

export type IModalTypes =
  | "offline_dash_modal"
  | "kyc_dash_modal"
  | "top_stores_dash_modal"
  | "top_products_dash_modal"
  | "top_seller_dash_modal"
  | "";

export function DataTableRowActionsDashboard<TData>({
  row,
  isOfflineTable,
  isTopStoresTable,
  isTopProductsTable,
  isTopSellerTable,
  isKycTable
}: DataTableRowActionsProps<TData>) {
  const { openModal, selectedTask } = useModal(); // Get the modal context
  const task = taskSchema.parse(row.original);

  const handleOpenModal = () => {
    if (!task) return; // Ensure task is valid
    openModal(task); // This should set `selectedTask` in the context
  };
  
  // if (isModal==="offline_dash_modal") return <OfflineDashModal />;
  // if (isModal=="top_stores_dash_modal") return <TopStoresDashModal />;
  // if (isModal==='top_products_dash_modal') return <TopProductsDashModal />;
  // if (isModal==='top_seller_dash_modal') return <TopSellerDashModal />;
  const renderModalContent = () => {
    if (!selectedTask) return null; 
    if (isOfflineTable) return <OfflineDashModal />;
    if (isTopStoresTable) return <TopStoresDashModal />;
    if (isTopProductsTable) return <TopProductsDashModal />;
    if (isTopSellerTable) return <TopSellerDashModal />;
     if (isKycTable) return <KycDashModal />;
  };

  return (
    <>
      <Button
        variant="ghost"
        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        onClick={handleOpenModal}
      >
        <Eye color="#D19DFF" />
        <span className="sr-only">Open menu</span>
      </Button>
      {/* modal starts ==== 
      ================= */}
      
      {renderModalContent()}
    </>
  );
}
