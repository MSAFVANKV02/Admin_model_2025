// import { useCallback } from "react";
// import { GridApi } from "ag-grid-community";

// interface ExcelInventoryProps {
//   gridRef: React.MutableRefObject<{ api: GridApi } | null>;
//   rowData: any[]; // Adjust type if needed
//   setRowData: (data: any[]) => void; // Function to update state in parent
// }

// const ExcelInventory = ({ gridRef, rowData, setRowData }: ExcelInventoryProps) => {
//   const exportToExcel = useCallback(() => {
//     if (!gridRef?.current) return;

//     const selectedNodes = gridRef.current.api.getSelectedNodes();
//     const selectedData = selectedNodes.map(node => node.data);

//     const exportData: any[] = [];

//     selectedData.forEach(product => {
//       exportData.push(product); // Add main product row

//       if (product.variations) {
//         product.variations.forEach((variation: any) => {
//           variation.details.forEach((detail: any) => {
//             exportData.push({
//               product_name: product.product_name,
//               product_sku: product.product_sku,
//               brand: product.brand?.name,
//               status: product.status,
//               basePrice: product.basePrice,
//               samplePrice: product.samplePrice,
//               mrp: product.mrp,
//               is_featured_product: product.is_featured_product,
//               is_published: product.is_published,
//               variant_color: variation.colorName,
//               variant_color_code: variation.colorCode,
//               variant_image: variation.image,
//               variant_size: detail.size,
//               variant_stock: detail.stock,
//               variant_selling_price: detail.selling_price,
//               variant_discount: detail.discount,
//               variant_bundle_quantity: detail.bundleQuantity,
//               variant_sku_id: detail.skuId,
//             });
//           });
//         });
//       }
//     });

//     // Update grid data before export
//     gridRef.current.api.applyTransaction({ add: exportData });

//     // Export to Excel
//     gridRef.current.api.exportDataAsExcel({
//       fileName: "Selected_Products.xlsx",
//     });

//     // Reset back to original row data after export
//     setTimeout(() => {
//       setRowData(rowData); // Restore original data from state
//     }, 500);
//   }, [gridRef, rowData, setRowData]);

//   return { exportToExcel };
// };

// export default ExcelInventory;
// import { useCallback } from "react";
// import { GridApi } from "ag-grid-community";
// import * as XLSX from "xlsx";

// interface ExcelInventoryProps {
//   gridRef: React.MutableRefObject<{ api: GridApi } | null>;
//   rowData: any[]; // Adjust type if needed
// }

// const ExcelInventory = ({ gridRef, rowData }: ExcelInventoryProps) => {
//   const exportToExcel = useCallback(() => {
//     if (!gridRef.current?.api) return;

//     const allData: any[] = [];

//     rowData.forEach((product) => {
//       if (product.variations?.length > 0) {
//         product.variations.forEach((variation: any) => {
//           variation.details.forEach((detail: any) => {
//             allData.push({
//               "Product Name": product.product_name,
//               "Product SKU": product.product_sku,
//               "Brand": product.brand?.name,
//               "Status": product.status,
//               "Base Price": product.basePrice,
//               "Sample Price": product.samplePrice,
//               "MRP": product.mrp,
//               "Featured": product.is_featured_product ? "Yes" : "No",
//               "Published": product.is_published ? "Yes" : "No",
//               "Color Name": variation.colorName,
//               "Color Code": variation.colorCode,
//               "Size": detail.size,
//               "Bundle Quantity": detail.bundleQuantity,
//               "Stock": detail.stock,
//               "Discount (%)": detail.discount,
//               "Selling Price": detail.selling_price,
//               "SKU ID": detail.skuId,
//             });
//           });
//         });
//       } else {
//         // If no variations, just export product data
//         allData.push({
//           "Product Name": product.product_name,
//           "Product SKU": product.product_sku,
//           "Brand": product.brand?.name,
//           "Status": product.status,
//           "Base Price": product.basePrice,
//           "Sample Price": product.samplePrice,
//           "MRP": product.mrp,
//           "Featured": product.is_featured_product ? "Yes" : "No",
//           "Published": product.is_published ? "Yes" : "No",
//           "Color Name": "-",
//           "Color Code": "-",
//           "Size": "-",
//           "Bundle Quantity": "-",
//           "Stock": "-",
//           "Discount (%)": "-",
//           "Selling Price": "-",
//           "SKU ID": "-",
//         });
//       }
//     });

//     // Convert to worksheet and download
//     const worksheet = XLSX.utils.json_to_sheet(allData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");
//     XLSX.writeFile(workbook, "inventory.xlsx");
//   }, [gridRef, rowData]);

//   return { exportToExcel };
// };

// export default ExcelInventory;

import { useCallback } from "react";
import { GridApi } from "ag-grid-community";
import ExcelJS from "exceljs";

interface ExcelInventoryProps {
  gridRef: React.MutableRefObject<{ api: GridApi } | null>;
  rowData: any[]; // Adjust type if needed
}

const ExcelInventory = ({ gridRef, rowData }: ExcelInventoryProps) => {
  const exportToExcel = useCallback(async () => {
    if (!gridRef.current?.api) return;

    const allData: any[] = [];

    rowData.forEach((product) => {
      if (product.variations?.length > 0) {
        product.variations.forEach((variation: any) => {
          variation.details.forEach((detail: any) => {
            allData.push({
              "Product Name": product.product_name,
              "Product SKU": product.product_sku,
              "Brand": product.brand?.name,
              "Status": product.status,
              "Base Price": product.basePrice,
              "Sample Price": product.samplePrice,
              "MRP": product.mrp,
              "Featured": product.is_featured_product ? "Yes" : "No",
              "Published": product.is_published ? "Yes" : "No",
              "Color Name": variation.colorName,
              "Color Code": variation.colorCode,
              "Size": detail.size,
              "Bundle Quantity": detail.bundleQuantity,
              "Stock": detail.stock,
              "Discount (%)": detail.discount,
              "Selling Price": detail.selling_price,
              "SKU ID": detail.skuId,
            });
          });
        });
      } else {
        allData.push({
          "Product Name": product.product_name,
          "Product SKU": product.product_sku,
          "Brand": product.brand?.name,
          "Status": product.status,
          "Base Price": product.basePrice,
          "Sample Price": product.samplePrice,
          "MRP": product.mrp,
          "Featured": product.is_featured_product ? "Yes" : "No",
          "Published": product.is_published ? "Yes" : "No",
          "Color Name": "-",
          "Color Code": "-",
          "Size": "-",
          "Bundle Quantity": "-",
          "Stock": "-",
          "Discount (%)": "-",
          "Selling Price": "-",
          "SKU ID": "-",
        });
      }
    });

    // exceljs part
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Inventory");

    // Add header
    const columns = Object.keys(allData[0] || {}).map((key) => ({
      header: key,
      key: key,
      width: 20,
    }));
    worksheet.columns = columns;

    // Add rows
    worksheet.addRows(allData);

    // Download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "inventory.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }, [gridRef, rowData]);

  return { exportToExcel };
};

export default ExcelInventory;
