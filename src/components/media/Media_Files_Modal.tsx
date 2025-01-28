import AllUploadedFiles from "@/pages/settings/media/retrive/all_uploaded_files";
import TaskModal, {
  TaskModalContent,
  TaskModalFooter,
  TaskModalHeader,
} from "../modals/TaskModal";
import AyButton from "../myUi/AyButton";
import { memo, useState } from "react";
import { useModal } from "@/providers/context/context";

type Props = {
  setFieldValues?: (name: string, value: any) => void;
  fieldName?: string;
  multiple?: boolean;
  handleFileUpload: (event: string[], fieldName: string) => void;
  mediaType?: "pdf" | "image" ;
};

function MediaFilesModal({
  fieldName,
  multiple,
  handleFileUpload,
  mediaType,
}: Props) {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const { setIsOpen } = useModal();

  const handleFileSelection = (src: string[]) => {
    if (multiple) {
      const newSelectedFiles = src;
      setSelectedFiles(newSelectedFiles);
    } else {
      const [selectedFile] = src;
      setSelectedFiles([selectedFile]);
    }
  };

  const handleSelectFiles = () => {
    if (fieldName) {
      handleFileUpload(selectedFiles, fieldName);
      setIsOpen(false);
    }
  };

  // console.log(fieldName, "fieldName in nowhere");

  return (
    <TaskModal className="md:w-[70%] md:h-[90%]">
      <TaskModalHeader>
        <h1 className="text-textGray font-bold">Select Files</h1>
      </TaskModalHeader>

      <TaskModalContent className="max-h-[90%] scrollbar-none overflow-y-scroll">
        <AllUploadedFiles
          onClick={(src) => handleFileSelection(src)}
          multiple={multiple} // Enable multiple file selection
          mediaType={mediaType} // Show only images
        />
      </TaskModalContent>
      <TaskModalFooter>
        <AyButton title="Select" type="button" onClick={handleSelectFiles} />
      </TaskModalFooter>
    </TaskModal>
  );
}

export default memo(MediaFilesModal) 