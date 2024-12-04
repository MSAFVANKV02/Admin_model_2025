import TaskModal, {
  TaskModalContent,
  TaskModalFooter,
  
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
import { Form, Formik } from "formik";
import { InitialValues } from "@/pages/products/add-new/initialValues";
import AllNewProductsTable from "@/components/products/price section/All_new_Products_Table";
import AyButton from "@/components/myUi/AyButton";

type Props = {
  product: IProducts; // The product object to be passed to the modal
};

export default function AllProductsActionModal({ product }: Props) {
  const { openProductModal, selectedProducts } = useModal();
//   const [formInitialValues, setFormInitialValues] = useState(InitialValues);

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

      <TaskModal className="w-[60vw]  ">
        {/* <TaskModalHeader>Select Store</TaskModalHeader> */}
        <Formik
          initialValues={InitialValues}
          onSubmit={() => {
            console.log("form submitted");
          }}
        >
          {({values, setFieldValue }) => (
            <Form
            className="flex flex-col justify-between h-full"
            >
              <TaskModalContent>
                <AllNewProductsTable
                  values={values}
                  setFieldValue={setFieldValue}
                />
              </TaskModalContent>
              <TaskModalFooter>
                <AyButton title="Save" />
              </TaskModalFooter>
            </Form>
          )}
        </Formik>
      </TaskModal>
    </div>
  );
}
