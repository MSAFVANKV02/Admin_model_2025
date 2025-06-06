import {
  Box,
  IconButton,
  styled,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { MenuIcon } from "lucide-react";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

import FullViewScreen from "@/hooks/FullViewScreen";
import useNavigateClicks from "@/hooks/useClicks";
import NotificationBarSheet from "./Notification_Sheet";
import { makeToast } from "@/utils/toaster";

import { FullScreenSvg, GlobSvg } from "../icons/glob-icon";
import AdminProfile from "./appbar_items/admin_profile";




// import { useTranslation } from "react-i18next";

type Props = {
  open: boolean;
  drawerWidth: number;
  title?: string;
  handleDrawerOpen: () => void;
  logo?: string;
};

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

// const languages = [
//   { label: "English", value: "en" },
//   { label: "Hindi", value: "hi" },
//   { label: "Arabic", value: "ar" },
//   { label: "Malayalam", value: "ml" },
// ];

export default function NavAppBar({
  open,
  drawerWidth,
  handleDrawerOpen,
}: Props) {
  // handle full screen mode ====
  const { handleFullScreen } = FullViewScreen();
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  // const { i18n, t } = useTranslation();

  // const changeLanguage = (lang: string) => {
  //   i18n.changeLanguage(lang);
  // };

  // click
  const { handleClick } = useNavigateClicks();

  // Clear cache function
  const handleClearCache = () => {
    if (window.caches) {
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => caches.delete(key)));
      });
    }
    localStorage.clear();
    sessionStorage.clear();
    makeToast("Cache cleared successfully!"); // Show success toast
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer - 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: "none", // Remove the shadow here
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <AppBar
      position="fixed"
      color="default"
      sx={{
        boxShadow: " rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
        display: "flex",
        bgcolor:"#fff"
        // borderBottom:"0.9px solid #4E4E4E"
      }}
      open={open}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          // borderBottom:"0.9px solid #4E4E4E"
        }}
      >
        <Toolbar>
          <div className="">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                marginLeft: isLargeScreen ? 5 : 0,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
          </div>

          <Typography variant="h6" noWrap component="div">
            {/* <img src={MyLogo} alt="My Logo" style={{ height: '40px', marginRight: '10px' }} /> */}
          </Typography>
        </Toolbar>

        {/* ======  navbar right side starts here =======
        ==================================================== */}

        <Box mr="1rem" display="flex" gap="" alignItems="center">
          {/* Full screen btn ======
            ========================== */}
          <Tooltip title="Full Screen">
            <div className="">
              <IconButton onClick={handleFullScreen}>
                {/* <Fullscreen /> */}
                <FullScreenSvg />
                {/* <Icon icon='iconamoon:screen-full' /> */}
              </IconButton>
            </div>
          </Tooltip>


          {/* language selections */}

          {/* <Select value={i18n.language} onValueChange={changeLanguage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("Language")} />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.value} value={language.value}>
                  {language.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}

          {/* Home btn ======
            ========================== */}

          <Tooltip title="home">
            <div className="">
              <IconButton onClick={() => handleClick("/dashboard")}>
                {/* <PublicOutlined /> */}
                <GlobSvg/>
              </IconButton>
            </div>
          </Tooltip>

          {/* Notification btn ======
            ========================== */}

          <NotificationBarSheet />

          {/* Clear Cache Button */}
          <Tooltip title="Clear Cache" className="sm:block hidden">
            <div className="">
              <IconButton onClick={handleClearCache}>
                <img
                  src="/icons/clear-catche.svg"
                  alt="clear cache"
                  width={23}
                  height={23}
                />
                {/* <CleaningServicesIcon /> */}
              </IconButton>
            </div>
          </Tooltip>

          {/* User Details avatar and more settings =====
        ================================================ */}
       <AdminProfile />
     

          {/* =============================== */}
        </Box>
      </Box>
    </AppBar>
  );
}
