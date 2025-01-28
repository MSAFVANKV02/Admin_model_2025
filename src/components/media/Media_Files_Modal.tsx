import AllUploadedFiles from "@/pages/settings/media/retrive/all_uploaded_files";
import TaskModal, {
  TaskModalContent,
  TaskModalHeader,
} from "../modals/TaskModal";

type Props = {
    setFieldValues?: (name: string, value: any) => void;
    name?: string;
  };
  
  export default function MediaFilesModal({ setFieldValues, name }: Props) {
  
  return (
    <TaskModal className="md:w-[70%]">
      <TaskModalHeader>
        <h1 className="text-textGray font-bold">Select Files</h1>
      </TaskModalHeader>

      <TaskModalContent>
        <AllUploadedFiles
          onClick={(src) => {
            console.log(src);
            
            if (setFieldValues && name) {
              setFieldValues(name, src); // Update the Formik field value
            }
          }}
          multiple={true} // Enable multiple file selection
          mediaType="image" // Show only images
        />
      </TaskModalContent>
    </TaskModal>
  );
}
