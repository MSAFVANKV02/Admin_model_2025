import "@/assets/css/style.css";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { cn } from "./lib/utils";
import NavbarDrawer, { DrawerHeader } from "./components/navbar_/Navbar_Drawer";
import { Outlet } from "react-router-dom";
import ThemProviderMui from "./providers/metrialUi/theme-provider";
import { useMediaQuery } from "@mui/material";

// const NAVIGATION = [
//   {
//     kind: "page",
//     segment: "/dashboard",
//     title: "Dashboard",
//     icon: <Icon icon="material-symbols:dashboard-rounded" />,
//   },
//   {
//     kind: "page",
//     segment: "/products",
//     title: "Products",
//     icon: <Icon icon="entypo:box" />,
//     isChild: true,
//     children: [
//       { title: "Add New Product", segment: "/products/add-new" },
//       { title: "All Products", segment: "/products/all" },
//       { title: "Category", segment: "/products/category" },
//       { title: "Brand", segment: "/products/brand" },
//       { title: "Product Reviews", segment: "/products/reviews" },
//       { title: "Colors", segment: "/products/colors" },
//     ],
//   },
//   {
//     kind: "page",
//     segment: "/sales",
//     title: "Sales",
//     icon: <Icon icon="streamline:graph-bar-increase-solid" />,
//     isChild: true,
//     children: [
//       { title: "All Orders", segment: "/sales/orders" },
//       { title: "Customer Refunds", segment: "/sales/refunds" },
//     ],
//   },
//   {
//     kind: "page",
//     segment: "/customers/refund",
//     title: "Customer Refund",
//     icon: <Icon icon="heroicons:receipt-refund-20-solid" />,
//   },
//   {
//     kind: "page",
//     segment: "/customers",
//     title: "Customers",
//     icon: <Icon icon="mdi:account-group" />,
//   },
//   {
//     kind: "page",
//     segment: "/marketing",
//     title: "Marketing",
//     icon: <Icon icon="mdi:bullhorn" />,
//     isChild: true,
//     children: [{ title: "Coupons", segment: "/marketing/coupons" }],
//   },
//   {
//     kind: "page",
//     segment: "/reports",
//     title: "Reports",
//     icon: <Icon icon="mdi:chart-bar" />,
//     isChild: true,
//     children: [
//       { title: "Product Sale", segment: "/reports/product-sale" },
//       { title: "Product Stock", segment: "/reports/product-stock" },
//       { title: "Product Wishlist", segment: "/reports/wishlist" },
//       { title: "User Searches", segment: "/reports/searches" },
//     ],
//   },
//   {
//     kind: "page",
//     segment: "/website",
//     title: "Website Group",
//     icon: <Icon icon="mdi:web" />,
//     isChild: true,
//     children: [
//       { title: "Group", segment: "/website/group" },
//       { title: "Preview", segment: "/website/preview" },
//     ],
//   },
//   {
//     kind: "page",
//     segment: "/store",
//     title: "Store Management",
//     icon: <Icon icon="mdi:storefront-outline" />,
//     isChild: true,
//     children: [
//       { title: "Review", segment: "/store/review" },
//       { title: "Postal Code", segment: "/store/postal-code" },
//       { title: "Store Earnings", segment: "/store/earnings" },
//       { title: "Product Overview", segment: "/store/overview" },
//       { title: "Store Commission", segment: "/store/commission" },
//     ],
//   },
//   {
//     kind: "page",
//     segment: "/seller",
//     title: "Seller Management",
//     icon: <Icon icon="mdi:account-tie" />,
//     isChild: true,
//     children: [
//       { title: "Seller Stock Requests", segment: "/seller/stock-requests" },
//       { title: "Request to Stock", segment: "/seller/request-stock" },
//       { title: "Conversations", segment: "/seller/conversations" },
//       { title: "Returns to Seller", segment: "/seller/returns" },
//     ],
//   },
//   {
//     kind: "page",
//     segment: "/settings",
//     title: "Settings",
//     icon: <Icon icon="mdi:cog-outline" />,
//     isChild: true,
//     children: [{ title: "Shipping", segment: "/settings/shipping" }],
//   },
// ];

export default function MiniDrawer() {

  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  return (
    <div
      className={cn(``, {
        "debug-screens": import.meta.env.MODE === "development",
      })}
    >
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <NavbarDrawer />
        <ThemProviderMui >
            <Box component="main" sx={{  flexGrow: isLargeScreen ? 1 : 0,width:"100%", p: isLargeScreen ? 2 : 1, bgcolor: "#F7F7F7" }}>
          <DrawerHeader />
          <Outlet />
        </Box>
        </ThemProviderMui>
      
      </Box>
      <div className="h-10 bg-white border-t text-gray-400 text-xs w-full flex justify-end items-center px-3">
      <span className="select-none text-xs">Copyright 2024 All Rights Are Reserved | © Ayaboo by Haash.Tech</span>
      </div>
    </div>
  );
}
