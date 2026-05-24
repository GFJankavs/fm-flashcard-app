import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import DropdownItem from "../DropdownItem";

describe("<DropdownItem/>", () => {
  describe("Rendering", () => {
    it("Renders the children text content", () => {
      const textContent = "Test Dropdown Item";
      render(<DropdownItem>{textContent}</DropdownItem>);
      const item = screen.getByText(textContent);
      expect(item).toBeInTheDocument();
    });
    it("Renders icon component when icon prop is provided", () => {
      const TestIcon = () => <svg data-testid="test-icon" />;
      render(<DropdownItem icon={TestIcon}>Item with Icon</DropdownItem>);
      const icon = screen.getByTestId("test-icon");
      expect(icon).toBeInTheDocument();
    });
    it("Does NOT render an icon when icon is omitted", () => {
      render(<DropdownItem>Item without Icon</DropdownItem>);
      const icon = screen.queryByTestId("test-icon");
      expect(icon).not.toBeInTheDocument();
    });
    it("Renders a Checkbox when withCheckbox is true", () => {
      render(<DropdownItem withCheckbox>Item with Checkbox</DropdownItem>);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeInTheDocument();
    });
    it("Does NOT render a checkbox when withCheckbox is false/undefined", () => {
      render(<DropdownItem>Item without Checkbox</DropdownItem>);
      const checkbox = screen.queryByRole("checkbox");
      expect(checkbox).not.toBeInTheDocument();
    });
  });

  describe("Checked prop forwarding", () => {
    it("Forwards checked={true} to the inner Checkbox", () => {
      render(
        <DropdownItem withCheckbox checked={true}>
          Checked Item
        </DropdownItem>,
      );
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeChecked();
    });
    it("Forwards checked={false} to the inner Checkbox", () => {
      render(
        <DropdownItem withCheckbox checked={false}>
          Unchecked Item
        </DropdownItem>,
      );
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).not.toBeChecked();
    });
  });

  describe("Interaction", () => {
    it("Calls onClick when the item container is clicked", () => {
      const handleClick = jest.fn();
      render(<DropdownItem onClick={handleClick}>Clickable Item</DropdownItem>);
      const item = screen.getByText("Clickable Item");
      item.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
    it("Does not throw when clicked without an onClick prop", () => {
      render(<DropdownItem>Non-clickable Item</DropdownItem>);
      const item = screen.getByText("Non-clickable Item");
      expect(() => item.click()).not.toThrow();
    });
  });
});
