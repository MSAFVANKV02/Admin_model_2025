// import AllUploadedFiles from "@/pages/settings/media/retrive/all_uploaded_files";
// import TaskModal, {
//   TaskModalContent,
//   TaskModalFooter,
//   TaskModalHeader,
// } from "../modals/TaskModal";
// import AyButton from "../myUi/AyButton";
// import { memo, useState } from "react";
// import { UseModal } from "@/providers/context/context";
// import MyCloseIcon from "../icons/My_CloseIcon";

// type Props = {
//   setFieldValues?: (name: string, value: any) => void;
//   fieldName?: string;
//   multiple?: boolean;
//   handleFileUpload: (event: string[], fieldName: string) => void;
//   mediaType?: "pdf" | "image" ;
// };

// function MediaFilesModal({
//   fieldName,
//   multiple,
//   handleFileUpload,
//   mediaType,
// }: Props) {
//   const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
//   const { setIsOpen } = UseModal();

//   const handleFileSelection = (src: string[]) => {
//     if (multiple) {
//       const newSelectedFiles = src;
//       setSelectedFiles(newSelectedFiles);
//     } else {
//       const [selectedFile] = src;
//       setSelectedFiles([selectedFile]);
//     }
//   };

//   const handleSelectFiles = () => {
//     if (fieldName) {
//       handleFileUpload(selectedFiles, fieldName);
//       setIsOpen(false);
//     }
//   };

//   // console.log(fieldName, "fieldName in nowhere");

//   return (
//     <TaskModal className="md:w-[70%] md:h-[90%]">
//       <TaskModalHeader className="justify-end bg-gray-50 rounded-md">
//         {/* <h1 className="text-textGray font-bold">Select Files</h1> */}
//         <MyCloseIcon 
//         onClick={()=>{
//           setIsOpen(false);
//         }}
//         />
//       </TaskModalHeader>

//       <TaskModalContent className="max-h-[90%] scrollbar-none overflow-y-scroll">
//         <AllUploadedFiles
//           onClick={(src) => handleFileSelection(src)}
//           multiple={multiple} // Enable multiple file selection
//           mediaType={mediaType} // Show only images
//         />
//       </TaskModalContent>
//       <TaskModalFooter>
//         <AyButton title="Select" type="button" onClick={handleSelectFiles} />
//       </TaskModalFooter>
//     </TaskModal>
//   );
// }

// export default memo(MediaFilesModal) 
// =================================================================
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import AyButton from "../myUi/AyButton";
import { memo, useState } from "react";
import { UseModal } from "@/providers/context/context";
import MyCloseIcon from "../icons/My_CloseIcon";

import { makeToastError } from "@/utils/toaster";
import AllUploadedFiles, { IFileDataMedia, IFIlesCategory } from "@/pages/settings/media/retrive/all_uploaded_files";

type Props = {
  setFieldValues?: (name: string, value: any) => void;
  fieldName?: string;
  multiple?: boolean;
  handleFileUpload?: (event: IFileDataMedia[], fieldName: string) => void;
  mediaType?: "pdf" | "image" | "videos" | "xl" | "";
  category?: IFIlesCategory;
};

function MediaFilesModal({
  fieldName,
  multiple,
  handleFileUpload,
  mediaType,
  category
}: Props) {
  const [selectedFiles, setSelectedFiles] = useState<IFileDataMedia[]>([]);
  const { setMediaOpenDrawer, mediaOpenDrawer } = UseModal();

  const handleFileSelection = (src: IFileDataMedia[]) => {
    if (multiple) {
      const newSelectedFiles = src;
      setSelectedFiles(newSelectedFiles);
    } else {
      const [selectedFile] = src;
      setSelectedFiles([selectedFile]);
    }
  };

  const handleSelectFiles = async () => {
    if(selectedFiles.length === 0){
      return makeToastError('Please select files')
    }
    if (fieldName && handleFileUpload && selectedFiles.length > 0) {
     await handleFileUpload(selectedFiles, fieldName);
      setSelectedFiles([]);
      setMediaOpenDrawer(false);
    }
  };

  // console.log(fieldName, "fieldName in nowhere");
  const handleReset = () => {
    setSelectedFiles([]); // Clears the selection
  };

  return (
    <Drawer
      open={mediaOpenDrawer}
      onOpenChange={(open) => setMediaOpenDrawer(open)}
    >
      {/* <DrawerTrigger>Open</DrawerTrigger> */}
      <div className="mx-auto w-full max-w-sm ">
        <DrawerContent className="z-[20001] mx-auto max-w-screen-xl w-full h-[85vh] max-h-[85vh] flex flex-col rounded-lg border bg-background p-4">
          <DrawerHeader className="flex-shrink-0">
            <DrawerTitle className="flex justify-end">
              <MyCloseIcon
                onClick={() => {
                  setMediaOpenDrawer(false);
                }}
              />
            </DrawerTitle>
          </DrawerHeader>

          {/* Content Scrollable */}
          <div className="flex-grow overflow-y-auto">
            <AllUploadedFiles
              onClick={(selectedFiles) => {
                // console.log(selectedFiles,'selectedFiles');
                // console.log(src,'src');

                handleFileSelection(selectedFiles);
              }}
              category={category}
              selectedFiles={selectedFiles} // Pass state
              setSelectedFiles={setSelectedFiles} 
              multiple={multiple}
              mediaType={mediaType}
            />
          </div>

          {/* Footer Stays Visible */}
          <DrawerFooter className="flex-shrink-0">
            {/* <DrawerClose className="">
              <AyButton
                title="Select"
                type="button"
                onClick={handleSelectFiles}
              />

             
            </DrawerClose> */}
      
             <div className="flex  gap-3 justify-end items-center">
             <AyButton
                title="Select"
                type="button"
                onClick={handleSelectFiles}
              />

             
    
            <AyButton
                title="Reset"
                type="button"
                variant="cancel"
                onClick={handleReset} 
              />
             </div>
          </DrawerFooter>
        </DrawerContent>
      </div>
    </Drawer>
  );
}

export default memo(MediaFilesModal);
