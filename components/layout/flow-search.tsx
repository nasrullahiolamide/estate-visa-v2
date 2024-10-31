import {
  ActionIcon,
  FocusTrap,
  rem,
  TextInput,
  TextInputProps,
} from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
// import { SearchNormal1 } from "iconsax-react";
import { useState } from "react";
import { useFlowDispatch, useFlowState } from "./flow-context";
import { FlowActionType } from "./use-flow-reducer";
import { SearchIcon } from "@/icons";

interface FlowSearchProps extends TextInputProps {}

export function FlowSearch(props: FlowSearchProps) {
  const [showSearchField, setShowSearchField] = useState(false);

  const { search } = useFlowState();
  const dispatch = useFlowDispatch();

  const ref = useClickOutside(() => {
    setShowSearchField(false);
  });

  return showSearchField ? (
    <FocusTrap active>
      <TextInput
        ref={ref}
        leftSection={<SearchIcon />}
        placeholder='Search'
        size='sm'
        py='1rem'
        style={{ width: 240 }}
        className='text-primary-text-body'
        value={search}
        onChange={(event) => {
          dispatch({
            type: FlowActionType.SET_SEARCH,
            payload: event.currentTarget.value,
          });
        }}
        {...props}
      />
    </FocusTrap>
  ) : (
    <ActionIcon
      size={42}
      variant='transparent'
      onClick={() => {
        setShowSearchField(true);
      }}
    >
      <SearchIcon color='var(--primary-text-caption)' />
    </ActionIcon>
  );
}
