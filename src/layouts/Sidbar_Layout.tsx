import usePageTitle from "@/hooks/usePageTitle";
import { Outlet } from "react-router-dom";

export const ProductsLayout = () => {
  {  usePageTitle("Ayaboo | Products")}
  return(
     <div>
    {/* <h1>Store Management Page</h1> */}
    <Outlet />
  </div> 
  )

};

export const SalesLayout = () => (
  <div>
    <Outlet /> {/* Renders child routes */}
  </div>
);

export const StoreManagementLayout = () => {
  {  usePageTitle("Ayaboo | Store")}
  return(
     <div>
    {/* <h1>Store Management Page</h1> */}
    <Outlet />
  </div> 
  )

};

export const SellerManagementLayout = () => {
  {  usePageTitle("Ayaboo | Seller")}
  return(
     <div>
    {/* <h1>Store Management Page</h1> */}
    <Outlet />
  </div> 
  )

};

export const SettingsLayout = () => (
  <div>
    <Outlet />
  </div>
);


export const CustomerLayout = () => (
  <div>
    <Outlet />
  </div>
);