import AllUploadedFiles from "@/pages/settings/media/retrive/all_uploaded_files";
import TaskModal, {
  TaskModalContent,
  TaskModalFooter,
  TaskModalHeader,
} from "../modals/TaskModal";
import AyButton from "../myUi/AyButton";
import { useState } from "react";
import { useModal } from "@/providers/context/context";

type Props = {
  setFieldValues?: (name: string, value: any) => void;
  name?: string;
  multiple?: boolean;
  handleFileUpload: (event: string[], fieldName: string) => void;
  mediaType?: "pdf" | "image" | "";
};

export default function MediaFilesModal({
  name,
  multiple,
  handleFileUpload,
  mediaType,
}: Props) {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const {setIsOpen} = useModal();


  const handleFileSelection = (src: string[]) => {
    // If 'multiple' is true, handle multiple file selections
    if (multiple) {
      const newSelectedFiles = src;
      setSelectedFiles(newSelectedFiles); // Set the new selected files
      // handleFileUpload(newSelectedFiles, name || "default"); // Pass the updated array of selected files
    } else {
      const [selectedFile] = src; // Only select the first file for single file selection
      setSelectedFiles([selectedFile]); // Reset selected files to only this one
      // handleFileUpload([selectedFile], name || "default"); // Always pass an array to handleFileUpload
    }
  };

  // console.log(selectedFiles, "selectedFiles");

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
        <AyButton
          title="Select"
          onClick={() => {
            if (selectedFiles && name) {
              handleFileUpload(selectedFiles, name);
              setIsOpen(false); 
            }
          }}
        />
      </TaskModalFooter>
    </TaskModal>
  );
}
