import type { ButtonHTMLAttributes, FC } from "react";
import classNames from "classnames";

type ButtonPrimaryProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  width?: "full" | "fit";
};

const ButtonPrimary: FC<ButtonPrimaryProps> = ({
  children,
  className,
  ...rest
}) => (
  <button
    className={classNames(
      "inline-flex py-150 px-250 gap-100 justify-center items-center rounded-full text-preset-4--medium bg-yellow-5 border border-neutral-9 shadow-[2px_2px_0_0_#2E1401] hover:shadow-[4px_4px_0_0_#2E1401] cursor-pointer transition-shadow duration-300 focus:shadow-[3px_3px_0_0_#5072C7] focus:outline-none text-neutral-9 disabled:opacity-50 disabled:cursor-not-allowed",
      { "w-full": rest.width === "full", "w-fit": rest.width === "fit" },
      className,
    )}
    {...rest}
  >
    {children}
  </button>
);

const ButtonSecondary: FC<ButtonPrimaryProps> = ({
  children,
  className,
  ...rest
}) => (
  <button
    className={classNames(
      "inline-flex py-150 px-250 gap-100 justify-center items-center rounded-full text-preset-4--medium bg-neutral-0 border border-neutral-9 shadow-[2px_2px_0_0_#2E1401] hover:shadow-[4px_4px_0_0_#2E1401] cursor-pointer transition-shadow duration-300 focus:shadow-[3px_3px_0_0_#5072C7] focus:outline-none text-neutral-9 disabled:opacity-50 disabled:cursor-not-allowed",
      { "w-full": rest.width === "full", "w-fit": rest.width === "fit" },
      className,
    )}
    {...rest}
  >
    {children}
  </button>
);

const ButtonBorder: FC<ButtonPrimaryProps> = ({
  children,
  className,
  ...rest
}) => (
  <button
    className={classNames(
      "inline-flex py-150 px-150 md:px-250 gap-100 justify-center items-center rounded-full text-preset-4--medium bg-neutral-0 hover:bg-neutral-1 border border-neutral-9 cursor-pointer transition-colors duration-300 focus:outline-2 focus:outline-offset-2 text-neutral-9 disabled:cursor-not-allowed",
      { "w-full": rest.width === "full", "w-fit": rest.width === "fit" },
      className,
    )}
    {...rest}
  >
    {children}
  </button>
);

const Button: FC<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "border";
    width?: "full" | "fit";
  }
> = ({ variant = "primary", width, children, ...rest }) => {
  if (variant === "primary") {
    return (
      <ButtonPrimary width={width} {...rest}>
        {children}
      </ButtonPrimary>
    );
  }

  if (variant === "secondary") {
    return (
      <ButtonSecondary width={width} {...rest}>
        {children}
      </ButtonSecondary>
    );
  }

  if (variant === "border") {
    return (
      <ButtonBorder width={width} {...rest}>
        {children}
      </ButtonBorder>
    );
  }

  // Add other variants (secondary, border) as needed
  return (
    <ButtonPrimary width={width} {...rest}>
      {children}
    </ButtonPrimary>
  ); // Default to primary for now
};

export default Button;
