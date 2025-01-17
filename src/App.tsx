import "@/assets/css/style.css";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { cn } from "./lib/utils";
import NavbarDrawer, { DrawerHeader } from "./components/navbar_/Navbar_Drawer";
import { Outlet } from "react-router-dom";
import ThemProviderMui from "./providers/metrialUi/theme-provider";
import { useMediaQuery } from "@mui/material";
import { ModalProvider } from "./providers/context/context";

export default function MiniDrawer() {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  return (
    <div
      className={cn(``, {
        "debug-screens": import.meta.env.MODE === "development",
      })}
    >
      <ModalProvider>
        <Box sx={{ display: "flex",  bgcolor: "#F7F7F7" }}>
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
               
                 maxWidth:"1800px",mx:"auto"
                
              }}
            >
              <DrawerHeader />
              <Outlet />
            </Box>
          </ThemProviderMui>
        </Box>
      </ModalProvider>

      <div className="h-10 bg-white border-t text-gray-400 text-xs w-full flex justify-end items-center px-3">
        <span className="select-none text-xs">
          Copyright 2024 All Rights Are Reserved | © Ayaboo by Haash.Tech
        </span>
      </div>
    </div>
  );
}
