import { Icon } from "@iconify/react/dist/iconify.js";
import { IconButton, Toolbar, Tooltip } from "@mui/material";

type Props = {
  onClick: () => void;
  icon?: string;
};

function MyEyeIcon({ onClick, icon = "mdi:eye" }: Props) {
  return (
    <Toolbar disableGutters>
      <Tooltip title="View" placement="top">
        <IconButton onClick={onClick}>
          <Icon icon={icon} fontSize={20} />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

export default MyEyeIcon;
