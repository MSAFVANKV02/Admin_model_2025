import { IProducts } from "@/types/productType";
import DataTable from "react-data-table-component";
import { INVENTORY_COLUMNS } from "./Inventory-Cells/Inventory_Columns";

import { Button } from "@/components/ui/button";
import { CustomStylesInventory } from "./Inventory-Cells/custome-style";
import { ExpandableRowComponent } from "./Inventory-Cells/expandable-varients";
import { handleExportExcel } from "./Inventory-Cells/xlsx_downloader";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import useSearchFn from "@/hooks/useSeach-Fn";
import AyButton from "@/components/myUi/AyButton";
interface Props {
  gridTheme?: string;
  isDarkMode?: boolean;
  products: IProducts[];
  refetch: any;
}

const InventoryTable = ({ refetch, products }: Props) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const { filteredData: filteredProducts, handleSearch } =
    useSearchFn<IProducts>(products);

  // Function to toggle row expansion (only one at a time)
  const handleRowExpand = (row: IProducts) => {
    setExpandedRow((prev) => (prev === row._id ? null : row._id ?? null));
  };

  //   const [selectedRows, setSelectedRows] = useState(false);
  //   const [toggledClearRows, setToggleClearRows] = useState(false);

  //   const handleChange = ({ selectedRows }) => {
  //     setSelectedRows(selectedRows);
  //   };

  //   // Toggle the state so React Data Table changes to clearSelectedRows are triggered
  //   const handleClearRows = () => {
  //     setToggleClearRows(!toggledClearRows);
  //   };

  // const handleExportCSV = () => {
  //     const csvContent =
  //       "data:text/csv;charset=utf-8," +
  //       ["Status,Product Name,Base Price"] // CSV Headers
  //         .concat(
  //           products.map(
  //             (p) => `${p.status},"${p.product_name}",₹${p.basePrice}`
  //           )
  //         )
  //         .join("\n");

  //     // Create a link and trigger download
  //     const encodedUri = encodeURI(csvContent);
  //     const link = document.createElement("a");
  //     link.setAttribute("href", encodedUri);
  //     link.setAttribute("download", "inventory_data.csv");
  //     document.body.appendChild(link);
  //     link.click();
  //   };

  return (
    <div className="w-full overflow-x-auto">
      {/* <button 
    onClick={handleClearRows} 
    className="mb-3 px-4 py-2 bg-blue-600 text-white rounded"
  >
    Clear Selected Rows
  </button> */}
      <div className="flex justify-between py-5">
        <div className="ps-4">
          <Input
            type="search"
            placeholder="Search Product"
            className="text-xs"
            onChange={handleSearch}
          />
        </div>

        <div className="flex gap-4">
          <AyButton title="" variant="outlined" outLineColor="gray" sx={{}}>
            Trash
          </AyButton>

          <Button
            onClick={() => {
              handleExportExcel(products);
            }}
            className="bg-green-600 text-white"
          >
            Export XLSX
          </Button>
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="w-full overflow-auto">
        <DataTable
          columns={INVENTORY_COLUMNS(refetch)}
          data={filteredProducts}
          //   selectableRows
          //   onSelectedRowsChange={handleChange}
          //   clearSelectedRows={toggledClearRows}
          highlightOnHover
          pointerOnHover
          customStyles={CustomStylesInventory}
          pagination
          responsive
          expandableRows
          //   expandableRowsComponent={ExpandableRowComponent}
          expandableRowExpanded={(row) => row._id === expandedRow}
          onRowExpandToggled={(_, row) => handleRowExpand(row)}
          expandableRowsComponent={ExpandableRowComponent}
        />
      </div>
    </div>
  );
};

export default InventoryTable;
