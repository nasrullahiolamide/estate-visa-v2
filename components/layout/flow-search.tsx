import {
  ActionIcon,
  FocusTrap,
  Modal,
  Text,
  TextInput,
  TextInputProps,
} from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { useClickOutside, useDisclosure } from "@mantine/hooks";

import { SearchIcon } from "@/icons";
import { useEffect, useState } from "react";
import { useFlowDispatch } from "./flow-context";
import { FlowActionType } from "./use-flow-reducer";

import clsx from "clsx";

export type FlowSearchProps = TextInputProps & {
  isloading?: boolean;
  title: string;
  hidden?: boolean;
  id?: string;
};

export function FlowSearch(props: FlowSearchProps) {
  const [showSearchField, setShowSearchField] = useState(false);
  const [opened, { open, close }] = useDisclosure(showSearchField);

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

  return opened ? (
    <Modal opened={opened} onClose={close} title={props.title}>
      <Form form={form} onSubmit={handleSubmit}>
        <FocusTrap active>
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
                onClick={() => {
                  handleSubmit(form.values);
                  close();
                }}
                disabled={props.isloading}
              >
                <Text fw={600} fz={15}>
                  Search
                </Text>
              </ActionIcon>
            }
            {...props}
            {...form.getInputProps("query")}
          />
        </FocusTrap>
      </Form>
    </Modal>
  ) : (
    <ActionIcon
      id={props.id}
      hidden={props.hidden}
      variant='transparent'
      onClick={() => {
        setShowSearchField(!showSearchField);
        open();
      }}
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
