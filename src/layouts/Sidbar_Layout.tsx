import { Outlet } from "react-router-dom";

export const ProductsLayout = () => (
  <div className="">
    <Outlet /> {/* Renders child routes */}
  </div>
);

export const SalesLayout = () => (
  <div>
    <Outlet /> {/* Renders child routes */}
  </div>
);

export const StoreManagementLayout = () => (
  <div>
    <h1>Store Management Page</h1>
    <Outlet />
  </div>
);

export const SettingsLayout = () => (
  <div>
    <Outlet />
  </div>
);
