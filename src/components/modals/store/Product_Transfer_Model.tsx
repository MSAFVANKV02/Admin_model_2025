import { useModal } from "@/providers/context/context";
import TaskModal, { TaskModalContent, TaskModalHeader } from "../TaskModal";
import MyCloseIcon from "@/components/icons/My_CloseIcon";
import ProductTransferTable from "@/pages/store/product-transfer/product_transfer_table";
import { Form, Formik } from "formik";
import { FormField } from "@/components/myUi/FormField";
import { Input } from "@/components/ui/input";
import FileInput from "@/components/myUi/FileInput";
import { Label } from "@/components/ui/label";

export default function ProductTransferModel() {
  const { setIsOpen } = useModal();
  return (
    <div>
      <TaskModal className="md:w-[50%] sm:w-[80%] w-full md:px-10 sm:px-5 px-1">
        {/* Modal Header */}
        <TaskModalHeader>
          <h3>Product Transfer</h3>
          <MyCloseIcon onClick={() => setIsOpen(false)} />
        </TaskModalHeader>

        <Formik
          initialValues={{
            fromStore: "",
            toStore: "",
            product: "",
            variant: "",
            size: "",
            quantity: 0,
          }}
          onSubmit={(values, actions) => {
            // Handle form submission
            console.log(values);
            
            actions.resetForm();
            setIsOpen(false);
          }}
        >
          {({ values }) => (
            <Form>
              <TaskModalContent className="space-y-3">
                {/* Content */}
                {/* 1. ==== from to ===== */}
              
                  <FormField
                    id="fromStore"
                    name="fromStore"
                    placeholder="Select store"
                    value={values.fromStore}
                    fieldAs={Input}
                    classnamewrapper=""
                    fieldClassName="w-full"
                    title="From"
                  />

                  <FormField
                    id="fromStore"
                    name="fromStore"
                    value={values.fromStore}
                    placeholder="Select store"
                    fieldAs={Input}
                    classnamewrapper=""
                    fieldClassName="w-full"
                    title="To"
                  />
              

                <div className="flex lg:flex-row flex-col gap-3 justify-between">
                  <Label className="text-textGray text-sm">
                    Bill / Delivery Chalan
                  </Label>
                  <FileInput
                    onChange={() => {}}
                    accept=".pdf"
                    id=""
                    type="file"
                    className="lg:w-3/4 w-full"
                    name=""
                  />
                </div>

                <FormField
                  title="product name / sku"
                  name="product"
                  fieldAs={Input}
                  placeholder="product"
                  id="product"
                  value={values.product}
                />

                <ProductTransferTable />
              </TaskModalContent>
            </Form>
          )}
        </Formik>

        {/* Modal Content */}
      </TaskModal>
    </div>
  );
}
