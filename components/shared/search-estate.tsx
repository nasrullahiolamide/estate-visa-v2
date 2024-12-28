import { Fragment } from "react";
import { getCookie } from "cookies-next";
import { Search02Icon } from "hugeicons-react";

import { Button, Flex, Text } from "@mantine/core";
import { Spotlight, spotlight } from "@mantine/spotlight";

import { spotLightActions } from "@/packages/actions/spotlight";
import { APP, encode } from "@/packages/libraries";

import { SearchIcon } from "@/icons";
import clsx from "clsx";

export function SearchEstate() {
  const userType = getCookie(APP.USER_TYPE);

  return (
    <Fragment>
      <Button
        miw={300}
        pl={12}
        pr={4}
        size="md"
        bg="white"
        color="gray.3"
        variant="outline"
        onClick={spotlight.open}
        leftSection={<SearchIcon width={18} />}
        classNames={{
          root: "hidden lg:flex",
          label: "w-full justify-between",
          inner: "w-full",
        }}
      >
        <Flex align="center" justify="space-between" className="w-full">
          <Text fz={14} c="dimmed">
            Search
          </Text>
          <Text
            p={8}
            fw={700}
            fz={12}
            className={clsx(
              "border border-gray-3",
              "rounded-md",
              "bg-primary-background-subtle text-primary-text-body",
            )}
          >
            Ctrl + K
          </Text>
        </Flex>
      </Button>

      <Button
        px={6}
        c="gray.10"
        hiddenFrom="lg"
        variant="transparent"
        onClick={spotlight.open}
      >
        <Search02Icon />
      </Button>

      {userType && (
        <Spotlight
          highlightQuery
          limit={5}
          nothingFound="Nothing found..."
          shortcut={["mod + K", "mod + P", "/"]}
          actions={spotLightActions[encode(userType)]}
          searchProps={{
            leftSection: <SearchIcon />,
            placeholder: "Search for anything...",
          }}
        />
      )}
    </Fragment>
  );
}

{
  /* <Center
                h={36}
                w={36}
                bg='purple.4'
                className='rounded-full cursor-pointer'
                component={Link}
                href={PAGES.NOTIFICATIONS}
              >
                <Indicator processing color='red' size={10} withBorder>
                  <BellIcon width={18} />
                </Indicator>
              </Center> */
}
