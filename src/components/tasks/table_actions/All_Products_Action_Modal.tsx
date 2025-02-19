import TaskModal, {
  TaskModalContent,
  TaskModalFooter,
} from "@/components/modals/TaskModal";
import { useModal } from "@/providers/context/context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import { IProducts } from "@/types/productType";
import useDownloadXl from "@/hooks/DownloadStockReport";
import { IconButton } from "@mui/material";
import { Form, Formik } from "formik";
import AyButton from "@/components/myUi/AyButton";
import { useEffect, useState } from "react";
import ProductTableModalData from "../../products/All_Products_Modal/Product_Table_Modal";
// s
type Props = {
  product: IProducts;
};

const InitialValues: IProducts = {
  product_name: "",
  mrp: 0,
  product_sku: "",
  barcode: "",
  brand: "",
  keywords: [],
  minimum_quantity: 0,
  product_weight: 0,
  product_owner: "admin",
  // height: 0,
  // length: 0,
  // width:0,
  product_dimensions: {
    product_height: 0,
    product_length: 0,
    product_width: 0,
  },
  // dimensions: '',
  tax_details: {
    // taxSlab: [],
    hsn_sac_number: 0,
    non_gst_goods: "no",
    calculation_types: "on_value",
    igst: 0,
    central_tax: 0,
    state_tax: 0,
    // =====
    on_items_rate_details: [
      {
        greaterThan: 0,
        upto: 0,
        igst: 0,
        cgst: 0,
        sgst: 0,
        cess: 0,
      },
    ],
    isCess: false,
    cess: undefined,
  },
  // isCess: false,
  //     cess: [],
  //     taxSlab: [],
  is_published: false,
  status: "hold",
  is_todays_deal: false,
  is_featured_product: false,
  description: "",

  // ===== File upload section =================
  gallery_image: [],
  thumbnails: [],
  // productImages: [],
  sizeImages: [],
  // ===== price stock section =================

  base_price: 0,
  sample_price: 0,
  discount: 0,
  discount_type: "percentage",
  price_per_pieces: [],
  selectWise: "size",
  store: "",
  variations: [],

  // ===== shipping section =================
  cod: false,
  freeShipping: false,
};

export default function AllProductsActionModal({ product }: Props) {
  const { openProductModal, selectedProducts, closeModal } = useModal();
  const { downloadStockReport } = useDownloadXl();

  const [initialValues, setInitialValues] = useState<IProducts>(InitialValues);

  useEffect(() => {
    if (selectedProducts) {
      setInitialValues((prevData) => ({
        ...prevData,
        ...selectedProducts,
      }));
    }
  }, [selectedProducts]);

  return (
    <div className="flex">
      <IconButton>
        <Icon
          icon="fluent:open-20-regular"
          onClick={() => openProductModal(product)}
        />
      </IconButton>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconButton>
            <Icon icon="mi:options-vertical" />
          </IconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Approve</DropdownMenuItem>
          <DropdownMenuItem>Reject</DropdownMenuItem>
          <DropdownMenuItem>Hold</DropdownMenuItem>
          <DropdownMenuItem onClick={() => downloadStockReport([product])}>
            Download Stock Report
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <TaskModal className="min-w-[60vw] w-fit">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={(values) => {
            console.log("Updated Values:", values);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col justify-between h-full">
              <TaskModalContent>
                <ProductTableModalData
                  values={values}
                  setFieldValue={setFieldValue}
                />
              </TaskModalContent>
              <TaskModalFooter>
                <AyButton title="Save" type="submit" />
                <AyButton title="Close" type="button" variant="cancel" 
                onClick={()=>{
                  openProductModal(null);
                  closeModal();
                  // setInitialValues(InitialValues);
                }}
                />
              </TaskModalFooter>
            </Form>
          )}
        </Formik>
      </TaskModal>
    </div>
  );
}
