// import type { CustomCellRendererProps } from "ag-grid-react";
// import { type FunctionComponent, useCallback } from "react";

// import styles from "./ActionsCellRenderer.module.css";

// export const ActionsCellRenderer: FunctionComponent<
//   CustomCellRendererProps
// > = ({ api, node }) => {
//   const onRemoveClick = useCallback(() => {
//     const rowData = node.data;
//     api.applyTransaction({ remove: [rowData] });
//   }, [node, api]);

//   const onStopSellingClick = useCallback(() => {
//     const rowData = node.data;

//     const isPaused = rowData.status === "paused";
//     const isOutOfStock = rowData.available <= 0;

//     // Modify the status property
//     rowData.status = !isPaused
//       ? "paused"
//       : !isOutOfStock
//       ? "active"
//       : "outOfStock";

//     // Refresh the row to reflect the changes
//     api.applyTransaction({ update: [rowData] });
//   }, [node, api]);

//   return (
//     <div className={styles.buttonCell}>
//       <button
//         className={`button-secondary ${styles.removeButton}`}
//         onClick={onRemoveClick}
//       >
//         <img src={`/example/inventory/delete.svg`} alt="delete" />
//       </button>
//       <button
//         className={`button-secondary ${styles.buttonStopSelling}`}
//         onClick={onStopSellingClick}
//       >
//         Hold Selling
//       </button>
//     </div>
//   );
// };
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button"; // Importing Button for dropdown trigger
import type { CustomCellRendererProps } from "ag-grid-react";
import { type FunctionComponent, useCallback } from "react";
import { Settings } from "lucide-react";
import { IVariants } from "@/types/productType";

// import styles from "./ActionsCellRenderer.module.css";

export const ActionsCellRenderer: FunctionComponent<
  CustomCellRendererProps
> = ({ api, node, data: { variations } }) => {
  // console.log(variations, "variations");

  // Extract isOutOfStock from variations.details (assuming details is an array)
  const isOutOfStock =
    variations?.details?.some((variant: IVariants) => variant.stock <= 0) ??
    false;

  const onRemoveClick = useCallback(() => {
    const rowData = node.data;
    api.applyTransaction({ remove: [rowData] });
  }, [node, api]);

  const onStopSellingClick = useCallback(() => {
    const rowData = node.data;

    const isPending = rowData.status === "hold"; // Aligning with IProducts type

    // Create a shallow copy of rowData to avoid immutability issues
    const updatedRowData = { ...rowData };

    // Modify the status property using isOutOfStock
    updatedRowData.status = !isPending
      ? "hold"
      : !isOutOfStock
      ? "approved"
      : "reject"; // Changing "outOfStock" to "reject" for consistency

    // Refresh the row to reflect the changes
    api.applyTransaction({ update: [updatedRowData] });
  }, [node, api, isOutOfStock]);

  return (
    <div className="flex justify-end w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="border-none focus:ring-0 active:ring-0 outline-none bg-transparent hover:bg-transparent"
          >
            <Settings />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Manage Product</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onRemoveClick}>Remove</DropdownMenuItem>
          <DropdownMenuItem onClick={onStopSellingClick}>
            Hold Selling
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
