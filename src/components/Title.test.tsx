import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";

import Title from "./Title";


describe(Title, () => {
    test("Titleがレンダリングされる", async () => {
        render(<Title>タイトル</Title>);
        expect(screen.getByRole("heading", { name: "タイトル" })).toBeInTheDocument();
    });
});
