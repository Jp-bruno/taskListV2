import { Toolbar, IconButton, Typography } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { ListContext } from "../context/ListContext";
import { useContext } from "react";


const drawerWidth = window.innerWidth < 500 ? window.innerWidth : 340;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function AppBarComponent({ open, handleDrawerOpen }: any) {
  const ListContextObject = useContext(ListContext);

  return (
    <AppBarStyled open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {ListContextObject?.selectedTask ? ListContextObject.selectedTask.title : ''}
        </Typography>
      </Toolbar>
    </AppBarStyled>
  )
}