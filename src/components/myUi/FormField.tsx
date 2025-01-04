import { ErrorMessage, Field } from "formik";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

type FormFieldGenalProps = {
  // children: React.ReactNode;
  className?: string;
  value: string | number | boolean | undefined;
  title?: string; // Label for the field
  id: string;
  name: string;
  placeholder?: string;
  fieldAs?: React.ElementType;
  fieldClassName?: string;
  type?: string;
  className2?: string; // Additional class for the field
};

export function FormField({
  className,
  value,
  title,
  id,
  name,
  placeholder,
  fieldAs,
  fieldClassName,
  type = "text", // default type is text
  className2,
}: FormFieldGenalProps) {
  return (
    <div
      className={cn(
        "flex lg:flex-row flex-col gap-2 lg:items-center justify-between",
        className
      )}
    >
      {title && (
        <Label htmlFor={name} className="text-textGray">
          {title}
        </Label>
      )}

<div className={cn(`flex flex-col gap-2 w-full lg:w-3/4`, className2)}>
        <Field
          id={id}
          name={name}
          placeholder={placeholder}
          className={cn(`w-full p-6`, fieldClassName)}
          type={type}
          as={fieldAs}
          value={value} // Bind field value to Formik
        />
        <ErrorMessage
          name={name}
          component="span"
          className="text-red-500 text-xs"
        />
      </div>
    </div>
  );
}
