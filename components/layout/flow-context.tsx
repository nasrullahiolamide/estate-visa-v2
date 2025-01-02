import { useDisclosure } from "@mantine/hooks";
import { createContext, PropsWithChildren, useContext } from "react";
import { FlowAction, FlowState, useFlowReducer } from "./use-flow-reducer";

export const navigationContext = createContext<
  | {
      isNavOpened: boolean;
      toggleNav: () => void;
    }
  | undefined
>(undefined);

export function useFlowNavigation() {
  const context = useContext(navigationContext);

  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }

  return context;
}

export function useFlowState() {
  const context = useContext(formStateContext);

  if (!context) {
    throw new Error("useFlowState must be used within a FlowContainer");
  }

  return context.state;
}

export const formStateContext = createContext<
  | {
      state: FlowState;
      dispatch: (action: FlowAction) => void;
    }
  | undefined
>(undefined);

export function useFlowDispatch() {
  const context = useContext(formStateContext);

  if (!context) {
    throw new Error("useFlowDispatch must be used within a FlowContainer");
  }

  return context.dispatch;
}

export function FlowStateProvider({ children }: PropsWithChildren<{}>) {
  const [state, dispatch] = useFlowReducer();

  return (
    <formStateContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </formStateContext.Provider>
  );
}

export function NavigationProvider({ children }: PropsWithChildren<{}>) {
  const [opened, { toggle }] = useDisclosure(false);

  const contextValue = {
    toggleNav: toggle,
    isNavOpened: opened,
  };

  return (
    <navigationContext.Provider value={contextValue}>
      {children}
    </navigationContext.Provider>
  );
}
