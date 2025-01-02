import { ceil, divide } from "mathjs";
import { useReducer } from "react";

export type FlowState = {
  page: number;
  entriesPerPage: number;
  totalEntryCount: number;
  query: string;
  numberOfPages: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: string;
  status?: string;
};

export enum FlowActionType {
  SET_NAV_TOGGLE = "SET_NAV_TOGGLE",
  SET_PAGE = "SET_PAGE",
  SET_ROWS_PER_PAGE = "SET_ROWS_PER_PAGE",
  SET_ENTRIES_PER_PAGE = "SET_ENTRIES_PER_PAGE",
  SET_ENTRIES_COUNT_ON_CURRENT_PAGE = "SET_ENTRIES_COUNT_ON_CURRENT_PAGE",
  SET_TOTAL_ENTRY_COUNT = "SET_TOTAL_ENTRY_COUNT",
  SET_SEARCH_QUERY = "SET_SEARCH_QUERY",
  SET_PAGE_SIZE = "SET_PAGE_SIZE",
  SET_FILTER = "SET_FILTER",
}

export type FlowAction =
  | { type: FlowActionType.SET_NAV_TOGGLE; payload: boolean }
  | { type: FlowActionType.SET_PAGE; payload: number }
  | { type: FlowActionType.SET_ENTRIES_PER_PAGE; payload: number }
  | { type: FlowActionType.SET_TOTAL_ENTRY_COUNT; payload: number }
  | { type: FlowActionType.SET_SEARCH_QUERY; payload: string }
  | { type: FlowActionType.SET_PAGE_SIZE; payload: number }
  | {
      type: FlowActionType.SET_FILTER;
      payload: {
        sortBy?: string;
        sortOrder?: "A-Z" | "Z-A" | "Recent" | string;
        status?: string;
      };
    };

const initialState: FlowState = {
  page: 1,
  entriesPerPage: 10,
  totalEntryCount: 1,
  query: "",
  numberOfPages: 0,
  pageSize: 10,
  sortBy: "",
  sortOrder: "",
  status: "",
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
    case FlowActionType.SET_ENTRIES_PER_PAGE:
      return { ...state, entriesPerPage: action.payload };
    case FlowActionType.SET_TOTAL_ENTRY_COUNT:
      return {
        ...state,
        totalEntryCount: action.payload,
        numberOfPages: getNumberOfPages(action.payload, state.pageSize),
      };
    case FlowActionType.SET_SEARCH_QUERY:
      return { ...state, query: action.payload };

    case FlowActionType.SET_FILTER:
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortOrder: action.payload.sortOrder,
        status: action.payload.status,
      };

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
