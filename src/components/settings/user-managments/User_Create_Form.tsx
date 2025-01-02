import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import NavigationList from "@/components/navbar_/navigation";
import AyButton from "@/components/myUi/AyButton";

const UserCreateForm = () => {
  const { NAVIGATION } = NavigationList();

  // Helper function to flatten navigation for checkbox options
  const getAllPages = () => {
    const pages: { title: string; segment: string }[] = [];
    NAVIGATION.forEach((navItem) => {
      if (navItem.kind === "page") {
        pages.push({ title: navItem.title, segment: navItem.segment });
        if (navItem.children) {
          navItem.children.forEach((child) =>
            pages.push({ title: child.title, segment: child.segment })
          );
        }
      }
    });
    return pages;
  };

  const allPages = getAllPages();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    role: Yup.string()
      .oneOf(["admin", "ecommerce", "social-media"], "Invalid role")
      .required("Role is required"),
    pages: Yup.array()
      .of(Yup.string())
      .required("At least one page must be selected"),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        role: "admin", // Default role
        pages: [], // Default no pages selected
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        console.log("Submitted Values:", values);
        resetForm();
      }}
    >
      {() => (
        <Form className="p-4 bg-white shadow-md rounded-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-bold">
              Name
            </label>
            <Field
              id="name"
              name="name"
              placeholder="Enter name"
              className="border p-2 w-full rounded"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold">
              Email
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="Enter email"
              className="border p-2 w-full rounded"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-bold">
              Password
            </label>
            <Field
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              className="border p-2 w-full rounded"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-bold">
              Role
            </label>
            <Field
              as="select"
              id="role"
              name="role"
              className="border p-2 w-full rounded"
            >
              <option value="admin">Admin</option>
              <option value="ecommerce">Ecommerce</option>
              <option value="social-media">Social Media</option>
            </Field>
            <ErrorMessage
              name="role"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold">Pages</label>
            <div className="grid grid-cols-2 gap-2">
              {allPages.map((page) => (
                <div key={page.segment} className="flex items-center">
                  <Field
                    type="checkbox"
                    name="pages"
                    value={page.segment}
                    id={`page-${page.segment}`}
                    className="mr-2"
                  />
                  <label htmlFor={`page-${page.segment}`} className="text-sm">
                    {page.title}
                  </label>
                </div>
              ))}
            </div>
            <ErrorMessage
              name="pages"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <AyButton
            title="Create User"
            type="submit"
            sx={{
              mt: "8",
              height: "50px",
            width:"180px",
            }}
          />
        </Form>
      )}
    </Formik>
  );
};

export default UserCreateForm;
