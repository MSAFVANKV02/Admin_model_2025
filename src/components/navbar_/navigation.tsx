import { useAppSelector } from "@/redux/hook";
import { ALLOWED_DOMAIN } from "@/services/api/urlPath";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useCallback } from "react";



function NavigationList() {
  const { currentAdmin } = useAppSelector((state)=>state.admin);



   const NAVIGATION = [
    {
      kind: "page",
      segment: "/dashboard",
      title: "Dashboard",
      icon: <Icon icon="material-symbols:dashboard-rounded" />,
    },
    // {
    //   kind: "page",
    //   segment: "/kyc",
    //   title: "Kyc verification",
    //   icon: <Icon icon="iconamoon:shield-yes-fill" />,
    // },
  
   
    {
      kind: "page",
      segment: "/products",
      title: "Products",
      icon: <Icon icon="entypo:box" />,
      isChild: true,
      children: [
        { title: "Add New Product", segment: "/products/add-new" },
        { title: "All Products", segment: "/products/all" },
        { title: "Category", segment: "/products/category" },
        { title: "Brand", segment: "/products/brand" },
        { title: "Product Reviews", segment: "/products/reviews" },
        { title: "Colors", segment: "/products/colors" },
      ],
    },
    {
      kind: "page",
      segment: "/sales",
      title: "Sales",
      icon: <Icon icon="streamline:graph-bar-increase-solid" />,
      isChild: true,
      children: [
        { title: "All Orders", segment: "/sales/orders" },
        { title: "Customer Refunds", segment: "/sales/refunds" },
      ],
    },

 
    {
      kind: "page",
      segment: "/marketing",
      title: "Marketing",
      icon: <Icon icon="mdi:bullhorn" />,
      isChild: true,
      children: [{ title: "Coupons", segment: "/marketing/coupons" }],
    },
    {
      kind: "page",
      segment: "/reports",
      title: "Reports",
      icon: <Icon icon="mdi:chart-bar" />,
      isChild: true,
      children: [
        { title: "Product Sale", segment: "/reports/product-sale" },
        { title: "Product Stock", segment: "/reports/product-stock" },
        { title: "Product Wishlist", segment: "/reports/wishlist" },
        { title: "User Searches", segment: "/reports/searches" },
      ],
    },
    {
      kind: "page",
      segment: "/user-verification",
      title: "User Verification",
      icon: <Icon icon="iconamoon:shield-yes-fill" />,
      isChild: true,
      children: [
        { title: "User Kyc Verification", segment: "/user-verification/kyc" },
        { title: "User Credit Verification", segment: "/credit-varify" },

      
      ],
    },
   
    // {
    //   kind: "page",
    //   segment: "/website",
    //   title: "Website Group",
    //   icon: <Icon icon="mdi:web" />,
    //   isChild: true,
    //   children: [
    //     { title: "Group", segment: "/website/group" },
    //     { title: "Preview", segment: "/website/preview" },
    //   ],
    // },
    {
      kind: "page",
      segment: "/store",
      title: "Store Management",
      icon: <Icon icon="mdi:storefront-outline" />,
      isChild: true,
      children: [
        { title: "Store", segment: "/store/all" },
        // { title: "Store Creation", segment: "/store/create" },
        { title: "Payout store", segment: "/store/payout-store" },
        { title: "Product Transfer", segment: "/store/product-transfer" },
        { title: "Store Earnings", segment: "/store/earnings" },
        { title: "Store Commission", segment: "/store/commission" },
      ],
    },
    {
      kind: "page",
      segment: "/seller",
      title: "Seller Management",
      icon: <Icon icon="mdi:account-tie" />,
      isChild: true,
      children: [
        // { title: "Create Seller", segment: "/seller/create" },
        { title: "Seller", segment: "/seller/all" },
        { title: "Seller Payout", segment: "/seller/payout-seller" },
        { title: "Request to Stock", segment: "/seller/request-stock" },
        { title: "Conversations", segment: "/seller/conversations" },
        { title: "Returns to Seller", segment: "/seller/returns" },
      ],
    },
  
    {
      kind: "page",
      segment: "/offline-payment",
      title: "Offline Payment",
      icon: <Icon icon="fluent:phone-link-setup-24-filled" />,
    },
    // {
    //   kind: "page",
    //   segment: "/customers/refund",
    //   title: "Customer Refund",
    //   icon: <Icon icon="heroicons:receipt-refund-20-solid" />,
    // },
    {
      kind: "page",
      segment: "/customers",
      title: "Customers",
      icon: <Icon icon="mdi:account-group" />,
    },
    {
      kind: "page",
      segment: "/web-setup",
      title: "Web Setup",
      icon: <Icon icon="streamline:web-solid" />,
    },
    {
      kind: "page",
      segment: "/settings",
      title: "Settings",
      icon: <Icon icon="mdi:cog-outline" />,
      isChild: true,
      children: [{ title: "Shipping", segment: "/settings/shipping" },
        { title: "Admin Roles", segment: "/settings/admin-management" },
        { title: "Payment Setup", segment: "/settings/payment-setup" },
        { title: "Media", segment: "/settings/media" },
        { title: "Conversations", segment: "/settings/conversations" },

      ],
    },
  ];


  // ====== filters =====

  const filteredNavigation = useCallback(() => {
    if (window.location.origin.includes(ALLOWED_DOMAIN)) {
      return NAVIGATION; // Show everything in dev tunnel
    }
    if (!currentAdmin) return [];

    // Show all navigation items if the currentAdmin is an "admin"
    if (currentAdmin.role === "admin") {
      return NAVIGATION;
    }

    // Filter navigation items based on allowed pages for non-admin roles
    if (currentAdmin.pages) {
      return NAVIGATION.filter((item) => {
        if (item.segment && currentAdmin.pages.includes(item.segment)) {
          return true;
        }

        if (item.isChild) {
          item.children = item.children?.filter((child) =>
            currentAdmin.pages.includes(child.segment)
          );
          return item.children?.length > 0;
        }

        return false;
      });
    }

    return [];
  }, [currentAdmin]);

  const navigationItems = filteredNavigation();
  
  return {
    navigationItems
  }
}

export default NavigationList