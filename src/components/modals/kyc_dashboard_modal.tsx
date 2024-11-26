import React from "react";
import { useModal } from "@/providers/context/context";

import Modal from "react-modal";
import MyBackBtn from "../myUi/myBackBtn";
import { cn } from "@/lib/utils";
Modal.setAppElement("#root");

type ModalComponent = {
  children: React.ReactNode;
  className?: string;
};

export default function TaskModal({ children,className }: ModalComponent) {
  const { isOpen, selectedTask, closeModal } = useModal();

  if (!selectedTask) return null; // If there's no selected task, don't render the modal

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      overlayClassName="fixed inset-0 bg-black/20 backdrop-filter  flex items-center justify-center z-[10001] "
      className={cn(`bg-white rounded-lg  max-w-xl p-4 md:max-h-[80vh] h-full  w-full overflow-y-auto relative z-[10001]`,className)}
    >
      <div className="mb-3">
        <MyBackBtn
          clickEvent={closeModal}
          iconSize={25}
          className=" float-right -mr-4"
          tooltipTitle="close"
          placeTooltip="left"
          icon="ei:close"
        />
      </div>
      {children}
    </Modal>
  );
}
