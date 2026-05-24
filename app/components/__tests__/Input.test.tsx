import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Input from "../Input";

describe("<Input />", () => {
  describe("Rendering", () => {
    it("Renders the <label> with the provided label text", () => {
      const labelText = "Test Input Label";
      render(<Input label={labelText} />);
      const label = screen.getByText(labelText);
      expect(label).toBeInTheDocument();
    });
    it("Label's htmlFor matches the input's id", () => {
      const inputId = "test-input-id";
      render(<Input label="Test Label" id={inputId} />);
      const label = screen.getByText("Test Label");
      const input = screen.getByRole("textbox");
      expect(label).toHaveAttribute("for", inputId);
      expect(input).toHaveAttribute("id", inputId);
    });
    it("Renders an <input> element", () => {
      render(<Input label="Some label" />);
      const input = screen.getByRole("textbox");
      expect(input).toBeInTheDocument();
    });
  });

  describe("Error state", () => {
    it("Does NOT render the error message or ErrorIcon when error is omitted", () => {
      render(<Input label="Test Label" />);
      const errorMessage = screen.queryByRole("alert");
      const errorIcon = screen.queryByTestId("error-icon");
      expect(errorMessage).not.toBeInTheDocument();
      expect(errorIcon).not.toBeInTheDocument();
    });
    it("Renders the error message text when error is provided", () => {
      const errorText = "This is an error message";
      render(<Input label="Test Label" error={errorText} />);
      const errorMessage = screen.getByRole("alert");
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent(errorText);
    });
    it("Renders the ErrorIcon when error is provided", () => {
      render(<Input label="Test Label" error="Error text" />);
      const errorIcon = screen.getByTestId("error-icon");
      expect(errorIcon).toBeInTheDocument();
    });
    it("Applies the error styling class (border-pink-7) when error is provided", () => {
      render(<Input label="Test Label" error="Error text" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("border-pink-7");
    });
    it("Does NOT apply error styling when error is empty string", () => {
      render(<Input label="Test Label" error="" />);
      const input = screen.getByRole("textbox");
      expect(input).not.toHaveClass("border-pink-7");
    });
  });

  describe("Attribute pass-through", () => {
    it("Forwards value, defaultValue, placeholder, type, name, disabled, required", () => {
      render(
        <Input
          label="Test Label"
          value="Test Value"
          placeholder="Enter text"
          type="email"
          name="test-input"
          disabled
          required
        />,
      );
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("value", "Test Value");
      expect(input).toHaveAttribute("placeholder", "Enter text");
      expect(input).toHaveAttribute("type", "email");
      expect(input).toHaveAttribute("name", "test-input");
      expect(input).toBeDisabled();
      expect(input).toBeRequired();
    });
    it("Forwards aria-* attributes", () => {
      render(
        <Input
          label="Test Label"
          aria-label="Custom Aria Label"
          aria-required="true"
        />,
      );
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-label", "Custom Aria Label");
      expect(input).toHaveAttribute("aria-required", "true");
    });
  });

  describe("Interaction", () => {
    it("Calls onChange when the user types", async () => {
      const handleChange = jest.fn();
      render(<Input label="Test Label" onChange={handleChange} />);

      const input = screen.getByRole("textbox");
      input.focus();
      await userEvent.type(input, "New value");

      expect(handleChange).toHaveBeenCalled();
    });
    it("Calls onFocus/onBlur handlers", () => {
      const handleFocus = jest.fn();
      const handleBlur = jest.fn();
      render(
        <Input label="Test Label" onFocus={handleFocus} onBlur={handleBlur} />,
      );

      const input = screen.getByRole("textbox");
      input.focus();
      expect(handleFocus).toHaveBeenCalled();
      input.blur();
      expect(handleBlur).toHaveBeenCalled();
    });
  });
});
