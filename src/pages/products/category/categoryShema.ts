
import * as Yup from "yup";

export const categorySchemaMain = Yup.object().shape({
    category_name: Yup.string().required("Category name is required"),
    parent_category: Yup.mixed()
      .nullable()
      .test(
        "is-valid-parent",
        "Parent category is required",
        (value) => value === null || typeof value === "string"
      ),
    coverImage: Yup.string().required("Cover image is required"),
    icon: Yup.string().required("category icon is required"),
  });
  
  export const categorySchemaAll = Yup.object().shape({
    category_name: Yup.string().required("Category name is required"),
    // parent_category: Yup.mixed()
    //   .nullable()
    //   .required("Parent category is required"),
    // coverImage: Yup.string().required("Parent cover image is required"),
    icon: Yup.string().required("category icon is required"),
  });
  