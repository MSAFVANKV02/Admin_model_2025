import type {
  ColDef,
  GetDetailRowDataParams,
  SizeColumnsToFitGridStrategy,
  ValueFormatterFunc,
} from "ag-grid-community";
import {
  AllCommunityModule,
  ClientSideRowModelModule,
  ModuleRegistry,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// paid version of ag-grid-enterprise
import {
  CellSelectionModule,
  ClipboardModule,
  ColumnMenuModule,
  ContextMenuModule,
  ExcelExportModule,
  MasterDetailModule,
  MultiFilterModule,
  SetFilterModule,
  ValidationModule,
} from "ag-grid-enterprise";

import { GridChartsModule } from "ag-grid-enterprise";
import { IntegratedChartsModule } from "ag-grid-enterprise";
import { AgChartsEnterpriseModule } from "ag-charts-enterprise";

ModuleRegistry.registerModules([
  AllCommunityModule,
  ClientSideRowModelModule,
  ExcelExportModule,
  SetFilterModule,
  MultiFilterModule,
  MasterDetailModule,
  GridChartsModule, // Add this for chart support
  ClientSideRowModelModule,
  AllCommunityModule,
  ClientSideRowModelModule,
  ExcelExportModule,
  SetFilterModule,
  MultiFilterModule,
  MasterDetailModule,
  ClientSideRowModelModule,
  ClipboardModule,
  ColumnMenuModule,
  ContextMenuModule,
  CellSelectionModule,
  ValidationModule /* Development Only */,
  IntegratedChartsModule.with(AgChartsEnterpriseModule),
]);

// ModuleRegistry.registerModules([
//   AllCommunityModule,
//   ClientSideRowModelModule,
//   ExcelExportModule,
//   SetFilterModule,
//   MultiFilterModule,
//   MasterDetailModule,
//   ClientSideRowModelModule,
//   ClipboardModule,
//   ColumnMenuModule,
//   ContextMenuModule,
//   CellSelectionModule,
//   ValidationModule /* Development Only */,
// ]);

import { AgGridReact } from "ag-grid-react";
import {
  type ChangeEvent,
  type FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import styles from "./InventoryExample.module.css";
import { ActionsCellRenderer } from "./cell-renderers/ActionsCellRenderer";
import { ProductCellRenderer } from "./cell-renderers/ProductCellRenderer";
import { StatusCellRenderer } from "./cell-renderers/StatusCellRenderer";
import { PriceCellRenderer } from "./cell-renderers/PriceCellRenderer";
import { dispatch } from "@/redux/hook";
import { IProducts, IVariants } from "@/types/productType";
import { MySwitch } from "@/components/myUi/mySwitch";
import { toggleProductButton } from "@/redux/actions/product_Slice";
import { Input } from "@/components/ui/input";
import ExcelInventory from "./cell-renderers/excel-inventory";



interface Props {
  gridTheme?: string;
  isDarkMode?: boolean;
  products: IProducts[];
  refetch: any;
}

const paginationPageSizeSelector = [5, 10, 20];

const statuses = {
  pending: "pending",
  approved: "approved",
  hold: "hold",
  // outOfStock: "Out of Stock",
  rejected: "rejected",
};

const statusFormatter: ValueFormatterFunc = ({ value }) =>
  statuses[value as keyof typeof statuses] ?? "";

export const InventoryTable: FunctionComponent<Props> = ({
  gridTheme = "ag-theme-quartz",
  isDarkMode,
  products,
  refetch,
}) => {
  const gridRef = useRef<AgGridReact>(null);
  //   const { products } = useAppSelector((state) => state.products);
  const [rowData, setRowData] = useState<IProducts[]>(products);
  const [activeTab, setActiveTab] = useState("all");

  // const { exportToExcel } = ExcelInventory({ gridRef, rowData, setRowData });
  const { exportToExcel } = ExcelInventory({ gridRef, rowData });

  useEffect(() => {
    setRowData(products);
  }, [products]);


  //======  row data goes here ======= * /
  /*   =============================== */
  const [colDefs] = useState<ColDef[]>([
    {
      field: "product_name",
      headerName: "Product Name",
      cellRenderer: "agGroupCellRenderer",
      headerClass: "header-product",
      cellRendererParams: {
        innerRenderer: ProductCellRenderer,
      },
      width: 500,
      // maxWidth:400,
      flex: 1.2, // Allows it to shrink if necessary
      cellStyle: { whiteSpace: "normal" },
      wrapText: true, // Ensure wrapping works
      autoHeight: true,
    },
    { field: "product_sku", headerName: "Product SKU", width: 150 },
    { field: "brand.name", headerName: "Brand", width: 150 },
    {
      field: "status",
      valueFormatter: statusFormatter,
      cellRenderer: StatusCellRenderer,
      filter: true,
      filterParams: {
        valueFormatter: statusFormatter,
      },
      headerClass: "header-status",
    },
    // {
    //   field: "basePrice",
    //   cellRenderer: StockCellRenderer,
    //   headerClass: "header-basePrice",
    //   sortable: false,
    // },
    {
      field: "basePrice",
      headerName: "basePrice",
      width: 150,
      cellRenderer: ({
        value,
      }: {
        data: IProducts;
        value: keyof IProducts;
      }) => {
        // console.log(value);

        return <span>₹{value}</span>;
      },
    },
    {
      field: "samplePrice",
      headerName: "samplePrice",
      width: 150,
      cellRenderer: ({
        value,
      }: {
        data: IProducts;
        value: keyof IProducts;
      }) => {
        // console.log(value);

        return <span>₹{value}</span>;
      },
    },

    // {
    //   field: "incoming",
    //   cellEditorParams: {
    //     precision: 0,
    //     step: 1,
    //     showStepperButtons: true,
    //   },
    //   editable: true,
    // },
    {
      field: "mrp",
      width: 135,
      headerClass: "header-mrp",
      cellRenderer: PriceCellRenderer,
    },
    // { field: "sold", headerClass: "header-calendar" },
    {
      field: "is_featured_product",
      headerName:"Featured",
      //   width: 135,
      // width:240,
      headerClass: "header-is_featured_product",
      cellRenderer: ({ value, data }: { value: boolean; data: IProducts }) => {
        return (
          <div className=" flex">
            <MySwitch
              isOn={value}
              id={`is_featured_product${data._id}`}
              handleToggle={async () => {
                await dispatch(
                  toggleProductButton({
                    fieldName: "is_featured_product",
                    productId: data._id ?? "",
                  })
                );
                refetch();

                //  row.original.status =!row.original.status;
              }}
            />
          </div>
        );
      },
    },
    {
      field: "is_published",
      // width: 135,
      headerName:"Published",
      maxWidth: 200,
      headerClass: "header-is_published",
      cellRenderer: ({ value, data }: { value: boolean; data: IProducts }) => {
        // console.log(data,'data publish');
        
        return (
          <div className=" flex">
            <MySwitch
              isOn={value}
              id={`is_published-${data._id}`}
              handleToggle={async () => {
                await dispatch(
                  toggleProductButton({
                    fieldName: "is_published",
                    productId: data._id ?? "",
                  })
                );
                refetch();

                //  row.original.status =!row.original.status;
              }}
            />
          </div>
        );
      },
    },
    // {
    //   headerName: "Est. Profit",
    //   colId: "profit",
    //   headerClass: "header-percentage",
    //   cellDataType: "number",
    //   valueGetter: ({ data: { price, sold } }: ValueGetterParams) =>
    //     (price * sold) / 10,
    //   valueFormatter: ({ value }: ValueFormatterParams) => `£${value}`,
    //   width: 150,
    // },
    { field: "actions", cellRenderer: ActionsCellRenderer, minWidth: 90 },
  ]);

  //   const defaultColDef = useMemo<ColDef>(
  //     () => ({
  //       resizable: false,
  //     }),
  //     []
  //   );
  const defaultColDef = useMemo<ColDef>(
    () => ({
      resizable: true, // Allow resizing
      autoSizeStrategy: "fitContent", // Auto-size based on content
      wrapText: true,
      autoHeight: true,
    }),
    []
  );
  const autoSizeStrategy = useMemo<SizeColumnsToFitGridStrategy>(
    () => ({
      type: "fitGridWidth",
    }),
    []
  );
  const themeClass = isDarkMode ? `${gridTheme}-dark` : gridTheme;
  const [quickFilterText, setQuickFilterText] = useState<string>();
  const onFilterTextBoxChanged = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
      setQuickFilterText(value),
    []
  );

  // variation row starts here =================
  const detailCellRendererParams = useMemo(
    () => ({
      detailGridOptions: {
        columnDefs: [
          { field: "colorName", headerName: "Color", flex: 1.5 },
          { field: "colorCode", headerName: "Color Code", flex: 1 },
          {
            field: "image",
            headerName: "Image",

            cellRenderer: ({
              value,
            }: {
              data: IProducts;
              value: keyof IProducts;
            }) => {
              //   console.log(value);

              return (
                <div className="w-full ">
                  <img
                    className="w-10 h-10 mx-auto rounded-sm"
                    src={value}
                    alt="Product Image"
                  />
                </div>
              );
            },
            flex: 1,
          },
          { field: "size", headerName: "Size", maxWidth: 120 },
          { field: "bundleQuantity", headerName: "Bundle Quantity", flex: 1 },
          { field: "stock", headerName: "Stock", flex: 1 },
          { field: "discount", headerName: "Discount (%)", flex: 1 },
          { field: "selling_price", headerName: "Selling Price", flex: 1 },
          { field: "skuId", headerName: "SKU ID", flex: 1 },
        ],
        headerHeight: 38,
      },
      getDetailRowData: ({
        successCallback,
        data: { variations },
      }: GetDetailRowDataParams) => {
        const allDetails =
          variations?.flatMap((variation: any) =>
            variation.details.map((detail: IVariants) => ({
              ...detail,
              colorName: variation.colorName,
              colorCode: variation.colorCode,
              image: variation.image,
            }))
          ) || [];
        successCallback(allDetails);
      },
    }),
    []
  );

  // const handleTabClick = useCallback((status: string) => {
  //   setActiveTab(status);
  //   gridRef
  //     .current!.api.setColumnFilterModel(
  //       "status",
  //       status === "all" ? null : { values: [status] }
  //     )
  //     .then(() => gridRef.current!.api.onFilterChanged());
  // }, []);
  const handleTabClick = useCallback(
    (status: string) => {
      setActiveTab((prevTab) => (prevTab === status ? "all" : status));

      gridRef
        .current!.api.setColumnFilterModel(
          "status",
          status === activeTab ? null : { values: [status] }
        )
        .then(() => gridRef.current!.api.onFilterChanged());
    },
    [activeTab]
  );

  // extra excel download option for variation included =============

  const getContextMenuItems = useCallback(
    (params: any) => {
      const defaultOptions = params.defaultItems;

      return [
        ...defaultOptions,
        {
          name: "Export to Excel",
          action: () => exportToExcel(),
          icon: '<span class="ag-icon ag-icon-save"></span>', // Optional icon
        },
      ];
    },
    [exportToExcel]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.exampleHeader}>
          <div className={`border rounded-md p-2 gap-3 flex  flex-row`}>
            {Object.entries(statuses).map(([key, displayValue]) => (
              <button
                className={`text-xs p-2 capitalize rounded-md min-w-20 ${
                  activeTab === key ? "bg-bg text-white " : ""
                }`}
                onClick={() => handleTabClick(key)}
                key={key}
              >
                {displayValue}
              </button>
            ))}
          </div>
          <div className={styles.inputWrapper}>
            <svg
              className={styles.searchIcon}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.5014 7.00039C11.5014 7.59133 11.385 8.1765 11.1588 8.72246C10.9327 9.26843 10.6012 9.7645 10.1833 10.1824C9.76548 10.6002 9.2694 10.9317 8.72344 11.1578C8.17747 11.384 7.59231 11.5004 7.00136 11.5004C6.41041 11.5004 5.82525 11.384 5.27929 11.1578C4.73332 10.9317 4.23725 10.6002 3.81938 10.1824C3.40152 9.7645 3.07005 9.26843 2.8439 8.72246C2.61776 8.1765 2.50136 7.59133 2.50136 7.00039C2.50136 5.80691 2.97547 4.66232 3.81938 3.81841C4.6633 2.97449 5.80789 2.50039 7.00136 2.50039C8.19484 2.50039 9.33943 2.97449 10.1833 3.81841C11.0273 4.66232 11.5014 5.80691 11.5014 7.00039ZM10.6814 11.7404C9.47574 12.6764 7.95873 13.1177 6.43916 12.9745C4.91959 12.8314 3.51171 12.1145 2.50211 10.9698C1.49252 9.8251 0.957113 8.33868 1.0049 6.81314C1.05268 5.28759 1.68006 3.83759 2.75932 2.75834C3.83857 1.67908 5.28856 1.0517 6.81411 1.00392C8.33966 0.956136 9.82608 1.49154 10.9708 2.50114C12.1154 3.51073 12.8323 4.91862 12.9755 6.43819C13.1187 7.95775 12.6773 9.47476 11.7414 10.6804L14.5314 13.4704C14.605 13.539 14.6642 13.6218 14.7051 13.7138C14.7461 13.8058 14.7682 13.9052 14.77 14.0059C14.7717 14.1066 14.7532 14.2066 14.7155 14.3C14.6778 14.3934 14.6216 14.4782 14.5504 14.5494C14.4792 14.6206 14.3943 14.6768 14.301 14.7145C14.2076 14.7522 14.1075 14.7708 14.0068 14.769C13.9061 14.7672 13.8068 14.7452 13.7148 14.7042C13.6228 14.6632 13.54 14.6041 13.4714 14.5304L10.6814 11.7404Z"
                fill="currentColor"
              />
            </svg>

            <Input
              type="text"
              id="filter-text-box"
              placeholder="Search product..."
              onInput={onFilterTextBoxChanged}
            />
          </div>
        </div>
        {/* <button onClick={exportToExcel}>Export to Excel</button> */}
        <div className={`${themeClass} ${styles.grid} `}>
          <AgGridReact
            theme="legacy"
            ref={gridRef}
            columnDefs={colDefs}
            rowData={rowData}
            defaultColDef={defaultColDef}
            rowHeight={80}
            autoSizeStrategy={autoSizeStrategy}
            pagination
            enableCharts={true}
            cellSelection={true}
            paginationPageSize={10}
            paginationPageSizeSelector={paginationPageSizeSelector}
            masterDetail
            detailCellRendererParams={detailCellRendererParams}
            quickFilterText={quickFilterText}
            detailRowAutoHeight
            getContextMenuItems={getContextMenuItems}
          />
        </div>
      </div>
    </div>
  );
};
