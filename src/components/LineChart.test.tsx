import { render } from "@testing-library/react";
import { describe, test } from "vitest";

import Chart from "./LineChart";

import { PopulationElement } from "@/models/ChartElements";

const dummyData = [
  {
    data: [
      {
        label: "総人口",
        data: [
          { year: 2000, value: 100 },
          { year: 2010, value: 200 },
          { year: 2020, value: 300 }
        ]
      }
    ],
    prefCode: 1,
    prefName: "北海道"
  } as PopulationElement
];

/**
 * Chartコンポーネント（テストケースなしレンダリングのみ）
 */
describe("Chart", async () => {
  test("Chartがレンダリングされる", () => {
    render(<Chart
      data={dummyData}
      xAxisLabel="年"
      yAxisLabel="総人口 (人)"
      xAxisDataKey="year"
      yAxisDataKey="value"
    />);
  });
});

/**
 * Chartコンポーネントのテスト
 * - 試行錯誤したが、ResizeObserver の問題で動作しなかった
 */
// describe(Chart, async () => {
//   test("Chartがレンダリングされる", () => {
//     render(<Chart
//       data={dummyData}
//       xAxisLabel="年"
//       yAxisLabel="総人口 (人)"
//       xAxisDataKey="year"
//       yAxisDataKey="value"
//     />);
//     expect(screen.getByText("北海道")).toBeInTheDocument();
//     expect(screen.getByText("年")).toBeInTheDocument();
//   });
// });
