"use client";

import { useState, useCallback, useMemo } from "react";
import { useDisclosure } from "@mantine/hooks";
import { MeetingListData } from "@/builders/types/meetings";
import { SheduleMeetingProps } from "@/components/admin/meetings/modals";

export const useMeetingDrawer = (initialValue: boolean) => {
  const [isDrawerOpened, { open: openDrawer, close: originalCloseDrawer }] =
    useDisclosure(initialValue);

  const [data, setData] = useState<MeetingListData | null>(null);

  const closeDrawer = useCallback(() => {
    setData(null);
    originalCloseDrawer();
  }, [originalCloseDrawer]);

  const editMeeting = useCallback(
    (meetingData: MeetingListData) => {
      openDrawer();
      setData(meetingData);
    },
    [openDrawer]
  );

  const scheduleMeeting = useCallback(() => {
    openDrawer();
    setData(null);
  }, [openDrawer]);

  const meetingProps = useMemo<SheduleMeetingProps>(
    () => ({
      isDrawerOpened,
      closeDrawer,
      isEditing: !!data,
      data,
    }),
    [isDrawerOpened, closeDrawer, data]
  );

  return {
    openDrawer,
    editMeeting,
    scheduleMeeting,
    meetingProps,
  };
};
