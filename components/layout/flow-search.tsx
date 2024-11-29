import {
  ActionIcon,
  FocusTrap,
  TextInput,
  TextInputProps,
} from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { Form, useForm } from "@mantine/form";

import { SearchIcon } from "@/icons";
import { useState, useEffect } from "react";
import { useFlowDispatch } from "./flow-context";
import { FlowActionType } from "./use-flow-reducer";

import clsx from "clsx";

interface FlowSearchProps extends TextInputProps {
  isLoading?: boolean;
}

export function FlowSearch(props: FlowSearchProps) {
  const [showSearchField, setShowSearchField] = useState(false);
  const dispatch = useFlowDispatch();

  const ref = useClickOutside(() => {
    setShowSearchField(false);
  });

  const handleSubmit = ({ query }: typeof form.values) => {
    if (query === "") return;

    dispatch({
      type: FlowActionType.SET_SEARCH_QUERY,
      payload: query,
    });
  };

  const form = useForm({
    initialValues: {
      query: "",
    },
  });

  useEffect(() => {
    if (form.values.query === "") {
      dispatch({
        type: FlowActionType.SET_SEARCH_QUERY,
        payload: "",
      });
    }
  }, [form.values.query]);

  return showSearchField ? (
    <Form form={form} onSubmit={handleSubmit} ref={ref}>
      <FocusTrap active>
        <TextInput
          fz='sm'
          placeholder='Search table'
          miw={240}
          classNames={{
            input: "text-sm border border-blue-8 pr-8 pl-3 !py-5 ",
            section: "w-12 overflow-hidden",
          }}
          rightSection={
            <ActionIcon
              variant='filled'
              className='w-full h-full rounded-tr-none rounded-br-none'
              onClick={() => handleSubmit(form.values)}
              disabled={props.isLoading}
            >
              <SearchIcon color='white' />
            </ActionIcon>
          }
          {...props}
          {...form.getInputProps("query")}
        />
      </FocusTrap>
    </Form>
  ) : (
    <ActionIcon
      variant='transparent'
      onClick={() => setShowSearchField(!showSearchField)}
      className={clsx("lg-border lg:border-blue-8 lg:w-12 lg:h-[42px]", {})}
    >
      <SearchIcon
        height={20}
        width={25}
        className='lg:text-blue-8 text-primary-text-caption'
      />
    </ActionIcon>
  );
}
