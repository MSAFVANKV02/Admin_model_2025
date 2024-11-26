"use client";

import { Row } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";

import { taskSchema } from "../data/schema";
import { useModal } from "@/providers/context/context";
import TaskModal from "@/components/modals/kyc_dashboard_modal";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icon } from "@iconify/react/dist/iconify.js";
import PdfFile from "@/components/myUi/PdfFile";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActionsDashboard<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { openModal } = useModal(); // Get the modal context
  const task = taskSchema.parse(row.original);

  const handleOpenModal = () => {
    openModal(task); // Pass the full task object to the modal
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
      <TaskModal className="h-[70vh]">
        <div className="">
          <div className="flex">
            <div className="flex-1">
              {/*  */}
              <div className="flex items-center gap-2">
                <h3>Order Id:</h3>
                <span>{task.orderId}</span>
              </div>
              {/*  */}
              <div className="flex items-center gap-2">
                <p className="text-sm">Date:</p>
                <span>{task.date}</span>
              </div>
              {/*  */}
              <div className="flex items-center gap-2 mt-5">
                <p className="text-sm">Transaction ID :</p>
                <span></span>
              </div>
              {/*  */}
              <div className="flex items-center gap-2 mt-5">
                <p className="text-sm">Customer name :</p>
                <span></span>
              </div>
              {/*  */}
              <div className="flex items-center gap-2 mt-5">
                <p className="text-sm">Amount :</p>
                <span></span>
              </div>
              {/*  */}
              <div className="flex items-center gap-2 mt-5">
                <p className="text-sm">Payment method :</p>
                <span></span>
              </div>
              {/*  */}
              <div className="flex items-center gap-2 mt-5">
                <p className="text-sm">Referral document :</p>
                <span></span>
              </div>
              {/* =====  ends details ==== */}
              {/* ===== pdf docs ======= */}
              <div className="md:w-3/4 w-full flex items-start ">
                <a
                  href={"/Invoice_INV1482989614215502 (16).pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative"
                >
                  {/* <p>Uploaded File: {uploadedFile.name}</p> */}

                  <PdfFile
                    fileURL={"/Invoice_INV1482989614215502 (16).pdf"}
                    className="h-16 w-16"
                  />
                  <div className="absolute h-16 w-16 bg-black/50 top-0 rounded-md flex items-center justify-center ">
                    <Icon icon="solar:eye-bold" fontSize={25} color="#fff" />
                  </div>
                </a>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Select>
                <SelectTrigger className="w-[180px] ">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent className="z-[10002]">
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="pending">pending</SelectItem>
                    <SelectItem value="shipped">shipped</SelectItem>
                    <SelectItem value="delivered">delivered</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </TaskModal>
    </>
  );
}
