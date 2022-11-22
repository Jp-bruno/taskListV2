import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { DrawerContext } from "../context/DrawerContext";
import { DrawerHeader } from "./DrawerHeader";
import TaskDetails from "./TaskDetails";
import TextArea from "./TextArea";

const drawerWidth = window.innerWidth < 500 ? window.innerWidth : 340;

const MainStytled = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 2,
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  marginLeft: `-${drawerWidth}px`,

  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    flexGrow: 1,
    overflow: "hidden",
    marginLeft: 0
  }),
}));

export default function Main() {
  const { open } = useContext(DrawerContext);
  return (
    <MainStytled open={open}>
      <DrawerHeader />

      <TextArea />

      <TaskDetails />
    </MainStytled>
  );
}
