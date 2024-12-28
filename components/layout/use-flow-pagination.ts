import { cast } from "@/packages/libraries";
import { useFlowDispatch } from "./flow-context";
import { FlowActionType } from "./use-flow-reducer";

export function useFlowPagination() {
  const dispatch = useFlowDispatch();

  return {
    setTotal: (total: number = 0) => {
      dispatch({ type: FlowActionType.SET_TOTAL_ENTRY_COUNT, payload: total });
    },
    setPage: (page: string = "1") => {
      dispatch({ type: FlowActionType.SET_PAGE, payload: cast.number(page) });
    },
    setPageSize: (rowsPerPage: string = "10") => {
      dispatch({
        type: FlowActionType.SET_PAGE_SIZE,
        payload: cast.number(rowsPerPage),
      });
    },
    setSearch: (search: string = "") => {
      dispatch({ type: FlowActionType.SET_SEARCH_QUERY, payload: search });
    },
    setEntriesCount: (count: number = 0) => {
      dispatch({
        type: FlowActionType.SET_ENTRIES_PER_PAGE,
        payload: count,
      });
    },
  };
}
