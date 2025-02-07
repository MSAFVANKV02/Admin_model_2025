import { cn } from "@/lib/utils";
import { FormFieldGenal, GeneralFormValues } from "../GeneralSection-page";
import { Input } from "@/components/ui/input";

type Props = {
  values: GeneralFormValues;
  setFieldValue: (name: string, value: any) => void;
};

const GstOnItemsRate = ({ setFieldValue, values }: Props) => {
  const Fields = [
    { id: "greaterThan", title: "Greater Than", name: "greaterThan", placeholder: "Enter Greater Than", disabled:false },
    { id: "upto", title: "Up to", name: "upto", placeholder: "Enter Up To", disabled:false },
    { id: "igst", title: "IGST", name: "igst", placeholder: "Enter IGST", disabled:false },
    { id: "cgst", title: "CGST", name: "cgst", placeholder: "Enter CGST", disabled:true },
    { id: "sgst", title: "SGST", name: "sgst", placeholder: "Enter SGST", disabled:true },
    { id: "cess", title: "Cess", name: "cess", placeholder: "Enter Cess", disabled:false },
  ];

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, fieldName: string) => {
//     const newValue = e.target.value;
//     let updatedList = [...values.tax_details.on_items_rate_details];

//     // Ensure numeric values for validation
//     const parsedValue = newValue ? parseFloat(newValue) : 0;

//     // Update the current field
//     updatedList[index] = {
//       ...updatedList[index],
//       [fieldName]: newValue,
//     };

//     // ✅ Auto-set CGST & SGST when IGST is entered
//     if (fieldName === "igst") {
//       const igstValue = parsedValue;
//       updatedList[index].cgst = (igstValue / 2).toString();
//       updatedList[index].sgst = (igstValue / 2).toString();
//     }

//     // ✅ If 'upto' changes, auto-update the next row's 'greaterThan'
//     if (fieldName === "upto" && updatedList[index + 1]) {
//       updatedList[index + 1].greaterThan = parsedValue ? (parsedValue + 1).toString() : "";
//     }

//     // ✅ If all fields are filled, create a new row
//     const allFieldsFilled = Fields.every((field) => updatedList[index][field.name]);
//    // ✅ If all fields are filled, create a new row
// if (allFieldsFilled && index === updatedList.length - 1) {
//     const nextGreaterThan = parsedValue ? (parsedValue + 1).toString() : "";
  
//     updatedList.push({
//       greaterThan: nextGreaterThan, // ✅ Immediately set the next greaterThan value
//       upto: "",
//       igst: "",
//       cgst: "",
//       sgst: "",
//       cess: "",
//     });
//   }
  

//     // ✅ If 'upto' is removed, delete all rows below it
//     if (fieldName === "upto" && newValue === "") {
//       updatedList = updatedList.slice(0, index + 1);
//     }

//     setFieldValue("tax_details.on_items_rate_details", updatedList);
//   };
const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, fieldName: string) => {
    const newValue = e.target.value;
    let updatedList = [...values.tax_details.on_items_rate_details];

    // Ensure numeric values for validation
    const parsedValue = newValue !== "" ? parseFloat(newValue) : NaN;

    // ✅ No restriction on "Cess" field
    if (fieldName === "cess") {
        updatedList[index][fieldName] = newValue;
    }

    // ✅ Restrict IGST to only positive numbers
    if (fieldName === "igst" && (isNaN(parsedValue) || parsedValue < 0)) {
        return; // Prevent negative values
    }

    // ✅ Update field value
    updatedList[index] = {
        ...updatedList[index],
        [fieldName]: newValue,
    };

    // ✅ If "greaterThan" is updated, auto-fill "upto" but allow manual edits
    if (fieldName === "greaterThan") {
        updatedList[index].upto = newValue;
    }

    // ✅ "Upto" field handling
    if (fieldName === "upto") {
        const greaterThanValue = parseFloat(updatedList[index].greaterThan || "0");

        // If it's the only field or the last field, allow any changes
        if (updatedList.length === 1 || index === updatedList.length - 1) {
            updatedList[index].upto = newValue;
        } 
        // Otherwise, only prevent decreasing
        else if (parsedValue < greaterThanValue) {
            return; // Prevent decreasing "upto"
        } else {
            updatedList[index].upto = newValue;
        }
    }

    // ✅ Auto-set CGST & SGST when IGST is entered
    if (fieldName === "igst") {
        updatedList[index].cgst = (parsedValue / 2).toString();
        updatedList[index].sgst = (parsedValue / 2).toString();
    }

    // ✅ Auto-update the next row’s "greaterThan" when "upto" changes
    if (fieldName === "upto" && updatedList[index + 1]) {
        updatedList[index + 1].greaterThan = (parsedValue + 1).toString();
    }

    // ✅ If all fields are filled, create a new row
    const allFieldsFilled = Fields.every((field) => updatedList[index][field.name]);
    if (allFieldsFilled && index === updatedList.length - 1) {
        updatedList.push({
            greaterThan: (parsedValue + 1).toString(),
            upto: "",
            igst: "",
            cgst: "",
            sgst: "",
            cess: "",
        });
    }

    setFieldValue("tax_details.on_items_rate_details", updatedList);
};

  return (
    <div className="flex justify-end">
      <div className="border w-3/4 p-4 rounded-sm">
        {values.tax_details.on_items_rate_details.map((item, index) => (
          <div key={index} className="grid sm:grid-cols-6 grid-cols-3 gap-2 mb-2">
            {Fields.map((field) => (
              <FormFieldGenal
                key={field.id + index}
                titleSize="xs"
                title={field.title}
                id={`tax_details.on_items_rate_details.${index}.${field.id}`}
                name={`tax_details.on_items_rate_details.${index}.${field.name}`}
                className={cn("flex md:flex-col md:items-start")}
                fieldClassName="w-[70px] p-1"
                type="number"
                fieldAs={Input}
                value={item[field.name] || ""}
                onChange={(e) => handleChange(e, index, field.name)}
                disabled={field.name === "greaterThan" && index !== 0 || field.disabled} 
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GstOnItemsRate;
