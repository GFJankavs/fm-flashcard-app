import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Checkbox from "../Checkbox";

describe("<Checkbox />", () => {
  describe("Rendering", () => {
    it("renders an <input type='checkbox'>", () => {
      render(<Checkbox />);

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute("type", "checkbox");
    });
    it("renders the <label> when label prop is provided", () => {
      const labelText = "Test Label";
      render(<Checkbox label={labelText} />);

      const label = screen.getByText(labelText);

      expect(label).toBeInTheDocument();
    });
    it("does not render a <label> when label is omitted", () => {
      render(<Checkbox />);
      const label = screen.queryByRole("label");
      expect(label).not.toBeInTheDocument();
    });
    it("renders the <CheckmarkIcon /> (always present in DOM, visibility toggled via class)", () => {
      render(<Checkbox />);
      const checkmarkIcon = screen.getByTestId("checkmark-icon");
      expect(checkmarkIcon).toBeInTheDocument();
    });
  });

  describe("Checked state", () => {
    it("renders unchecked by default", () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).not.toBeChecked();
    });
    it("renders checked when checked={true} (controlled)", () => {
      render(<Checkbox checked={true} onChange={() => {}} />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeChecked();
    });
    it("reflects defaultChecked (uncontrolled)", () => {
      render(<Checkbox defaultChecked={true} />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeChecked();
    });
  });

  describe("Interaction", () => {
    it("calls onChange when clicked", () => {
      const handleChange = jest.fn();
      render(<Checkbox onChange={handleChange} />);

      const checkbox = screen.getByRole("checkbox");
      checkbox.click();

      expect(handleChange).toHaveBeenCalledTimes(1);
    });
    it("does not fire onChange when disabled", () => {
      const handleChange = jest.fn();

      render(<Checkbox onChange={handleChange} disabled={true} />);

      const checkbox = screen.getByRole("checkbox");
      checkbox.click();

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("Attribute pass-through", () => {
    it("forwards name, value, disabled, required props", () => {
      render(
        <Checkbox name="test-checkbox" value="test-value" disabled required />,
      );

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toHaveAttribute("name", "test-checkbox");
      expect(checkbox).toHaveAttribute("value", "test-value");
      expect(checkbox).toBeDisabled();
      expect(checkbox).toBeRequired();
    });
    it("forwards aria-* and data-* attributes", () => {
      render(
        <Checkbox aria-label="Test Checkbox" data-testid="custom-checkbox" />,
      );

      const checkbox = screen.getByTestId("custom-checkbox");

      expect(checkbox).toHaveAttribute("aria-label", "Test Checkbox");
      expect(checkbox).toHaveAttribute("data-testid", "custom-checkbox");
    });
  });

  describe("Accessibility", () => {
    it("lable htmlFor matches the input's id", () => {
      const id = "test-checkbox";
      render(<Checkbox id={id} label="Test Label" />);

      const checkbox = screen.getByRole("checkbox");
      const label = screen.getByText("Test Label");
      expect(checkbox).toHaveAttribute("id", id);
      expect(label).toHaveAttribute("for", id);
    });
  });
});
