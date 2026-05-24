import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MasteredTag from "../MasteredTag";

describe("<MasteredTag/>", () => {
  describe("Rendering", () => {
    it("Renders the static 'Mastered' label", () => {
      render(<MasteredTag count={5} />);
      const label = screen.getByText("Mastered");
      expect(label).toBeInTheDocument();
    });
    it("Renders the BrainSolidIcon", () => {
      render(<MasteredTag count={5} />);
      const icon = screen.getByTestId("brain-solid-icon");
      expect(icon).toBeInTheDocument();
    });
    it("Renders count/MASTERED_COUNT format using the constant", () => {
      render(<MasteredTag count={3} />);
      const countText = screen.getByText("3/5");
      expect(countText).toBeInTheDocument();
    });
    it("Renders 0/MASTERED_COUNT for count={0}", () => {
      render(<MasteredTag count={0} />);
      const countText = screen.getByText("0/5");
      expect(countText).toBeInTheDocument();
    });
  });
});
