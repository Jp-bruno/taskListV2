import { Drawer, Typography, IconButton, Divider } from "@mui/material";
import { DrawerHeader } from "./DrawerHeader";
import TasksList from "./TasksList";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { DrawerContext } from "../context/DrawerContext";

const drawerWidth = window.innerWidth < 500 ? window.innerWidth : 340;

export default function DrawerComponent() {
  const theme = useTheme();

  const { open, handleDrawerClose } =
    useContext(DrawerContext);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Typography variant="h5" align="left">
          Tarefas
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>

      <Divider />

      <TasksList />
    </Drawer>
  );
}
