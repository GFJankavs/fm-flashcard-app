import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("<DropdownItem/>", () => {
    describe("Rendering", () => {
        it("Renders the children text content", () => {});
        it("Renders icon component when icon prop is provided", () => {});
        it("Does NOT render an icon when icon is omitted", () => {});
        it("Renders a Checkbox when withCheckbox is true", () => {});
        it("Does NOT render a checkbox when withCheckbox is false/undefined", () => {});
    });

    describe("Checked prop forwarding", () => {
        it("Forwards checked={true} to the inner Checkbox", () => {});
        it("Forwards checked={false} to the inner Checkbox", () => {});
    });

    describe("Interaction", () => {
        it("Calls onClick when the item container is clicked", () => {});
        it("Does not throw when clicked without an onClick prop", () => {});
    });
});
