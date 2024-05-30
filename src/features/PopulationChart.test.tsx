import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";

import PopulationChart from "./PopulationChart";

import RadioGroup from "@/components/RadioGroup";
import { PopulationKind } from "@/models/APIResponseType";


const options = ["総人口", "生産年齢人口", "老年人口", "年少人口"] as const satisfies PopulationKind[];

describe(PopulationChart, () => {
    test("PopulationChartがレンダリングされる", async () => {
        render(<PopulationChart />);
        expect(screen.getByText("グラフ")).toBeInTheDocument();

        expect(<RadioGroup options={options} value="総人口" onChange={() => { }} />).toBeDefined();
    });
});
