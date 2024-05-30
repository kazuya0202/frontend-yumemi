import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";

import RadioGroup from "./RadioGroup";

import { PopulationKind } from "@/models/APIResponseType";


const options = ["総人口", "生産年齢人口", "老年人口", "年少人口"] as const satisfies PopulationKind[];

describe(RadioGroup, () => {
    test("RadioGroupがレンダリングされる", async () => {
        render(<RadioGroup options={options} value="総人口" onChange={() => { }} />);

        expect(screen.getByRole("radio", { name: "総人口", checked: true })).toBeInTheDocument();
        expect(screen.getByLabelText("総人口")).toBeInTheDocument();

        expect(screen.getByRole("radio", { name: "生産年齢人口", checked: false })).toBeInTheDocument();
        expect(screen.getByLabelText("生産年齢人口")).toBeInTheDocument();

        expect(screen.getByRole("radio", { name: "老年人口", checked: false })).toBeInTheDocument();
        expect(screen.getByLabelText("老年人口")).toBeInTheDocument();

        expect(screen.getByRole("radio", { name: "年少人口", checked: false })).toBeInTheDocument();
        expect(screen.getByLabelText("年少人口")).toBeInTheDocument();
    });
});
