import { cn } from "@/lib/utils";
import { useModal } from "@/providers/context/context";
import { Icon } from "@iconify/react/dist/iconify.js";
import MediaFilesModal from "./Media_Files_Modal";

type Props = {
  className?: string;
  title?: string;
  name?: string;
  classnamewrapper?: string; // Additional class for the field
  img?: string;
  selectedData?: any;
  setFieldValues?: (name: string , value:any) => void;
  multiple?: boolean; 
  handleFileUpload: (
    event: string[],
    fieldName: string
  ) => void;
  mediaType?: "pdf" | "image" | "";
};

export default function MediaFiles({
  className,
  img,
  selectedData,
  name,
  multiple = false,
  handleFileUpload,
  mediaType,
  title
}: Props) {
    const {setIsOpen} = useModal();

    // console.log(setFieldValues,'setFieldValues');
    
  return (
    <div className="flex lg:items-center gap-3 lg:flex-row flex-col ">
      {
        title && (
          <div className="text-textGray font-bold text-xs mt-2">
            {title}
          </div>
        )
      }
        <div
      className={cn(
        `w-full border h-12 rounded-md flex items-center cursor-pointer overflow-hidden`,
        className
      )}
      onClick={() => setIsOpen(true)}
    >
      <div className="px-5 border-r h-full text-center flex items-center bg-gray-100">
        {img ? <Icon icon={img} fontSize={25} color="#7A7A7A" /> : "Browse"}
      </div>
      <div className="flex-1 h-full flex items-center text-xs px-3 overflow-hidden">
        {/* Ensure the container has restricted width */}
        <span className="truncate w-full font-bold">
          {selectedData ? selectedData : "Choose File"}
        </span>
      </div>
    </div>

    <MediaFilesModal
        handleFileUpload={handleFileUpload}
        name={name}
        multiple={multiple} 
        mediaType={mediaType}
      />
    </div>

  );
}
