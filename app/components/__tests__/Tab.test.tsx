import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("<Tab/>", () => {
    describe("Rendering", () => {
        it("Renders two tab buttons: 'Study Mode' and 'All Cards'", () => {});
    });

    describe("Active state", () => {
        it('"Study Mode" has active styling when mode="study"', () => {});
        it('"All Cards" has inactive styling when mode="study"', () => {});
        it('"All Cards" has active styling when mode="all"', () => {});
        it('"Study Mode" has inactive styling when mode="all"', () => {});
    });

    describe("Interaction", () => {
        it("Clicking 'Study Mode' calls onTabClick('study')", () => {});
        it("Clicking 'All Cards' calls onTabClick('all')'", () => {});
        it("Clicking the already-active tab still fires onTabClick with its own mode", () => {});
    });
});
