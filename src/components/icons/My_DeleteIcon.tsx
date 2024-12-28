import { Icon } from "@iconify/react/dist/iconify.js";
import { IconButton, Toolbar, Tooltip } from "@mui/material";

type Props = {
  onClick: () => void;
  icon?: string;
  title?: string;
};

export default function MyDeleteIcon({
  onClick,
  icon = "material-symbols:delete",
  title = "Delete",
}: Props) {
  return (
    <Toolbar disableGutters>
      <Tooltip title={title} placement="top">
        <IconButton onClick={onClick}>
          <Icon icon={icon} fontSize={20} />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}
