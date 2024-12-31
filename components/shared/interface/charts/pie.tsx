"use client";

import { GateIcon } from "@/icons";
import {
  Cell,
  LabelList,
  Pie,
  PieChart as RePieChart,
  ResponsiveContainer,
} from "recharts";
import {
  Box,
  Flex,
  FlexProps,
  Group,
  Indicator,
  Stack,
  Text,
} from "@mantine/core";
import { DownloadDropdown } from "./download-dropdown";
import { Fragment, SVGProps } from "react";
import { IconType } from "@/icons/type";

export type PieChartData = {
  name: string;
  value: number;
  color: string;
  label?: string;
};

type PieChartsProps = {
  data: PieChartData[];
  labelProps: {
    icon?: IconType;
    text: string;
    value: string;
  };
  legendProps?: FlexProps;
} & (
  | {
      withDownloadButton: true;
      downloadOptions: string[];
    }
  | {
      withDownloadButton?: false;
      downloadOptions?: string[];
    }
);

export function PieChart({
  withDownloadButton = true,
  data,
  labelProps: { icon: LabelIcon, text, value },
}: PieChartsProps) {
  return (
    <Fragment>
      <Box style={{ position: "relative" }} mt={30}>
        <ResponsiveContainer width="100%" height={250}>
          <RePieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              height={300}
              innerRadius={75}
              outerRadius={110}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}

              <LabelList
                dataKey="label"
                position="inside"
                fill="white"
                fontSize={12}
                offset={-10}
              />
            </Pie>
          </RePieChart>
        </ResponsiveContainer>

        <Stack
          gap={5}
          pos="absolute"
          top="50%"
          left="50%"
          align="center"
          style={{
            transform: "translate(-50%, -50%)",
          }}
        >
          {LabelIcon && <LabelIcon width={30} height={30} color="#D7D7D7" />}
          <Text size="sm" c="dimmed">
            {text}
          </Text>
          <Text fw={700} size="xl">
            {value}
          </Text>
        </Stack>
      </Box>

      <Flex justify="space-between" align="center" mt="auto">
        <Group className="w-full">
          {data.map((item, i) => {
            return (
              item.value > 0 && (
                <Flex flex={1} key={i} align="center" justify="center" gap={10}>
                  <Indicator color={item.color} />
                  <Text fz={14}>{item.name}</Text>
                </Flex>
              )
            );
          })}
        </Group>
        {withDownloadButton && <DownloadDropdown />}
      </Flex>
    </Fragment>
  );
}
