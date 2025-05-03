import { useLocation, useNavigate } from "react-router-dom";

import { MenuItem, Select } from "@mui/material";
import { Label } from "@/components/ui/label";

const BANNER_OPTIONS = [
  { label: "Home Slider 1", value: "home_slider_1" },
  { label: "Home Slider 2", value: "home_slider_2" },
  { label: "Home Slider 3", value: "home_slider_3" },
];

function SelectSlider() {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const bannerParam = query.get("banner") || "home-slider-1";
  const typeParam = query.get("type") || "all-slider-1";

  const currentBanner = bannerParam.replace(/-/g, "_");

  const handleBannerChange = (event: any) => {
    const selected = event.target.value;
    const newBanner = selected.replace(/_/g, "-");
    if (typeParam === "all-slider-1") {
      navigate(`/web-setup?banner=${newBanner}&type=all-slider-1`);
    } else {
      navigate(`/web-setup?banner=${newBanner}&type=cr-slider-1`);
    }
  };
  return (
    <div className="flex flex-col gap-3 my-4">
      <Label>Select Slider</Label>
      <Select
        value={currentBanner}
        onChange={handleBannerChange}
        className="w-[200px] bg-white"
        size="small"
        sx={{ fontSize: "0.75rem" }} // smaller text
      >
        {BANNER_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{ fontSize: "0.75rem" }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

export default SelectSlider;
