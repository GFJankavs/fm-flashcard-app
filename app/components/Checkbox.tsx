import { FC, InputHTMLAttributes } from "react";
import CheckmarkIcon from "./icons/CheckmarkIcon";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement>;

const Checkbox: FC<CheckboxProps> = ({ ...rest }) => (
  <div className="inline-flex items-center gap-100">
    <div className="group flex items-center cursor-pointer relative">
      <input
        type="checkbox"
        className="peer h-4 w-4 cursor-pointer transition-shadow appearance-none rounded-4 group-hover:shadow-[1px_1px_0_0_#2E1401] focus:outline-2 focus:outline-offset-2 focus:outline-blue-6 bg-neutral-0 border border-neutral-9 checked:bg-yellow-5"
        id="check-custom-style"
        {...rest}
      />
      <span className="absolute text-neutral-9 opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <CheckmarkIcon />
      </span>
    </div>
    <label
      htmlFor="check-custom-style"
      className="select-none text-preset-4--medium text-neutral-9 cursor-pointer"
    >
      Hide Mastered
    </label>
  </div>
);

export default Checkbox;
