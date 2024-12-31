import { createContext, PropsWithChildren, useContext } from "react";
import { FlowAction, FlowState, useFlowReducer } from "./use-flow-reducer";

export const formStateContext = createContext<
  | {
      state: FlowState;
      dispatch: (action: FlowAction) => void;
    }
  | undefined
>(undefined);

export function useFlowState() {
  const context = useContext(formStateContext);

  if (!context) {
    throw new Error("useFlowState must be used within a FlowContainer");
  }

  return context.state;
}

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
