import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";

import Checkbox from "./Checkbox";

describe(Checkbox, () => {
  test("Checkboxがレンダリングされる", async () => {
    render(<Checkbox value={10} onChange={() => { }}>ラベル</Checkbox>);
    expect(screen.getByLabelText("ラベル")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toHaveAttribute("value", "10");
  });
});
