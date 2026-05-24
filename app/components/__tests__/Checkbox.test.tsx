import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Checkbox from "../Checkbox";

describe("<Checkbox />", () => {
    describe("Rendering", () => {
        it("renders an <input type='checkbox'>", () => {});
        it("renders the <label> when label prop is provided", () => {});
        it("does not render a <label> when label is omitted", () => {});
        it("renders the <CheckmarkIcon /> (always present in DOM, visibility toggled via class)", () => {});
    });

    describe("Checked state", () => {
        it("renders unchecked by default", () => {});
        it("renders checked when checked={true} (controlled)", () => {});
        it("reflects defaultChecked (uncontrolled)", () => {});
    });

    describe("Interaction", () => {
        it("calls onChange when clicked", () => {});
        it("does not fire onChange when disabled", () => {});
    });

    describe("Attribute pass-through", () => {
        it("forwards name, value, disabled, required props", () => {});
        it("forwards aria-* and data-* attributes", () => {});
    });

    describe("Accessibility", () => {
        it("lable htmlFor matches the input's id", () => {});
    });
});
