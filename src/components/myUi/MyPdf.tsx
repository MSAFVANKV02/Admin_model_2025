
import { cn } from "@/lib/utils";
import PdfFile from "./PdfFile";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
    value: string;
    className?: string;
};

export default function MyPdf({
    value,
    className
}: Props) {
  return (
   <div className="w-fit">
     <a
      href={value}
      target="_blank"
      rel="noopener noreferrer"
      className="relative w-fit"
    >
      <PdfFile fileURL={value} className={cn(`h-16 w-16`,className)} />
      <div className={cn(`absolute h-16 w-16 bg-black/50 top-0 rounded-md flex items-center justify-center`,className)}>
        <Icon icon="solar:eye-bold" fontSize={20} color="#fff" />
      </div>
    </a>
   </div>
  );
}
