import { Button, SxProps, Theme } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
  onClick?: () => void; // Function to call when the button is clicked
  title: string; // The title of the button
  sx?: SxProps<Theme>; // Allow overriding styles
  variant?: "contained" | "outlined" | "cancel"; // Add variants
  outLineColor?: string;
  icon?: string; //
  iconSize?: number; // Font size for the icon
  type?: "submit" | "reset" | "button";
  loading?: boolean;
  disabled?: boolean; // Whether the button is disabled or not
  // onclickEvent?: (route:string)=>void; // Event handler for onClick event
};

export default function AyButton({
  onClick,
  title,
  sx,
  variant = "contained", // Default variant is "contained"
  outLineColor,
  icon,
  iconSize,
  type = "button",
  loading,
  disabled = false,
}: Props) {
  return (
    <Button
      onClick={onClick}
      type={type}
      disabled={disabled}
      sx={{
        ...(variant === "contained"
          ? {
              bgcolor: "var(--mainColor)", // Default background color
              color: "#fff", // Default text color for contrast
              "&:hover": {
                bgcolor: "var(--primaryVariant)", // Optional hover color
              },
              textTransform: "capitalize",
            }
          : variant === "outlined"
          ? {
              border: `1px solid ${outLineColor}`, // Border for "outlined"
              color: `${outLineColor ? "black" : " var(--mainColor)"}`, // Text color for "outlined"
              bgcolor: "transparent", // Transparent background
              "&:hover": {
                bgcolor: "rgba(0, 123, 255, 0.1)", // Subtle hover background
              },
            }
          : {
              border: `1px solid ${outLineColor}`, // Border for "outlined"
              color: `white`, // Text color for "outlined"
              bgcolor: "black", // Transparent background
              "&:hover": {
                bgcolor: "rgba(34, 32, 32, 0.9)", // Subtle hover background
              },
            }),
        textTransform: "capitalize", // Avoid uppercase text
        width: "150px",
        ...sx, // Allow overriding styles via `sx` prop
      }}
    >
      {loading ? (
        <div className="flex items-center">
          <span className="loader mr-2"></span>{" "}
          {/* Replace with your spinner */}
          Processing...
        </div>
      ) : (
        <>
          <Icon icon={`${icon}`} fontSize={iconSize} className="mr-2" /> {title}
        </>
      )}
      {/* <Icon icon={`${icon}`} fontSize={iconSize} /> {title} */}
    </Button>
  );
}
