import { USER_TYPE } from "@/packages/libraries";
import { ceil, divide } from "mathjs";
import { useReducer } from "react";

export type FlowState = {
  page: number;
  entriesPerPage: number;
  totalEntryCount: number;
  search: string;
  numberOfPages: number;
  pageSize: number;
};

export enum FlowActionType {
  SET_PAGE = "SET_PAGE",
  SET_ROWS_PER_PAGE = "SET_ROWS_PER_PAGE",
  SET_ENTRIES_PER_PAGE = "SET_ENTRIES_PER_PAGE",
  SET_ENTRIES_COUNT_ON_CURRENT_PAGE = "SET_ENTRIES_COUNT_ON_CURRENT_PAGE",
  SET_TOTAL_ENTRY_COUNT = "SET_TOTAL_ENTRY_COUNT",
  SET_SEARCH = "SET_SEARCH",
  SET_PAGE_SIZE = "SET_PAGE_SIZE",
}

export type FlowAction =
  | { type: FlowActionType.SET_PAGE; payload: number }
  | { type: FlowActionType.SET_ENTRIES_PER_PAGE; payload: number }
  | { type: FlowActionType.SET_TOTAL_ENTRY_COUNT; payload: number }
  | { type: FlowActionType.SET_ENTRIES_COUNT_ON_CURRENT_PAGE; payload: number }
  | { type: FlowActionType.SET_SEARCH; payload: string }
  | { type: FlowActionType.SET_PAGE_SIZE; payload: number };

const initialState: FlowState = {
  page: 1,
  entriesPerPage: 10,
  totalEntryCount: 1,
  search: "",
  numberOfPages: 0,
  pageSize: 20,
};

function getNumberOfPages(totalEntryCount: number, pageSize: number) {
  return ceil(divide(totalEntryCount, pageSize));
}

function reducer(state: FlowState, action: FlowAction): FlowState {
  switch (action.type) {
    case FlowActionType.SET_PAGE:
      return { ...state, page: action.payload };
    case FlowActionType.SET_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.payload,
        numberOfPages: getNumberOfPages(state.totalEntryCount, action.payload),
      };
    case FlowActionType.SET_TOTAL_ENTRY_COUNT:
      return {
        ...state,
        totalEntryCount: action.payload,
        numberOfPages: getNumberOfPages(action.payload, state.pageSize),
      };
    case FlowActionType.SET_SEARCH:
      return { ...state, search: action.payload };
    default:
      return state;
  }
}

function transformState(state: FlowState) {
  return {
    ...state,
    numberOfPages: getNumberOfPages(state.totalEntryCount, state.pageSize),
  };
}

export function useFlowReducer() {
  return useReducer(reducer, initialState, transformState);
}
