import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer
} from "recharts";

import { PopulationElement } from "@/models/ChartElements";

type Props = {
  data: PopulationElement[];
  xAxisLabel: string;
  yAxisLabel: string;
  xAxisDataKey: string;
  yAxisDataKey: string;
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FF8042",
  "#AF19FF",
  "#2ECC71",
  "#332288",
  "#117733",
  "#882255",
  "#5A1AED",
  "#07B04B",
  "#AA4499",
  "#DE3700",
];

export default function Chart({ data, xAxisLabel, yAxisLabel, xAxisDataKey, yAxisDataKey }: Props) {
  return <>
    <ResponsiveContainer width={"100%"} minHeight={450}>
      <LineChart
        width={700}
        height={400}
        margin={{ top: 40, right: 15, left: 35, bottom: 20, }}
      >
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey={xAxisDataKey} type="category" allowDuplicatedCategory={false}>
          <Label value={xAxisLabel} offset={0} dx={15} dy={10} position="insideBottomRight" fill="#333333" />
        </XAxis>
        <YAxis dataKey={yAxisDataKey} tickFormatter={(v: number) => new Intl.NumberFormat("en").format(v)}>
          <Label value={yAxisLabel} offset={0} dy={-20} position="top" fill="#333333" />
        </YAxis>
        <Legend align="center" wrapperStyle={{ paddingTop: 15 }} />

        <Tooltip
          labelFormatter={(d) => `${d}年`}
          formatter={(v: number) => `${new Intl.NumberFormat("en").format(v)}人`}
        />

        {data.map((d, i) => (
          <Line
            type="linear"
            dataKey="value"
            data={d.data[0].data}
            name={d.prefName}
            key={d.prefName}
            stroke={COLORS[i % COLORS.length]}
            strokeWidth={1.5}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  </>;
}
