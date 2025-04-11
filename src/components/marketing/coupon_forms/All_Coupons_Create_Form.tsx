import { useModal } from "@/providers/context/context";

import { ErrorMessage, Form, Formik } from "formik";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";

import * as Yup from "yup";
import { FormField } from "@/components/myUi/FormField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MySwitch } from "@/components/myUi/mySwitch";
import AyButton from "@/components/myUi/AyButton";

import { ICouponType } from "@/types/ICouponTypes";
import CouponSelections from "./copon_selections/Coupon_Selections";
import { create_Coupons_Api } from "@/services/coupons/route";
import { makeToast, makeToastError } from "@/utils/toaster";

const validationSchema = Yup.object().shape({
  code: Yup.string().required("Coupon code is required"),
  discountType: Yup.string().required("Discount type is required"),
  // discountValue: Yup.number().required("Discount amount is required"),
  // minimum_purchase_amount: Yup.number().required("Minimum purchase amount is required"),
  discountValue: Yup.number()
    .min(1)
    .typeError("Discount amount must be a number")
    .required("Discount amount is required"),

  startDate: Yup.date().required("Start date is required").nullable(),
  expiryDate: Yup.date()
    .required("Expiration date is required")
    .nullable()
    .test(
      "expired_at",
      "Expiration date cannot be earlier than start date",
      function (value) {
        const { start_date } = this.parent;
        if (start_date && value) {
          return new Date(value) >= new Date(start_date);
        }
        return true;
      }
    ),
  isActive: Yup.boolean(),
  // applicableProducts: Yup.array()
  //   .of(Yup.string().required())
  //   .min(1, "At least one product must be selected")
  //   .required("Applicable products are required"),
});

// const productOptions: SelectOption[] = [
//   { _id: "product_1", name: "Product 1" },
//   { _id: "product_2", name: "Product 2" },
//   { _id: "product_3", name: "Product 3" },
// ];

export default function AllCouponsCreateForm() {
  const { setIsOpen } = useModal();

  const selectItems: {
    id: number;
    title: string;
    name: keyof Partial<ICouponType>;
    placeholder?: string;
  }[] = [
    {
      id: 1,
      title: "Applicable Products",
      name: "applicableProducts",
      placeholder: "Select Products",
    },
    {
      id: 2,
      title: "Applicable Categories",
      name: "applicableCategories",
      placeholder: "Select Categories",
    },
    {
      id: 3,
      title: "Applicable Stores",
      name: "applicableStores",
      placeholder: "Select Stores",
    },
    {
      id: 4,
      title: "Applicable Sellers",
      name: "applicableSellers",
      placeholder: "Select Sellers",
    },
  ];

  return (
    <div className="border p-5 shadow-xl rounded-lg">
      <Formik<Partial<ICouponType>>
        validationSchema={validationSchema}
        initialValues={{
          // _id: "",
          code: "",
          discountType: "PERCENTAGE",
          discountValue: 0,
          startDate: new Date(),
          expiryDate: new Date(),
          isActive: false,
          applicableProducts: [],
          applicableCategories: [],
          applicablePurchaseType: "ALL",
          applicableToAll: false,
          applicableSellers: [],
          maxUsagePerUser: 1,
        }}
        onSubmit={async (values, { resetForm }) => {
          console.log(values);
          try {
            const { status, data } = await create_Coupons_Api(values);
            if (status === 201) {
              makeToast(data.message);
              resetForm();
              setIsOpen(false);
            }
          } catch (error: any) {
            if (error) {
              makeToastError(error.response.data.message);
            }
            console.error(error);
          }
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-4">
            {/* 1. code name */}
            <FormField
              value={values.code}
              title="code"
              id="code"
              name="code"
              placeholder="Enter code"
              fieldAs={Input}
            />

            {/* 2. Discount Type */}
            <div className="flex justify-between lg:flex-row flex-col gap-3">
              <Label htmlFor="discountType" className="text-sm text-textGray">
                Discount Type
              </Label>
              <div className="flex flex-col lg:w-3/4 w-full gap-2">
                <Select
                  onValueChange={(value) => {
                    setFieldValue("discountType", value);
                  }}
                  value={values.discountType}
                >
                  <SelectTrigger className="w-full p-6">
                    <SelectValue placeholder="Select Discount Type" />
                  </SelectTrigger>
                  <SelectContent className=" ">
                    <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                    <SelectItem value="FIXED_AMOUNT">Fixed Price</SelectItem>
                  </SelectContent>
                </Select>

                <ErrorMessage
                  name="discountType"
                  component="span"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>

            {/* 3. discount amount */}
            <FormField
              value={values.discountValue}
              title="Discount Amount"
              id="discountValue"
              name="discountValue"
              type="number"
              placeholder="Enter discount amount"
              fieldAs={Input}
            />

            {/* 4. purchase Limit per user */}

            <FormField
              value={values.maxUsagePerUser}
              title="User Limit"
              id="maxUsagePerUser"
              name="maxUsagePerUser"
              type="number"
              placeholder="Enter Purchase Limit"
              fieldAs={Input}
            />

            {/* applicable items */}
            {selectItems.map((items, index) => (
              <CouponSelections
                placeholder={items.placeholder}
                index={index}
                name={items.name}
                setFieldValue={setFieldValue}
                values={values}
                title={items.title}
              />
            ))}

            {/* === Dates Started ===== */}

            <div className="flex justify-between gap-10 lg:flex-row flex-col">
              <Label className="text-sm text-textGray">
                Started At / Expired At
              </Label>
              {/* 5. start date */}
              <div className="flex  md:w-3/4 w-full lg:flex-row flex-col gap-3">
                <div className="flex flex-col gap-3">
                  <Calendar
                    id="startDate"
                    mode="single"
                    selected={values.startDate}
                    onSelect={(value) => {
                      setFieldValue("startDate", value);
                    }}
                    className="rounded-md border w-fit"
                  />
                </div>
                <ErrorMessage
                  name="start_date"
                  component="span"
                  className="text-red-500 text-xs"
                />
                <div className="lex flex-col gap-3">
                  <Calendar
                    id="expiryDate"
                    selected={values.expiryDate}
                    mode="single"
                    onSelect={(value) => {
                      setFieldValue("expiryDate", value);
                    }}
                    className="rounded-md border w-fit"
                  />
                  <ErrorMessage
                    name="expiryDate"
                    component="span"
                    className="text-red-500 text-xs"
                  />
                </div>
              </div>

              {/* 6. expiration date */}
            </div>

            {/* ======= */}

            {/* 7. is active */}
            <div className="flex justify-between lg:flex-row flex-col">
              <Label htmlFor="isActive" className="text-sm text-textGray">
                Is Active
              </Label>
              <div className="flex items-center gap-2 lg:w-3/4">
                <MySwitch
                  handleToggle={() => {
                    setFieldValue("isActive", !values.isActive);
                  }}
                  id="isActive"
                  isOn={!!values.isActive}
                />
              </div>
            </div>

            <div className="flex justify-end gap-5">
              <AyButton title="Save" type="submit" />
              <AyButton
                title="Cancel"
                onClick={() => {}}
                type="button"
                sx={{
                  bgcolor: "black",
                  "&:hover": {
                    bgcolor: "rgba(0, 0, 0, 0.80)",
                  },
                }}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
