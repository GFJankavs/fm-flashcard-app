import classNames from "classnames";
import { FC, InputHTMLAttributes } from "react";
import ErrorIcon from "./icons/ErrorIcon";

const Input: FC<
  InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }
> = ({ id, label, error, ...rest }) => (
  <div className="grid gap-100">
    <label htmlFor={id} className="text-preset-4--medium text-neutral-9">
      {label}
    </label>
    <input
      id={id}
      className={classNames(
        "p-200 rounded-6 transition-all border border-neutral-9 bg-neutral-0 text-preset-4--regular w-full max-w-[400px] hover:shadow-[2px_2px_0_0_#2E1401] focus:shadow-[2px_2px_0_0_#5072C7] focus:outline-none focus:border-blue-6",
        {
          "border-pink-7 focus:border-pink-7 shadow-[2px_2px_0_0_#E11966] hover:shadow-[2px_2px_0_0_#E11966] focus:shadow-[2px_2px_0_0_#E11966]":
            !!error,
        },
      )}
      {...rest}
    />
    {error && (
      <div className="flex items-center gap-75">
        <ErrorIcon />
        <p className="text-preset-5--regular text-pink-7">{error}</p>
      </div>
    )}
  </div>
);

export default Input;
