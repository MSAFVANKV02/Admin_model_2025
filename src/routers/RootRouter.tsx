import App from "@/App";
import DashboardPage from "@/pages/dashboard/dashboard-page";
import { createBrowserRouter, Navigate } from "react-router-dom";

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
import UserManagementPage from "@/pages/settings/admin-management/admin-management-page";
import CustomerRefundPage from "@/pages/orders/customer-refunds/customer-refund-page";
import CustomersPage from "@/pages/customers/customers-page";
import MarketingPage from "@/pages/marketing/marketing-page";
import ProductSalePage from "@/pages/reports/product-sale/product-sale-page";
import KycPage from "@/pages/kyc/kyc-page";
import WebpSetupPage from "@/pages/web/webpsetup-page";
import OfflinePaymentPage from "@/pages/payments/offline-payments/offline-payment-page";
import ProductStockPage from "@/pages/reports/product-stock/product-stock-page";
import UserSearchCountPage from "@/pages/reports/user-searches/user-search-count-page";
import PayoutStorePage from "@/pages/store/payout-store/payout-store-page";
import StoreManagementPage from "@/pages/store/store-management-page";
import AuthProtectionRoute from "@/middlewares/AuthProtectionRoute";
import StoreEarningsPage from "@/pages/store/store-earnings/store-earnings-page";

const rootRouter = createBrowserRouter(
  [
    {
      path: "/login",
      element: (
        <AuthProtectionRoute>
          <LoginPage />
        </AuthProtectionRoute>
      ),
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
          path: "/",
          element: <Navigate to="/dashboard" replace />, // Redirect from "/" to "/dashboard"
        },
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          ),
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
        },
        {
          path: "/marketing",
          element: <SalesLayout />, // Parent layout for Sales
          children: [{ path: "coupons", element: <MarketingPage /> }],
        },
        {
          path: "/reports",
          element: <SalesLayout />, // Parent layout for Sales
          children: [
            { path: "product-sale", element: <ProductSalePage /> },
            { path: "product-stock", element: <ProductStockPage /> },
            { path: "searches", element: <UserSearchCountPage /> },
          ],
        },
        {
          path: "/kyc",
          element: <KycPage />,
        },
        {
          path: "/web-setup",
          element: <WebpSetupPage />,
        },
        {
          path: "/offline-payment",
          element: <OfflinePaymentPage />,
        },
        {
          path: "/store",
          element: <StoreManagementLayout />, // Parent layout for Store Management
          children: [
            { path: "/store", element: <StoreManagementPage /> },
            { path: "payout-store", element: <PayoutStorePage /> },
            { path: "postal-code", element: <div>Postal Code Page</div> },
            { path: "earnings", element: <StoreEarningsPage /> },
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
              path: "admin-management",
              element: <UserManagementPage />,
            },
            {
              path: "user-strict",
              element: <ErrorPage />,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]
  // ,{
  //   future: {
  //     v7_fetcherPersist: true, // Enable the future flag for fetcher persistence in React Router v7
  //   },
  // }
);

export default rootRouter;
