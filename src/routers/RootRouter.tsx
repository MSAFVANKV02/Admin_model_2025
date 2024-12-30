import App from "@/App";
import DashboardPage from "@/pages/dashboard/dashboard-page";
import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "@/middlewares/ProtectedRoute";
import ErrorPage from "@/Error-Page";
import LoginPage from "@/pages/auth/Login-Page";
import {
  ProductsLayout,
  SalesLayout,
  StoreManagementLayout,
  SettingsLayout,
} from "@/layouts/Sidbar_Layout";
import ProductAddPage from "@/pages/products/add-new/product-add-page";
import AllProductsPage from "@/pages/products/all/All-Products-page";
import CategoryPage from "@/pages/products/category/category-page";
import BrandPage from "@/pages/products/brand/brand-page";
import ProductReviewPage from "@/pages/products/product-review/product-review-page";
import ColorPage from "@/pages/products/colors/color-page";
import AllOrdersPage from "@/pages/orders/all/all-oders-page";
import UserManagementPage from "@/pages/settings/user-management/user-management-page";
import CustomerRefundPage from "@/pages/orders/customer-refunds/customer-refund-page";
import CustomersPage from "@/pages/customers/customers-page";

const rootRouter = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/products",
        element: <ProductsLayout />, // Parent layout for Products
        children: [
          { path: "add-new", element: <ProductAddPage /> },
          { path: "all", element: <AllProductsPage /> },
          { path: "category", element: <CategoryPage /> },
          { path: "brand", element: <BrandPage /> },
          { path: "reviews", element: <ProductReviewPage /> },
          { path: "colors", element: <ColorPage /> },
        ],
      },
      {
        path: "/sales",
        element: <SalesLayout />, // Parent layout for Sales
        children: [
          { path: "orders", element: <AllOrdersPage /> },
          { path: "refunds", element: <CustomerRefundPage /> },
        ],
      },
      {
        path: "/customers",
        element: <CustomersPage />, // Parent layout for Sales
        // children: [
        //   { path: "orders", element: <AllOrdersPage /> },
        // ],
      },
      {
        path: "/store",
        element: <StoreManagementLayout />, // Parent layout for Store Management
        children: [
          { path: "review", element: <div>Review Page</div> },
          { path: "postal-code", element: <div>Postal Code Page</div> },
          { path: "earnings", element: <div>Store Earnings Page</div> },
          { path: "overview", element: <div>Product Overview Page</div> },
          { path: "commission", element: <div>Store Commission Page</div> },
        ],
      },
      {
        path: "/settings",
        element: <SettingsLayout />,
        children: [
          { path: "shipping", element: <div>Shipping Page</div> },
          {
            path: "user-management",
            element:<UserManagementPage />,
          },
          {
            path: "user-strict",
            element:  <ErrorPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default rootRouter;
