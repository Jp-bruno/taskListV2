import { Box, CssBaseline } from '@mui/material';
import AppBarComponent from './components/AppBar';
import DrawerComponent from './components/Drawer';
import Main from './components/Main';
import { useState } from 'react';
import ListContextProvider from './context/ListContext';

function App() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ListContextProvider>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />

          <AppBarComponent open={open} handleDrawerOpen={handleDrawerOpen} />

          <DrawerComponent open={open} handleDrawerClose={handleDrawerClose} />

          <Main open={open} />
        </Box>
    </ListContextProvider>
  );
}

export default App;
