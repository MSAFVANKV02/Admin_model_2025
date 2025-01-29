import PagesLayout, {
  PageLayoutHeader,
  PagesLayoutContent,
} from "@/layouts/Pages_Layout";
import { Form, Formik } from "formik";
import UploadFilesForm from "./upload/upload_files_form";
import AyButton from "@/components/myUi/AyButton";
import useNavigateClicks from "@/hooks/useClicks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { LOCAL_URL } from "@/types/urlPath";

export default function UploadMediaPage() {
  const { handleClick } = useNavigateClicks();
  return (
    <PagesLayout>
      <PageLayoutHeader>
        <h1>Upload Media</h1>

        <AyButton
          title="All Media"
          onClick={() => {
            handleClick("uploads");
          }}
        />
      </PageLayoutHeader>
      <PagesLayoutContent className="">
        {/* Add your page content here */}
        {/* Upload media page content goes here. */}
        <Formik
          initialValues={{
            files: [],
            category: "all",
          }}
          onSubmit={async (values) => {
            if (values.files.length === 0) {
              alert("Please select at least one file.");
              return;
            }

            const formData = new FormData();
            values.files.forEach((file) => {
              formData.append("files", file); // Append each file
            });
            formData.append("category", values.category);

            const response = await axios.post(
              `${LOCAL_URL}/user_api/admin/createMedia`,
               formData ,
               {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
              }
            );

            try {
              console.log("Upload response:",response);
              alert("Files uploaded successfully!");
            } catch (error) {
              console.error("Upload failed", error);
              alert("Failed to upload files.");
            }
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-6">
              <Select
                onValueChange={(value) => {
                  setFieldValue("category", value);
                }}
                value={values.category}
              >
                <SelectTrigger className="min-w-[150px] w-fit">
                  <SelectValue placeholder="Type Of the Media" />
                </SelectTrigger>
                <SelectContent className="capitalize">
                  <SelectItem value="all">all</SelectItem>
                  <SelectItem value="products">Products</SelectItem>
                  <SelectItem value="category">category</SelectItem>
                  <SelectItem value="brand">brand</SelectItem>
                </SelectContent>
              </Select>

              <UploadFilesForm
                files={values.files}
                setFieldValue={setFieldValue}
              />

              <div className="flex w-full justify-center">
                <AyButton type="submit" title="Submit" />
              </div>
            </Form>
          )}
        </Formik>
        {/* <MediaFiles /> */}
      </PagesLayoutContent>
    </PagesLayout>
  );
}
