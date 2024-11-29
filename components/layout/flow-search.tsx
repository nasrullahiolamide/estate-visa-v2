import {
  ActionIcon,
  FocusTrap,
  TextInput,
  TextInputProps,
  Text,
  Modal,
} from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { Form, useForm } from "@mantine/form";

import { SearchIcon } from "@/icons";
import { useState, useEffect } from "react";
import { useFlowDispatch } from "./flow-context";
import { FlowActionType } from "./use-flow-reducer";

import clsx from "clsx";

export type FlowSearchProps = TextInputProps & {
  isLoading?: boolean;
  title: string;
};

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
    <FocusTrap active>
      <Modal opened={showSearchField} onClose={close} title={props.title}>
        {/* Modal content */}
        <Form form={form} onSubmit={handleSubmit} ref={ref}>
          <TextInput
            fz='sm'
            placeholder='Search table'
            miw={250}
            classNames={{
              input: "text-sm border border-blue-8 pr-8 pl-3 !py-5 ",
              section: "w-20 overflow-hidden",
            }}
            rightSection={
              <ActionIcon
                variant='transparent'
                className='w-full h-full rounded-tr-none rounded-br-none'
                onClick={() => handleSubmit(form.values)}
                disabled={props.isLoading}
              >
                <Text fw={600} fz={15}>
                  Search
                </Text>
              </ActionIcon>
            }
            {...props}
            {...form.getInputProps("query")}
          />
        </Form>
      </Modal>
    </FocusTrap>
  ) : (
    <ActionIcon
      variant='transparent'
      onClick={() => setShowSearchField(!showSearchField)}
      className={clsx("lg-border lg:border-blue-8 lg:w-12 lg:h-[42px]")}
    >
      <SearchIcon
        height={20}
        width={25}
        className='lg:text-blue-8 text-primary-text-caption'
      />
    </ActionIcon>
  );
}
