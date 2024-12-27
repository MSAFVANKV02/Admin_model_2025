import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  type: string;
  accept: string;
  selectedData?: any;
  className?: string;
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FileInput({
  name,
  type="file",
  accept,
  selectedData,
  onChange,
  className,
  id
}: Props) {
  return (
    <Label
      htmlFor={name}
      className={cn(`w-full border h-12 rounded-md flex items-center cursor-pointer`,className)}
    >
      <div className="px-5 border-r h-full text-center flex items-center bg-gray-100">
        Browse
      </div>
      <div className="px-5  h-full text-center flex items-center truncate whitespace-nowrap overflow-hidden">
        {selectedData ? selectedData : " Choose File"}
      </div>

      <Input
      id={id}
        type={type}
        name={name}
        className="hidden"
        onChange={onChange}
        accept={accept}
      />
    </Label>
  );
}
