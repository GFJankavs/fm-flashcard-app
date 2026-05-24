import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("<TextArea/>", () => {
    describe("Rendering", () => {
        it("Renders the <label> with the provided label text", () => {});
        it("Label's htmlFor matches the textarea's id", () => {});
        it("Renders a <textarea> element", () => {});
    });

    describe("Error state", () => {
        it("Does NOT render error message or ErrorIcon when error is omitted", () => {});
        it("Renders error message text when error is provided", () => {});
        it("Renders ErrorIcon when error is provided", () => {});
        it("Applies error styling class (border-pink-7) when error is provided", () => {});
    });

    describe("Attribute pass-through", () => {
        it("Forwards value, defaultValue, placeholder, name, disabled, required, rows, maxLength", () => {});
        it("Forwards aria-* attributes", () => {});
    });

    describe("Interaction", () => {
        it("Calls onChange when the user types", () => {});
        it("Calls onFocus/onBlur handlers", () => {});
    });
});
