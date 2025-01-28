import PagesLayout, { PageLayoutHeader, PagesLayoutContent } from "@/layouts/Pages_Layout";
import { Form, Formik } from "formik";
import UploadFilesForm from "./upload/upload_files_form";
import AyButton from "@/components/myUi/AyButton";
import useNavigateClicks from "@/hooks/useClicks";
import MediaFiles from "@/components/media/MediaFiles";


export default function UploadMediaPage() {
    const {handleClick} = useNavigateClicks();
  return (
    <PagesLayout>
        <PageLayoutHeader>
            <h1>Upload Media</h1>

            <AyButton
            title="All Media"
            onClick={()=>{
                handleClick("uploads")
            }}
            />
        </PageLayoutHeader>
        <PagesLayoutContent>
            {/* Add your page content here */}
            Upload media page content goes here.

            <Formik
        initialValues={{
            files: []
        }}
        onSubmit={(values) => {
            console.log(values);
        }}
        >
            {(({values,setFieldValue})=>(
                <Form className="space-y-6">
                    <UploadFilesForm
                files={values.files}
                setFieldValue={setFieldValue}
              />


             <div className="flex w-full justify-center">
             <AyButton 
              title="Submit"
              
              />
             </div>
                </Form>
            ))}
            
        </Formik>


        <MediaFiles />
        </PagesLayoutContent>
    </PagesLayout>
  )
}