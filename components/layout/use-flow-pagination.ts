import { useFlowDispatch } from "./flow-context";
import { FlowActionType } from "./use-flow-reducer";

export function useFlowPagination() {
  const dispatch = useFlowDispatch();

  return {
    setTotal: (total: number = 0) => {
      dispatch({ type: FlowActionType.SET_TOTAL_ENTRY_COUNT, payload: total });
    },
    setPage: (page: number = 1) => {
      dispatch({ type: FlowActionType.SET_PAGE, payload: page });
    },
    setPageSize: (rowsPerPage: number = 1) => {
      dispatch({
        type: FlowActionType.SET_PAGE_SIZE,
        payload: rowsPerPage,
      });
    },
    setSearch: (search: string = "") => {
      dispatch({ type: FlowActionType.SET_SEARCH, payload: search });
    },
    setEntriesCount: (count: number = 0) => {
      dispatch({
        type: FlowActionType.SET_ENTRIES_COUNT_ON_CURRENT_PAGE,
        payload: count,
      });
    },
  };
}
