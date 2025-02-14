"use client";

import { builder } from "@/builders";
import { MessagesData, useFakeMessagesData } from "@/builders/types/messages";
import { AppShellHeader } from "@/components/admin/shared";
import {
  FlowContainer,
  FlowContentContainer,
  FlowPaper,
} from "@/components/layout";
import { MessageContent } from "@/components/occupant/messages/content";
import { HeaderOptions } from "@/components/occupant/messages/options";
import { EmptySlot } from "@/components/shared/interface";
import { TIME_FORMAT } from "@/packages/constants/time";
import { useMessagesValue } from "@/packages/hooks/use-messages-value";
import { formatDate, makePath, PAGES } from "@/packages/libraries";
import { useListState } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";

interface PageProps {
  params: {
    content: string;
  };
}

export default function Page({ params }: PageProps) {
  const {
    content: { view, id },
  } = useMessagesValue(params.content);
  const [state, handlers] = useListState<MessagesData>([]);
  const initialMessageData = useFakeMessagesData();

  const {
    data = [],
    isPlaceholderData,
    isFetching,
  } = useQuery({
    queryKey: builder.messages.get.id.$get(id),
    queryFn: () => builder.$use.messages.get.id(id),
    placeholderData: Array.from({ length: 1 }, () => initialMessageData),
    select: (data) =>
      data.map((item) => {
        const localDate = formatDate(item?.updatedAt, "MM/DD/YYYY");
        const localTime = formatDate(item?.updatedAt, TIME_FORMAT);

        return {
          ...item,
          localDate,
          localTime,
        };
      }),
  });

  useEffect(() => {
    handlers.setState(data);
  }, [isFetching]);

  return (
    <Fragment>
      <AppShellHeader
        title='Message Details'
        backHref={makePath(PAGES.DASHBOARD, PAGES.MESSAGES)}
        showLinks={false}
        options={
          <HeaderOptions data={state.at(0) as MessagesData} view={view} />
        }
      />
      <FlowContainer type='plain' className='lg:~p-1/8'>
        <FlowContentContainer
          classNames={{
            root: "rounded-none lg:rounded-2xl bg-white",
          }}
        >
          <FlowPaper
            containerProps={{
              my: 20,
            }}
          >
            {state ? (
              <MessageContent
                data={state.at(0)}
                recipient='Admin'
                skeleton={isPlaceholderData}
              />
            ) : (
              <EmptySlot
                title='Message not found. This Message may have been deleted or does not exist'
                src='no-talk'
              />
            )}
          </FlowPaper>
        </FlowContentContainer>
      </FlowContainer>
    </Fragment>
  );
}
