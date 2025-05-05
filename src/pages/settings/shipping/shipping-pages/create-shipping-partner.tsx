import Image from "@/components/global/image";
import Loader from "@/components/global/loader";
import MyCloseIcon from "@/components/icons/My_CloseIcon";
import AyButton from "@/components/myUi/AyButton";
import { MySwitch } from "@/components/myUi/mySwitch";
import OpenMediaDrawer from "@/components/myUi/OpenMediaDrawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

type FieldType = {
  name: string;
  label: string;
  placeholder?: string;
  children?: (values: FormData, setFieldValue: any) => React.ReactNode;
  valueType?: "string" | "boolean" | "number";
};

export interface FormData {
  name: string;
  logo: string;
  price_per_kg: number;
  price_per_bundle: number;
  min_weight: number;
  is_min_price_enabled: boolean;
  package_dimension: PackageDimension;
  is_door_delivery: boolean;
  is_topay: boolean;
  deliverable_area: string[];
}

export interface PackageDimension {
  length: number;
  width: number;
  height: number;
  weight: number;
}

function CreateShippingPartner() {
  // Initial form values
  const initialValues: FormData = {
    name: "",
    logo: "",
    price_per_kg: 0,
    price_per_bundle: 0,
    min_weight: 0,
    is_min_price_enabled: false,
    package_dimension: {
      length: 0,
      width: 0,
      height: 0,
      weight: 0,
    },
    is_door_delivery: false,
    is_topay: false,
    deliverable_area: [],
  };

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Shipping Partner Name is required"),
    logo: Yup.string().required("Logo URL is required"),
    price_per_kg: Yup.number()
      .required("Price per KG is required")
      .min(1, "Price must be positive"),
    price_per_bundle: Yup.number()
      .required("Price per Bundle is required")
      .min(1, "Price must be positive"),
    min_weight: Yup.number()
      .required("Minimum weight is required")
      .min(1, "Weight must be positive"),
    is_min_price_enabled: Yup.boolean(),
    package_dimension: Yup.object({
      length: Yup.number()
        .required("Length is required")
        .min(1, "Length must be positive"),
      width: Yup.number()
        .required("Width is required")
        .min(1, "Width must be positive"),
      height: Yup.number()
        .required("Height is required")
        .min(1, "Height must be positive"),
      weight: Yup.number()
        .required("Weight is required")
        .min(1, "Weight must be positive"),
    }),
    is_door_delivery: Yup.boolean(),
    is_topay: Yup.boolean(),
    deliverable_area: Yup.array().of(Yup.string().required("Area is required")),
  });

  const fields: FieldType[] = [
    {
      name: "name",
      label: "Shipping Partner Name",
      placeholder: "Enter the shipping partner's name",
      valueType: "string",
    },
    {
      name: "logo",
      label: "Logo URL",
      children: (values: FormData, setFieldValue: any) => (
        <div className="flex flex-col gap-3">
          <OpenMediaDrawer
            name="logo"
            title=""
            category="all"
            mediaType="image"
            // values={values}
            handleFileChange={(event) => {
                const imgArray = event[0].imageurl;
                setFieldValue("logo", imgArray);
              }}
          />

          {
            values.logo && (
                <Image
                src={values.logo}
                className="w-20 h-20 rounded-xl overflow-hidden relative"
                classNameImg="object-cover w-full h-full"
               >
                <div  className="absolute top-0 right-0 ">
                    <MyCloseIcon 
                    onClick={()=>{
                        setFieldValue("logo", "");
                    }}
                    />
                </div>

               </Image>
            )
          }
        </div>
      ),
      valueType: "string",
    },
    {
      name: "price_per_kg",
      label: "Price per KG",
      placeholder: "Enter price per kg",
      valueType: "number",
    },
    {
      name: "price_per_bundle",
      label: "Price per Bundle",
      placeholder: "Enter price per bundle",
      valueType: "number",
    },
    {
      name: "min_weight",
      label: "Minimum Weight",
      placeholder: "Enter minimum weight",
      valueType: "number",
    },
    {
      name: "deliverable_area",
      label: "Deliverable Area",
      placeholder: "Enter deliverable areas (comma-separated)",
      valueType: "string",
    },
    {
      name: "package_dimension.length",
      label: "Package Length",
      placeholder: "Enter package length",
      valueType: "number",
    },
    {
      name: "package_dimension.width",
      label: "Package Width",
      placeholder: "Enter package width",
      valueType: "number",
    },
    {
      name: "package_dimension.height",
      label: "Package Height",
      placeholder: "Enter package height",
      valueType: "number",
    },
    {
      name: "package_dimension.weight",
      label: "Package Weight",
      placeholder: "Enter package weight",
      valueType: "number",
    },
    {
      name: "is_min_price_enabled",
      label: "Enable Minimum Price",
      valueType: "boolean",
      children: (values: FormData, setFieldValue: any) => (
        <div className="">
          <MySwitch
            isOn={values.is_min_price_enabled}
            handleToggle={() => {
              setFieldValue(
                "is_min_price_enabled",
                !values.is_min_price_enabled
              );
            }}
            id="is_min_price_enabled_switch"
          />
        </div>
      ),
    },
    {
      name: "is_door_delivery",
      label: "Is Door Delivery",
      valueType: "boolean",
      children: (values: FormData, setFieldValue: any) => (
        <div className="">
          <MySwitch
            isOn={values.is_door_delivery}
            handleToggle={() => {
              setFieldValue("is_door_delivery", !values.is_door_delivery);
            }}
            id="is_door_delivery_switch"
          />
        </div>
      ),
    },
    {
      name: "is_topay",
      label: "Is To Pay",
      valueType: "boolean",
      children: (values: FormData, setFieldValue: any) => (
        <div className="">
          <MySwitch
            isOn={values.is_topay}
            handleToggle={() => {
              setFieldValue("is_topay", !values.is_topay);
            }}
            id="is_topay_switch"
          />
        </div>
      ),
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          console.log("Form data:", values);
          // Submit your data here
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      }}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className="max-w-screen-2xl mx-auto">
          {fields.map((field, index) => (
            <div
              key={index}
              className={`flex justify-between  md:flex-row flex-col gap-3 w-full mb-4`}
            >
              <Label
                htmlFor={field.name}
                className="font-bold text-textGray capitalize"
              >
                {field.label}
              </Label>
              <div className={`flex flex-col   w-3/4`}>
                {field.children ? (
                  // For custom components like MySwitch
                  <div className={``}>
                    {field.children(values, setFieldValue)}
                  </div>
                ) : (
                  <div className={``}>
                    <Field
                      name={field.name}
                      id={field.name}
                      className="border p-6 bg-gray-50"
                      as={Input}
                      placeholder={field.placeholder} // Adding placeholder here
                    />
                  </div>
                )}
                <ErrorMessage
                  component="span"
                  name={field.name}
                  className="text-red-600 text-xs"
                />
              </div>
            </div>
          ))}
          <div className="flex justify-end w-full mb-4">
            <AyButton type="submit">
              <Loader state={isSubmitting}>Create</Loader>
            </AyButton>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default CreateShippingPartner;
