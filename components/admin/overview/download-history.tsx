"use client";

import { builder } from "@/builders";
import { APP, formatDate, MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { Button, Radio, Stack, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { toString } from "lodash";
import { useState } from "react";

import dayjs from "dayjs";

type IDateRange = [Date | null, Date | null];
type IValues = {
  startDate: string;
  endDate: string;
  estateId: string;
  status: string;
};

const today = dayjs().toDate();
const past3Days = dayjs().subtract(3, "day").toDate();

export function DownloadHistory() {
  return (
    <Text
      variant='subtle'
      size='sm'
      ta='left'
      mr='auto'
      className='underline cursor-pointer text-accent-6'
      onClick={() =>
        modals.open({
          modalId: MODALS.DOWNLOAD_HISTORY,
          title: "Download History",
          classNames: {
            content: "sm:max-w-[450px] w-full",
          },
          children: <DownloadHistoryForm />,
        })
      }
    >
      Download History
    </Text>
  );
}

function DownloadHistoryForm() {
  const estateId = toString(getCookie(APP.ESTATE_ID));
  const [dateRange, setDateRange] = useState<IDateRange>([past3Days, today]);

  const form = useForm<IValues>({
    initialValues: {
      startDate: "",
      endDate: "",
      estateId,
      status: "all",
    },
    transformValues: (values) => {
      return {
        ...values,
        startDate: formatDate(dateRange[0], "YYYY-MM-DD"),
        endDate: formatDate(dateRange[1], "YYYY-MM-DD"),
      };
    },
  });

  const handleSubmit = () => {
    const values = form.getTransformedValues();
    mutate(values);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: builder.$use.gates.requests.download,
    onSuccess: () => {
      handleSuccess("Access request history downloaded successfully");
      modals.close(MODALS.DOWNLOAD_HISTORY);
    },
    onError: () => {
      handleError("An error occurred, please try again later");
    },
  });

  return (
    <Stack gap={20}>
      <DatePicker
        type='range'
        value={dateRange}
        onChange={setDateRange}
        maxDate={today}
        classNames={{
          month: "w-full",
          calendarHeader: "w-full",
          monthsList: "w-full",
          monthCell: "text-center",
        }}
      />
      <Radio.Group
        name='status'
        label='Request Status'
        defaultValue='all'
        {...form.getInputProps("status")}
      >
        <Stack mt={8}>
          <Radio value='all' label='All Requests' />
          <Radio value='approved' label='Approved' />
          <Radio value='pending' label='Pending' />
        </Stack>
      </Radio.Group>
      <Button loading={isPending} disabled={isPending} onClick={handleSubmit}>
        Download
      </Button>
    </Stack>
  );
}
