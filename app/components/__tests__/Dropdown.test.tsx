import "@testing-library/jest-dom";
import { render, screen,  } from "@testing-library/react";

describe("<Dropdown />", () => {
    describe("Rendering", () => {
        it("renders the trigger button with the provided label", () => {});
        it("renders the angle-down icon in the trigger", () => {});
        it("options panel is NOT in the DOM on initial render (closed by default)", () => {});
    });

    describe("Open/close behavior", () => {
        it("clicking the trigger button opens the panel", () => {});
        it("clicking the trigger button again closes the panel", () => {});
        it("clicking outside the dropdown closes the panel", () => {});
        it("clicking inside the panem (on an option) does NOT close it", () => {});
        it("removes the click document listener on unmount", () => {});
    });

    describe("Options rendering", () => {
        it("renders one DropdownItem per entry in options", () => {});
        it("renders empty panel when options is []", () => {});
        it("each item displays text as '{label} ({count})'", () => {});
        it("each item receives a checked prop matching selectedOptions.includes(option.label)", () => {});
    });

    describe("Selection", () => {
        it("calls onOptionSelect with option's label when an item is clicked", () => {});
        it("multiple selected options all render as checked", () => {});
    });
});