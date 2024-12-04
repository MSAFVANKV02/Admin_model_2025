"use client";

import { ColumnDef } from "@tanstack/react-table";
// import { DataTableColumnHeader } from "../task_components/data-table-column-header";


export const ProductTableColumns: ColumnDef<any>[] = [
  {
    accessorKey: "product",
    header: "Product",
    // header: ({ column }) => (
    // use this header if need sorting ==== 
    //     <DataTableColumnHeader column={column} title="Stock" />
    //   ),
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
            src={product.galleryImages[0]}
            alt={product.productName}
            width={50}
            height={50}
            className="object-cover rounded"
          />
          <div>
            <div className="font-semibold">{product.productName}</div>
            <div className="text-xs text-gray-500"><b>Brand:</b> {product.brand || "N/A"}</div>
            <div className="text-xs text-gray-500"><b>Weight:</b> {product.weight} gm</div>
            <div className="text-xs text-gray-500">
              <b>Min. Order:</b> {product.minQty} pieces
            </div>
            <div className="text-xs text-gray-500"><b>Sizes:</b> {allSizes}</div>
            <div className="text-xs text-gray-500"><b>Colors:</b> {allColors}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "variations",
    header: "Variants",
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
              <img src={`${variant.image}`} alt="" className="w-8 h-8"/>
              <span className="text-sm">{variant.colorName}</span>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "totalStock",
    header: "Total Stock",
    cell: ({ row }) => {
      const totalStock = row.original.variations.reduce(
        (acc: number, variant: any) =>
          acc +
          variant.details.reduce((sum: number, detail: any) => sum + detail.stock, 0),
        0
      );
      return <span>{totalStock}</span>;
    },
  },
  {
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row }) => {
      return <span>${row.original.discount}</span>;
    },
  },
  {
    accessorKey: "sellingPrice",
    header: "Selling Price",
    cell: ({ row }) => {
      return <span>${row.original.basePrice}</span>;
    },
  },
  {
    accessorKey: "pricePerPieces",
    header: "Price / Pieces",
    cell: ({ row }) => {
      const prices = row.original.pricePerPieces;
      return (
        <div className="text-sm">
          {prices.map((price: any) => (
            <div key={price._id}>
              {price.min_Piece} - {price.max_Piece} pieces: ${price.discount}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "samplePrice",
    header: "Sample Price",
    cell: ({ row }) => <span>${row.original.samplePrice}</span>,
  },
  {
    accessorKey: "priceMRP",
    header: "Price (MRP)",
    cell: ({ row }) => <span>${row.original.mrp}</span>,
  },
  {
    accessorKey: "todaysDeal",
    header: "Today's Deal",
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.original.todaysDeal}
        className="toggle-checkbox"
      />
    ),
  },
  {
    accessorKey: "published",
    header: "Published",
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.original.status}
        className="toggle-checkbox"
      />
    ),
  },
  {
    accessorKey: "featured",
    header: "Featured",
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.original.featured}
        className="toggle-checkbox"
      />
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status ? "Active" : "Hold";
      return (
        <span
          className={`px-2 py-1 rounded ${
            row.original.status
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: () => (
      <div className="relative">
        <button className="px-2 py-1 text-white bg-purple-600 rounded">•••</button>
        {/* Add menu logic here */}
      </div>
    ),
  },
];
