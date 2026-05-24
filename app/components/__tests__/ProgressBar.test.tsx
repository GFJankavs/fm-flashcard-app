import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("<ProgressBar/>", () => {
    describe("Rendering", () => {
        it("Renders the outer track and inner fill elements", () => {});
        it("Inline style.width equals '{progress}%'", () => {});
        it("progress={0} renders width: 0%", () => {});
        it("progress={100} renders width: 100%", () => {});
        it("Mid-range value (e.g. 50) renders width: 50%", () => {});
    });
});
