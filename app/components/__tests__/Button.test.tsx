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
    });
});
