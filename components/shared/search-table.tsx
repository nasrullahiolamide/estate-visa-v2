"use client";

import { Fragment } from "react";
import { Search02Icon } from "hugeicons-react";

import { Button, Flex, Text } from "@mantine/core";
import {
  Spotlight,
  spotlight,
  SpotlightActionData,
  SpotlightProps,
} from "@mantine/spotlight";

import { SearchIcon } from "@/icons";
import clsx from "clsx";
import { debounce } from "lodash";
import { useFlowPagination, useFlowState } from "../layout";

interface SearchEstateProps extends SpotlightProps {
  actions: SpotlightActionData[];
  placeholder?: string;
}

export function SearchTable({
  actions,
  placeholder,
  ...props
}: SearchEstateProps) {
  const pagination = useFlowPagination();
  const { query } = useFlowState();
  const handleQueryChange = debounce((search) => {
    pagination.setSearch(search);
  }, 300);

  return (
    <Fragment>
      <Button
        miw={300}
        pl={12}
        pr={4}
        size='md'
        bg='white'
        color='gray.3'
        variant='outline'
        onClick={spotlight.open}
        leftSection={<SearchIcon width={18} />}
        classNames={{
          root: "hidden lg:flex",
          label: "w-full justify-between",
          inner: "w-full",
        }}
      >
        <Flex align='center' justify='space-between' className='w-full'>
          <Text fz={14} c='dimmed'>
            Search Table
          </Text>
          <Text
            p={8}
            fw={700}
            fz={12}
            className={clsx(
              "border border-gray-3",
              "rounded-md",
              "bg-primary-background-subtle text-primary-text-body"
            )}
          >
            Ctrl + K
          </Text>
        </Flex>
      </Button>

      <Button
        px={6}
        c='gray.10'
        hiddenFrom='lg'
        variant='transparent'
        onClick={spotlight.open}
      >
        <Search02Icon />
      </Button>

      <Spotlight
        highlightQuery
        limit={5}
        nothingFound='Nothing found...'
        shortcut={["mod + K", "mod + P", "/"]}
        actions={actions}
        query={query}
        onQueryChange={handleQueryChange}
        searchProps={{
          leftSection: <SearchIcon />,
          placeholder: placeholder || "Search for anything...",
        }}
        {...props}
      />
    </Fragment>
  );
}
