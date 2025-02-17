"use client";

import { builder } from "@/builders";
import { GateRequestData } from "@/builders/types/gate-requests";
import { APP, formatDate, MODALS } from "@/packages/libraries";
import { handleError, handleSuccess } from "@/packages/notification";
import { Button, Flex, Radio, Stack, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import {
  Document,
  Page,
  pdf,
  Text as PDFText,
  StyleSheet,
  View,
} from "@react-pdf/renderer";
import { useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { toString } from "lodash";
import { useMemo, useState } from "react";

import dayjs from "dayjs";
import * as XLSX from "xlsx";

type IDateRange = [Date | null, Date | null];
type IDownloadProps = {
  data: GateRequestData[];
  filename: string;
};
type IValues = {
  startDate: string;
  endDate: string;
  estateId: string;
  status: string;
  downloadFormat: string;
};

const today = dayjs().toDate();
const past3Days = dayjs().subtract(3, "day").toDate();

const MyDocument = ({ data }: IDownloadProps) => (
  <Document>
    <Page size='A4' style={styles.page}>
      <View style={styles.header}>
        <PDFText style={styles.title}>Access Request History</PDFText>
      </View>
      <View style={styles.table}>
        <View style={styles.row}>
          <PDFText style={styles.headerCell}>Guest Name</PDFText>
          <PDFText style={styles.headerCell}>Status</PDFText>
          <PDFText style={styles.headerCell}>Date</PDFText>
        </View>
        {data.map((item, index) => (
          <View style={styles.row} key={index}>
            <PDFText style={styles.cell}>{item.guestName}</PDFText>
            <PDFText style={styles.cell}>{item.status}</PDFText>
            <PDFText style={styles.cell}>
              {dayjs(item.createdAt).format("YYYY-MM-DD")}
            </PDFText>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

// Styles for the PDF document
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Helvetica",
    backgroundColor: "#f9f9f9",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 8,
  },
  headerCell: {
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "#ccc",
    padding: 4,
    backgroundColor: "#e0e0e0",
    color: "#000",
  },
  cell: {
    textAlign: "center",
    flex: 1,
    padding: 4,
    color: "#555",
  },
});

const handleXLSXDownload = ({ data, filename }: IDownloadProps) => {
  const filteredData = data.map(({ id, ...rest }) => rest);
  const worksheet = XLSX.utils.json_to_sheet(filteredData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Access Request History");
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

const handlePDFDownload = async ({ data, filename }: IDownloadProps) => {
  const blob = await pdf(
    <MyDocument data={data} filename={filename} />
  ).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${filename}.pdf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function DownloadHistoryForm() {
  const estateId = toString(getCookie(APP.ESTATE_ID));
  const [dateRange, setDateRange] = useState<IDateRange>([past3Days, today]);

  const filename = useMemo(() => {
    return `access_request_history_from_${formatDate(
      dateRange[0],
      "YYYY-MM-DD"
    )} to ${formatDate(dateRange[1], "YYYY-MM-DD")}`;
  }, [dateRange]);

  const form = useForm<IValues>({
    initialValues: {
      startDate: "",
      endDate: "",
      estateId,
      status: "",
      downloadFormat: "pdf",
    },
    transformValues: (values) => {
      return {
        ...values,
        startDate: formatDate(dateRange[0], "YYYY-MM-DD"),
        endDate: formatDate(dateRange[1], "YYYY-MM-DD"),
      };
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: builder.$use.gates.requests.download,
    onSuccess: ({ data }) => {
      if (data.length === 0) {
        handleError("No data found for the selected date range")();
      } else {
        handleSuccess("Access request history downloaded successfully");
        handleDownload(data);
        modals.close(MODALS.DOWNLOAD_HISTORY);
      }
    },
    onError: () => {
      handleError("An error occurred, please try again later")();
    },
  });

  const handleSubmit = () => {
    const { downloadFormat, ...values } = form.getTransformedValues();
    mutate(values);
  };

  const handleDownload = (data: GateRequestData[]) => {
    const { downloadFormat } = form.getTransformedValues();
    if (downloadFormat === "pdf") {
      handlePDFDownload({ data, filename });
    } else if (downloadFormat === "xlsx") {
      handleXLSXDownload({ data, filename });
    }
  };

  return (
    <Stack gap={30}>
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
      <Flex>
        <Radio.Group
          flex={1}
          name='status'
          label='Request Status'
          defaultValue=''
          {...form.getInputProps("status")}
        >
          <Stack mt={8}>
            <Radio value='' label='All Requests' />
            <Radio value='approved' label='Approved' />
            <Radio value='pending' label='Pending' />
          </Stack>
        </Radio.Group>
        <Radio.Group
          flex={1}
          className='ml-auto'
          name='downloadFormat'
          label='Download Format'
          defaultValue='pdf'
          {...form.getInputProps("downloadFormat")}
        >
          <Stack mt={8}>
            <Radio value='pdf' label='PDF' />
            <Radio value='xlsx' label='Excel' />
          </Stack>
        </Radio.Group>
      </Flex>

      <Button loading={isPending} disabled={isPending} onClick={handleSubmit}>
        Download
      </Button>
    </Stack>
  );
}

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
