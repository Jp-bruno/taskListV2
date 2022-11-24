import { createContext, PropsWithChildren, useState } from "react";

type DrawerType = {
  open: boolean;
  toggleDrawer: () => void;
};

export const DrawerContext = createContext({} as DrawerType);

export default function DrawerContextProvider({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(prevState => !prevState);
  };

  return (
    <DrawerContext.Provider
      value={{ open, toggleDrawer }}
    >
      {children}
    </DrawerContext.Provider>
  );
}
