import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("<Input />", () => {
    describe("Rendering", () => {
        it("Renders the <label> with the provided label text", () => {});
        it("Label's htmlFor matches the input's id", () => {});
        it("Renders an <input> element", () => {});
    });

    describe("Error state", () => {
        it("Does NOT render the error message or ErrorIcon when error is omitted", () => {});
        it("Renders the error message text when error is provided", () => {});
        it("Renders the ErrorIcon when error is provided", () => {});
        it("Applies the error styling class (border-pink-7) when error is provided", () => {});
        it("Does NOT apply error styling when error is empty string", () => {});
    });

    describe("Attribute pass-through", () => {
        it("Forwards value, defaultValue, placeholder, type, name, disabled, required", () => {});
        it("Forwards aria-* attributes", () => {});
    });

    describe("Interaction", () => {
        it("Calls onChange when the user types", () => {});
        it("Calls onFocus/onBlur handlers", () => {});
    });
});
