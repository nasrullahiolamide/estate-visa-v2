import { Box } from "@mantine/core";

import { StatisticsCard } from "../shared/cards";
import { stats } from "@/components/admin/data/statistics";

export function StatisticsOverview() {
  return (
    <Box
      className='grid gap-6'
      style={{
        gridTemplateColumns: "repeat(auto-fill,minmax(min(350px,100%),1fr))",
        gridAutoRows: "1fr",
      }}
    >
      {stats.map((stats, index) => (
        <StatisticsCard key={index} {...stats} />
      ))}
    </Box>
  );
}
