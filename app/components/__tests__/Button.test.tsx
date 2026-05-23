import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Button from "../Button";

describe("<Button />", () => {
  describe("Rendering", () => {
    it("renders a <button> element with provided children", () => {
      render(<Button>Some text</Button>);

      const button = screen.getByRole("button");

      expect(button).toBeInTheDocument();
    });

    it("renders default primary variant when no variant prop is passed", () => {
      render(<Button>Some text</Button>);

      const button = screen.getByRole("button");

      expect(button).toHaveClass("bg-yellow-5");
    });

    it("renders secondary variant styling when variant='secondary'", () => {
      render(<Button variant="secondary">Some text</Button>);

      const button = screen.getByRole("button");

      expect(button).toHaveClass("bg-neutral-0");
    });

    it("renders border variant styling when variant='border'", () => {
      render(<Button variant="border">Some text</Button>);

      const button = screen.getByRole("button");

      expect(button).toHaveClass("hover:bg-neutral-1");
    });

    it("falls back to primary variant for an unknown/invalid variant value", () => {
      render(<Button variant={undefined}>Some text</Button>);

      const button = screen.getByRole("button");

      expect(button).toHaveClass("bg-yellow-5");
    });
  });

  describe("Width prop", () => {
    it("applies w-full class when width='full'", () => {
      render(<Button width="full">Some text</Button>);

      const button = screen.getByRole("button");

      expect(button).toHaveClass("w-full");
    });

    it("applies w-fit class when width='fit'", () => {
      render(<Button width="fit">Some text</Button>);

      const button = screen.getByRole("button");

      expect(button).toHaveClass("w-fit");
    });

    it("applies neither width class when width is omitted", () => {
      render(<Button>Some text</Button>);

      const button = screen.getByRole("button");

      expect(button).not.toHaveClass("w-fit");
      expect(button).not.toHaveClass("w-full");
    });
  });

  describe("className merging", () => {
    describe("Merges custom className prop with variant default classes", () => {
      const customClassName = "bg-purple-700";

      it("Primary variant", () => {
        render(
          <Button variant="primary" className={customClassName}>
            Some text
          </Button>,
        );

        const button = screen.getByRole("button");

        expect(button).toHaveClass("bg-yellow-5");
        expect(button).toHaveClass("bg-purple-700");
      });

      it("Secondary variant", () => {
        render(
          <Button variant="secondary" className={customClassName}>
            Some text
          </Button>,
        );

        const button = screen.getByRole("button");

        expect(button).toHaveClass("bg-neutral-0");
        expect(button).toHaveClass("bg-purple-700");
      });

      it("Border variant", () => {
        render(
          <Button variant="border" className={customClassName}>
            Some text
          </Button>,
        );

        const button = screen.getByRole("button");

        expect(button).toHaveClass("hover:bg-neutral-1");
        expect(button).toHaveClass("bg-purple-700");
      });
    });
  });

  describe("Native button attribute pass-through", () => {
    it("Forwards type attribute (e.g. type='submit)'", () => {
      render(<Button type="submit">Some text</Button>);

      const button = screen.getByRole("button");

      expect(button).toHaveAttribute("type", "submit");
    });

    it("forwards aria-* and data-* attributes", () => {
      const labelValue = "Some text";
      const dataValue = "123";

      render(
        <Button aria-label={labelValue} data-test={dataValue}>
          Some text
        </Button>,
      );

      const button = screen.getByRole("button");

      expect(button).toHaveAttribute("aria-label", labelValue);
      expect(button).toHaveAttribute("data-test", dataValue);
    });

    it("forwards id, name, form attributes", () => {
      const idValue = "button-id";
      const nameValue = "button-name";
      const formValue = "form-id";

      render(
        <Button id={idValue} name={nameValue} form={formValue}>
          Some text
        </Button>,
      );

      const button = screen.getByRole("button");

      expect(button).toHaveAttribute("id", idValue);
      expect(button).toHaveAttribute("name", nameValue);
      expect(button).toHaveAttribute("form", formValue);
    });
  });

  describe("Disabled state", () => {
    describe("Applies disabled attribute when disabled prop is true (each variant)", () => {
      it("Primary variant", () => {
        render(<Button disabled>Some text</Button>);
        const button = screen.getByRole("button");
        expect(button).toBeDisabled();
      });

      it("Secondary variant", () => {
        render(
          <Button variant="secondary" disabled>
            Some text
          </Button>,
        );
        const button = screen.getByRole("button");
        expect(button).toBeDisabled();
      });

      it("Border variant", () => {
        render(
          <Button variant="border" disabled>
            Some text
          </Button>,
        );
        const button = screen.getByRole("button");
        expect(button).toBeDisabled();
      });
    });
    it("does not fire onClick when disabled", () => {
      const onClickMock = jest.fn();

      render(
        <Button disabled onClick={onClickMock}>
          Some text
        </Button>,
      );

      const button = screen.getByRole("button");

      button.click();

      expect(onClickMock).not.toHaveBeenCalled();
    });
  });

  describe("Interaction", () => {
    describe("Calls onClick handler when click (each variant)", () => {
      it("Primary variant", () => {
        const onClickMock = jest.fn();
        render(<Button onClick={onClickMock}>Some text</Button>);
        const button = screen.getByRole("button");
        button.click();
        expect(onClickMock).toHaveBeenCalledTimes(1);
      });

      it("Secondary variant", () => {
        const onClickMock = jest.fn();
        render(
          <Button variant="secondary" onClick={onClickMock}>
            Some text
          </Button>,
        );
        const button = screen.getByRole("button");
        button.click();
        expect(onClickMock).toHaveBeenCalledTimes(1);
      });

      it("Border variant", () => {
        const onClickMock = jest.fn();
        render(
          <Button variant="border" onClick={onClickMock}>
            Some text
          </Button>,
        );
        const button = screen.getByRole("button");
        button.click();
        expect(onClickMock).toHaveBeenCalledTimes(1);
      });
    });

    it("dones not call onClick when not clicked", () => {
      const onClickMock = jest.fn();

      render(<Button onClick={onClickMock}>Some text</Button>);

      expect(onClickMock).not.toHaveBeenCalled();
    });
  });
});
