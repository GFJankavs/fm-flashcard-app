import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProgressBar from "../ProgressBar";

describe("<ProgressBar/>", () => {
  describe("Rendering", () => {
    it("Renders the outer track and inner fill elements", () => {
      render(<ProgressBar progress={50} />);
      const track = screen.getByTestId("progress-bar-track");
      const fill = screen.getByTestId("progress-bar-fill");
      expect(track).toBeInTheDocument();
      expect(fill).toBeInTheDocument();
    });
    it("Inline style.width equals '{progress}%'", () => {
      render(<ProgressBar progress={50} />);
      const fill = screen.getByTestId("progress-bar-fill");
      expect(fill).toHaveStyle("width: 50%");
    });
    it("progress={0} renders width: 0%", () => {
      render(<ProgressBar progress={0} />);
      const fill = screen.getByTestId("progress-bar-fill");
      expect(fill).toHaveStyle("width: 0%");
    });
    it("progress={100} renders width: 100%", () => {
      render(<ProgressBar progress={100} />);
      const fill = screen.getByTestId("progress-bar-fill");
      expect(fill).toHaveStyle("width: 100%");
    });
    it("Mid-range value (e.g. 50) renders width: 50%", () => {
      render(<ProgressBar progress={50} />);
      const fill = screen.getByTestId("progress-bar-fill");
      expect(fill).toHaveStyle("width: 50%");
    });
  });
});
