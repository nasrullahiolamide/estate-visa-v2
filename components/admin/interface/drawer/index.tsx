import { Drawer, DrawerProps } from "@mantine/core";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type DrawerState = Omit<DrawerProps, "opened" | "onClose">;

type DrawerContext = {
  openDrawer: (drawer: DrawerState) => void;
  closeDrawer: () => void;
};

const drawerContext = createContext<DrawerContext>({} as any);

export function useDrawer() {
  const drawer = useContext(drawerContext);

  if (!drawer) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }

  return drawer;
}

type DrawerProvider = PropsWithChildren<Partial<DrawerProps>>;

export function DrawersProvider({ children, ...props }: DrawerProvider) {
  const initialDrawerState: DrawerProps = {
    onClose,
    opened: false,
    ...props,
  };

  const [drawerState, setDrawerState] =
    useState<DrawerProps>(initialDrawerState);

  function onClose() {
    setDrawerState(initialDrawerState);
  }

  const drawer: DrawerContext = {
    closeDrawer: onClose,
    openDrawer(drawer: DrawerState) {
      setDrawerState((state) => {
        return {
          ...state,
          ...drawer,
          opened: true,
        };
      });
    },
  };

  return (
    <drawerContext.Provider value={drawer}>
      {children}

      <Drawer {...drawerState} />
    </drawerContext.Provider>
  );
}
