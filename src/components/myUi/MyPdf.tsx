import { cn } from "@/lib/utils";
import PdfFile from "./PdfFile";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import React, { memo } from "react";

type Props = {
  value: string;
  className?: string;
  isPdfShown?: boolean;
  selectedData?: string;
  children?: React.ReactNode;
};

function MyPdf({
  value,
  className,
  isPdfShown = false,
  selectedData,
  children,
}: Props) {
  return (
    <div className="w-fit">
      {isPdfShown ? (
        <Link
          to={value}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-fit"
        >
          <PdfFile fileURL={value} className={cn(`h-16 w-16`, className)} />
          <div
            className={cn(
              `absolute h-16 w-16 bg-black/50 top-0 rounded-md flex items-center justify-center`,
              className
            )}
          >
            <Icon icon="solar:eye-bold" fontSize={20} color="#fff" />
          </div>
        </Link>
      ) : (
        <Link
          to={value}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-fit text-xs text-blue-500 underline"
        >
          {children ? children : selectedData}
        </Link>
      )}
    </div>
  );
}

export default memo(MyPdf);
