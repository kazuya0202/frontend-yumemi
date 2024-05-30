import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";

import App from "./App";
import PopulationChart from "./features/PopulationChart";
import Prefectures from "./features/Prefectures";


describe(App, () => {
    test("Appがレンダリングされる", async () => {
        render(<App />);
        expect(<Prefectures />).toBeDefined();
        expect(<PopulationChart />).toBeDefined();

        expect(screen.getByRole("heading", { name: "都道府県別の総人口・人口構成" })).toBeInTheDocument();
        expect(screen.getByRole("main")).toBeInTheDocument();
    });
});
