import { Formik, Form } from "formik";
import { GeneralInitialValues } from "./initialValues";

export default function FilesMediaSectionPage() {
  return (
    <div className="">
      {/* Main container starts here ======= */}
      <Formik
        initialValues={GeneralInitialValues}
        onSubmit={(values) => {
          console.log("submit", values);
        }}
      >
        {({ values, setValues, handleSubmit }) => (
          <Form onSubmit={handleSubmit}></Form>
        )}
      </Formik>
    </div>
  );
}
