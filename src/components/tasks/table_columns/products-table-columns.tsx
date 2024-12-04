"use client";

import { MySwitch } from "@/components/myUi/mySwitch";
import { IProducts } from "@/types/productType";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "../task_components/data-table-column-header";
import AllProductsActionModal from "../table_actions/All_Products_Action_Modal";

// import { DataTableColumnHeader } from "../task_components/data-table-column-header";

export const ProductTableColumns: ColumnDef<IProducts>[] = [
  {
    accessorKey: "productName",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
    cell: ({ row }) => {
      const product = row.original;
      const allSizes = product.variations
        .map((variant: any) =>
          variant.details.map((detail: any) => detail.size).join(", ")
        )
        .join(", ");
      const allColors = product.variations
        .map((variant: any) => variant.colorName)
        .join(", ");

      return (
        <div className="flex items-start gap-4">
          <img
            src={`${product.galleryImages[0]}`}
            alt={product.productName}
            width={50}
            height={50}
            className="object-cover rounded text-xs"
          />
          <div>
            <div className="font-semibold">{product.productName}</div>
            <div className="text-xs text-gray-500">
              <b>Brand:</b> {product.brand || "N/A"}
            </div>
            <div className="text-xs text-gray-500">
              <b>Weight:</b> {product.weight} gm
            </div>
            <div className="text-xs text-gray-500">
              <b>Min. Order:</b> {product.minQty} pieces
            </div>
            <div className="text-xs text-gray-500">
              <b>Sizes:</b> {allSizes}
            </div>
            <div className="text-xs text-gray-500">
              <b>Colors:</b> {allColors}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "variations",
    // header: "Variants",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Variants" />
    ),
    cell: ({ row }) => {
      const variations = row.original.variations;
      return (
        <div>
          {variations.map((variant: any) => (
            <div key={variant.colorName} className="flex items-center gap-2">
              {/* <div
                style={{ backgroundColor: variant.colorCode }}
                className="w-4 h-4 rounded-full"
              ></div> */}
              <img src={`${variant.image}`} alt="" className="w-8 h-8" />
              <span className="text-sm">{variant.colorName}</span>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "totalStock",
    // header: "Total Stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Stock" />
    ),
    cell: ({ row }) => {
      const variations = row.original.variations;
      //   const totalStock = row.original.variations.reduce(
      //     (acc: number, variant: any) =>
      //       acc +
      //       variant.details.reduce((sum: number, detail: any) => sum + detail.stock, 0),
      //     0
      //   );
      return (
        <div className="">
          {variations.map((variant: any) => (
            <div key={variant.colorName} className="flex items-center gap-2">
              {variant.details.map((detail: any) => (
                <div key={detail._id}>
                  {detail.size}-{detail.stock},
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "discount",
    // header: "Discount",
    header: () => <div className="font-bold text-black">Discount</div>,
    cell: ({ row }) => {
      return <span>${row.original.discount}</span>;
    },
  },
  {
    accessorKey: "sellingPrice",
    // header: "Selling Price",
    header: () => <div className="font-bold text-black">Selling Price</div>,
    cell: ({ row }) => {
      return <span>${row.original.basePrice}</span>;
    },
  },
  {
    accessorKey: "pricePerPieces",
    // header: "Price / Pieces",
    header: () => <div className="font-bold text-black">Piece / Pieces</div>,
    cell: ({ row }) => {
      const prices = row.original.pricePerPieces;
      return (
        <div className="text-sm">
          {prices.map((price: any) => (
            <div key={price._id}>
              <div className="flex items-center gap-2">
                <span className="span">{price.min_Piece}</span>-
                <span className="span">{price.max_Piece} pieces</span>
              </div>
              ${price.discount}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "samplePrice",
    // header: "Sample Price",
    header: () => <div className="font-bold text-black">Sample Price</div>,
    cell: ({ row }) => <span>${row.original.samplePrice}</span>,
  },
  {
    accessorKey: "priceMRP",
    // header: "Price (MRP)",
    header: () => <div className="font-bold text-black">Price (MRP)</div>,
    cell: ({ row }) => <span>${row.original.mrp}</span>,
  },
  {
    accessorKey: "todaysDeal",
    // header: "Today's Deal",
    header: () => <div className="font-bold text-black">Today's Deal</div>,
    cell: ({ row }) => (
      <MySwitch
        isOn={row.original.todaysDeal}
        id="todaysDeal"
        handleToggle={() => {
          console.log("toggled");
          //  row.original.status =!row.original.status;
        }}
      />
    ),
  },
  {
    accessorKey: "published",
    // header: "Published",
    header: () => <div className="font-bold text-black">Published</div>,
    cell: ({ row }) => (
      <MySwitch
        isOn={row.original.published}
        id="published"
        handleToggle={() => {
          console.log("toggled");
          //  row.original.status =!row.original.status;
        }}
      />
    ),
  },
  {
    accessorKey: "featured",
    // header: "Featured",
    header: () => <div className="font-bold text-black">Featured</div>,
    cell: ({ row }) => (
      <MySwitch
        isOn={row.original.featured}
        id="featured"
        handleToggle={() => {
          console.log("toggled");
          //  row.original.status =!row.original.status;
        }}
      />
    ),
  },
  {
    accessorKey: "status",
    // header: "Status",
    header: () => <div className="font-bold text-black">Status</div>,
    cell: ({ row }) => {
      const status = row.original.status;
      return <span className={`px-2 py-1 rounded `}>{status}</span>;
    },
  },
  {
    accessorKey: "actions",
    // header: "Actions",
    header: () => <div className="font-bold text-black"></div>,
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="relative">
          <AllProductsActionModal product={product} />

          {/* Add menu logic here */}
        </div>
      );
    },
  },
];
