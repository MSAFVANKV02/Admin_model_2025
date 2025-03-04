import "@/assets/css/style.css";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { cn } from "./lib/utils";
import NavbarDrawer, { DrawerHeader } from "./components/navbar_/Navbar_Drawer";
import { Outlet, useLocation } from "react-router-dom";
import ThemProviderMui from "./providers/metrialUi/theme-provider";
import { useMediaQuery } from "@mui/material";
import { ModalProvider } from "./providers/context/context";
import HelperIcon from "./components/helper-line/helper-icon";
import { useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import {dehydrate, HydrationBoundary, QueryClient, } from '@tanstack/react-query'
import QueryLayout from "./layouts/queryLayout";
import ReactQueyProvider from "./providers/react-quey";


const MiniDrawer =  () => {
  const { i18n } = useTranslation();

  const location = useLocation();
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  const query = new QueryClient();

  const protectedRoutes = ['/settings/conversations', '/products/add-new'];

  // Check if the current path is one of the protected routes
  const isProtectedRoute = protectedRoutes.includes(location.pathname);


  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n.language, i18n]);
  return (
    <div
      className={cn(``, {
        "debug-screens": import.meta.env.MODE === "development",
      })}
    >
      <ModalProvider>
        <Box sx={{ display: "flex", bgcolor: "#F7F7F7" }}>
          <CssBaseline />
          {/* side bar and headers includes ========= */}
          <NavbarDrawer />

          {/* side bar and headers includes ========= */}

          <ThemProviderMui>
            <Box
              component="main"
              sx={{
                flexGrow: isLargeScreen ? 1 : 0,
                width: "100%",
                p: isLargeScreen ? 2 : 1,

                maxWidth: "1800px",
                mx: "auto",
                overflowX: "auto", 
              }}
            >
              <DrawerHeader />
              
              <ReactQueyProvider>
                <HydrationBoundary state={dehydrate(query)}>
                <QueryLayout>
                    <Outlet />
                </QueryLayout>
               
              </HydrationBoundary>
              </ReactQueyProvider>
              
             
            </Box>
          </ThemProviderMui>
        </Box>
      </ModalProvider>
    
    
       {/* === chat bot ====== */}
       {
        !isProtectedRoute && (
          <HelperIcon />
        )
      }

      <div className="h-10 bg-white border-t text-gray-400 text-xs w-full flex justify-end items-center px-3">
        <span className="select-none text-xs">
        <Trans>
          Copyright 2024 All Rights Are Reserved | © Ayaboo by Haash.Tech
        </Trans>
          
        </span>
      </div>
    </div>
  );
}

export default MiniDrawer