import TaskModal, {
  TaskModalContent,
  TaskModalHeader,
} from "@/components/modals/TaskModal";
import { useModal } from "@/providers/context/context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  //   DropdownMenuLabel,
  //   DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react/dist/iconify.js";
import { IProducts } from "@/types/productType";
import useDownloadXl from "@/hooks/DownloadStockReport";
import { IconButton } from "@mui/material";

type Props = {
  product: IProducts; // The product object to be passed to the modal
};

export default function AllProductsActionModal({ product }: Props) {
  const { openProductModal, selectedProducts } = useModal();

  console.log(selectedProducts, "selectedProducts");

  const { downloadStockReport } = useDownloadXl();

  return (
    <div className="flex">
      <IconButton>
        <Icon
          icon="fluent:open-20-regular"
          onClick={() => openProductModal(product)}
        />
      </IconButton>

      <DropdownMenu>
        {/* ••• */}
        <DropdownMenuTrigger>
          <IconButton>
            <Icon icon="mi:options-vertical" />
          </IconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="sm:mr-10">
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuItem>Approve</DropdownMenuItem>
          <DropdownMenuItem>Reject</DropdownMenuItem>
          <DropdownMenuItem>Hold</DropdownMenuItem>
          <DropdownMenuItem onClick={() => downloadStockReport([product])}>
            Download Stock Report
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* modal starts */}

      <TaskModal>
        <TaskModalHeader>Select Store</TaskModalHeader>

        <TaskModalContent>{selectedProducts?.productName}</TaskModalContent>
      </TaskModal>
    </div>
  );
}
