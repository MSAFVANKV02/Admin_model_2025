import { MySwitch } from "@/components/myUi/mySwitch";
import { toggleProductButton } from "@/redux/actions/product_Slice";
import { dispatch } from "@/redux/hook";
import { IProducts, IProductStatus } from "@/types/productType";
import { TableColumn } from "react-data-table-component";

import { ActionsCellRenderer } from "./RenderAction_Cell";
import { Badge } from "@/components/ui/badge";
import Image from "@/components/global/image";
import { makeToastError } from "@/utils/toaster";
import MyClock from "@/components/myUi/MyClock";
export const INVENTORY_COLUMNS = (
  refetch: () => void
): TableColumn<IProducts>[] => [
  // {
  //     name: " ",
  //     selector: row => row._id || "",  // Just a placeholder, does not affect functionality
  //     width: "50px",
  //     center: true,
  //     omit: false,  // Ensure it is not omitted
  //   },
  {
    name: "Product Name",
    cell: (row) => {
      const variations = row.variations ?? [];

      const allSizes = (variations ?? [])
        .flatMap((variant: any) =>
          (variant.details ?? []).map((detail: any) => detail.size)
        )
        .join(", ");

      const allColors = variations
        .map((variant: any) => variant.colorName)
        .join(", ");

      return (
        <div className="flex gap-2 items-center py-3">
          <Image
            src={row.thumbnails[0]}
            alt="product-thumbnails"
            className="w-14 h-11 rounded-md"
          />

          <div className="flex flex-col gap-1 items-start w-full break-all">
            <div className="w-full flex flex-col items-start">
              <b>Name: </b>
              <span className="break-words whitespace-normal overflow-visible w-full">
                {row.product_name || ""}
              </span>
            </div>

            {/* === */}
            <div className="w-full flex flex-col items-start">
              <b>Created By: </b>
              <span className="break-words whitespace-normal overflow-visible w-full">
                {row.createdBy?.role || ""} | {row.createdBy?.name || ""}
              </span>
            </div>
            {/* ====== */}
            {/* === */}
            <div className="w-full truncate flex items-center">
              <b>Brand: </b>
              <span>{row.brand?.name || ""}</span>
            </div>
            {/* ====== */}
            <div className="w-full truncate flex items-center">
              <b>Min-Qty: </b>
              <span>{row.minimum_quantity}</span>
            </div>
            {/* ====== */}
            <div className="w-full truncate flex items-center">
              <b>Sizes :</b>
              <span>{allSizes}</span>
            </div>
            {/* ====== */}
            <div className="w-full truncate flex items-center">
              <b>Colors :</b>
              <span>{allColors}</span>
            </div>
          </div>
        </div>
      );
    },

    grow: 1, // Makes this column take up more space
    maxWidth: "250px",
    minWidth: "250px",
  },
  {
    name: "Created At",
    cell: (row) => (
      <MyClock date={row.createdAt} showSeconds={false} use12Hour />
    ),
    sortable: true,
    sortFunction: (rowA, rowB) =>
      new Date(rowA.createdAt ?? "").getTime() -
      new Date(rowB.createdAt ?? "").getTime(),
    // minWidth:"fit-content"
  },
  {
    name: "Status",
    cell: (row) => {
      const statusClasses: Record<IProductStatus, string> = {
        pending:
          "bg-yellow-100 text-yellow-800 border border-yellow-400 hover:bg-transparent",
        approved:
          "bg-green-100 text-green-800 border border-green-400 hover:bg-transparent",
        hold: "bg-gray-100 text-gray-800 border border-gray-400 hover:bg-transparent",
        rejected:
          "bg-red-100 text-red-800 border border-red-400 hover:bg-transparent",
      };

      return (
        <Badge
          className={`${
            statusClasses[row.status] ||
            "bg-gray-100 text-gray-800 border border-gray-400 "
          }`}
        >
          {row.status}
        </Badge>
      );
    },
    sortable: true,
    grow: 1,
    center: true
  },
  {
    name: "Base Price",
    selector: (row) => `₹${row.basePrice ?? 0}`,
    grow: 1,
    center: true

  },
  {
    name: "Sample Price",
    selector: (row) => `₹${row.samplePrice ?? 0}`,
    grow: 1,
    center: true

  },
  {
    name: "MRP",
    selector: (row) => row.mrp ?? 0,
    grow: 1,
    center: true

  },
  {
    name: "Featured",
    cell: (row) => (
      <div className="flex flex- items-center gap-1 py-3">
        <MySwitch
          isOn={!!row.is_featured_product}
          id={`is_featured_product${row._id}`}
          handleToggle={async () => {
            if (row.isDeleted) {
              return makeToastError("Cant Update Deleted Product");
            }
            await dispatch(
              toggleProductButton({
                fieldName: "is_featured_product",
                productId: row._id ?? "",
              })
            );
            refetch();
          }}
        />
        {row.non_featured_stores && row.non_featured_stores.length > 0 && (
          <span className="text-gray-500 text-xs capitalize  ">
            hidden Stores : {row.non_featured_stores.length}
          </span>
        )}
      </div>
    ),
    grow: 1,
    center: true

    // width:"150px"
  },
  {
    name: "Published",
    cell: (row) => (
      <div className="flex flex- items-center gap-1 py-3">
        <MySwitch
          isOn={!!row.is_published}
          id={`is_published-${row._id}`}
          handleToggle={async () => {
            if (row.isDeleted) {
              return makeToastError("Cant Update Deleted Product");
            }
            await dispatch(
              toggleProductButton({
                fieldName: "is_published",
                productId: row._id ?? "",
              })
            );
            setTimeout(() => {
              refetch();
            }, 100);
          }}
        />
        {row.non_published_stores && row.non_published_stores.length > 0 && (
          <span className="text-gray-500 text-xs capitalize  ">
            hidden Stores : {row.non_published_stores.length}
          </span>
        )}
      </div>
    ),
    grow: 1,
    center: true

  },
  {
    name: "Todays Deal",
    cell: (row) => (
      <div className="flex flex- items-center gap-1 py-3">
        <MySwitch
          isOn={!!row.is_todays_deal}
          id={`is_todays_deal-${row._id}`}
          handleToggle={async () => {
            if (row.isDeleted) {
              return makeToastError("Cant Update Deleted Product");
            }
            await dispatch(
              toggleProductButton({
                fieldName: "is_todays_deal",
                productId: row._id ?? "",
              })
            );
            setTimeout(() => {
              refetch();
            }, 100);
          }}
        />
        {row.non_todays_deal_stores &&
          row.non_todays_deal_stores.length > 0 && (
            <span className="text-gray-500 text-xs capitalize  ">
              hidden Stores : {row.non_todays_deal_stores.length}
            </span>
          )}
      </div>
    ),
    grow: 1,
    center: true

  },
  {
    name: "Actions",
    cell: (row) => (
      <>
        <ActionsCellRenderer data={row} refetch={refetch} isDarkMode={false} />
      </>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    width: "100px",
    center: true

  },
];
