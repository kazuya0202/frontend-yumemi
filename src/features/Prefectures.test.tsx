import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";

import Prefectures from "./Prefectures";


describe(Prefectures, () => {
    test("Prefecturesがレンダリングされる", async () => {
        render(<Prefectures />);
        expect(screen.getByText("都道府県")).toBeInTheDocument();
    });
});
