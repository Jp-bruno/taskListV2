import { Toolbar, IconButton, Typography } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { ListContext } from "../context/ListContext";
import { useContext } from "react";
import { DrawerContext } from "../context/DrawerContext";

const drawerWidth = window.innerWidth < 500 ? window.innerWidth : 340;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function AppBarComponent() {
  const {selectedTask} = useContext(ListContext);
  const { open, toggleDrawer } =
    useContext(DrawerContext);

  return (
    <AppBarStyled open={open}>
      <Toolbar sx={{background: selectedTask?.finished ? 'green' : 'black', transition: 'background 0.4s ease'}}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {selectedTask
            ? selectedTask.title
            : ""}
        </Typography>
      </Toolbar>
    </AppBarStyled>
  );
}
