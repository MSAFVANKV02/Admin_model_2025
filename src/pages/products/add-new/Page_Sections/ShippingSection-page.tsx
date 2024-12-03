import { MySwitch } from "@/components/myUi/mySwitch";
import { Label } from "@/components/ui/label";
import { IProducts } from "@/types/productType";

type Props = {
  setFieldValue: any;
  values: IProducts;
  errors: any;
};

export default function ShippingSectionPage({
  values,
  setFieldValue,
  errors,
}: Props) {
  console.log(errors, "shipping");

  return (
    <div className=" xl:h-[60vh] md:h-[55vh] sm:h-[40vh] h-[50vh]">
      <div className="flex flex-col gap-4 lg:w-[30%] ">
        <div className="flex items-center justify-between">
          <Label htmlFor="cod" className="text-textGray">
            COD
          </Label>
          <MySwitch
            id="code"
            isOn={values.cod}
            handleToggle={() => {
              setFieldValue("cod", !values.cod);
            }}
          />
        </div>
      {/* free shipping */}

        <div className="flex items-center justify-between">
          <Label htmlFor="freeShipping" className="text-textGray">
            COD
          </Label>
          <MySwitch
            id="freeShipping"
            isOn={values.freeShipping}
            handleToggle={() => {
              setFieldValue("freeShipping", !values.freeShipping);
            }}
          />
        </div>

        {/* error */}
        {errors && <span className="text-red-500">Please Fill All Mandatory Fields</span>}
      </div>
    </div>
  );
}
