import { Fragment } from "react";
import { getCookie } from "cookies-next";
import { Button, Flex, Text } from "@mantine/core";
import { Spotlight, spotlight } from "@mantine/spotlight";
import { spotLightActions } from "@/packages/actions/spotlight";
import { APP, encode, USER_TYPE } from "@/packages/libraries";

import { SearchIcon } from "@/icons";

export function SearchEstate() {
  const userType = getCookie(APP.USER_TYPE);

  return (
    <Fragment>
      <Button
        h={40}
        pl={12}
        size='md'
        pr={5}
        bg='white'
        color='gray.3'
        variant='outline'
        leftSection={<SearchIcon width={18} />}
        className='hidden sm:flex'
        onClick={spotlight.open}
        children={
          <Flex align='center'>
            <Text fz={14} c='dimmed' pr={60}>
              Search
            </Text>
            <Text
              c='gray.10'
              className='border rounded-md border-gray-3 bg-gray-1'
              p={5}
              fw={700}
              fz={12}
            >
              Ctrl + K
            </Text>
          </Flex>
        }
      />

      <Button
        variant='transparent'
        c='gray.10'
        hiddenFrom='sm'
        px={6}
        onClick={spotlight.open}
      >
        <SearchIcon height={25} width={25} />
      </Button>

      {userType && (
        <Spotlight
          actions={spotLightActions[encode(userType)]}
          nothingFound='Nothing found...'
          highlightQuery
          limit={5}
          shortcut={["mod + K", "mod + P", "/"]}
          searchProps={{
            leftSection: <SearchIcon />,
            placeholder: "Search for anything...",
          }}
        />
      )}
    </Fragment>
  );
}
