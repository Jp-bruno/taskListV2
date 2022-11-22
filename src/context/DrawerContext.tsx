import { createContext, PropsWithChildren, useState } from "react";

type DrawerType = {
  open: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
};

export const DrawerContext = createContext({} as DrawerType);

export default function DrawerContextProvider({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <DrawerContext.Provider
      value={{ open, handleDrawerOpen, handleDrawerClose }}
    >
      {children}
    </DrawerContext.Provider>
  );
}
