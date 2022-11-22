import { Box, CssBaseline } from "@mui/material";
import AppBarComponent from "./components/AppBar";
import DrawerComponent from "./components/Drawer";
import Main from "./components/Main";
import DrawerContextProvider from "./context/DrawerContext";
import ListContextProvider from "./context/ListContext";

function App() {

  return (
    <DrawerContextProvider>
      <ListContextProvider>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />

          <AppBarComponent />

          <DrawerComponent />

          <Main />
        </Box>
      </ListContextProvider>
    </DrawerContextProvider>
  );
}

export default App;
