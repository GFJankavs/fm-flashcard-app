import Checkbox from "./Checkbox";
import { FC, ReactNode, SVGAttributes } from "react";

const DropdownItem = ({
  checked,
  withCheckbox,
  icon: Icon,
  children,
  onClick,
}: {
  withCheckbox?: boolean;
  checked?: boolean;
  icon?: FC<SVGAttributes<SVGSVGElement>>;
  children: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      className="flex items-center px-200 py-100 gap-100 cursor-pointer hover:bg-neutral-1 w-full"
      onClick={onClick}
      aria-selected={checked}
      role="option"
    >
      {Icon && <Icon />}
      {withCheckbox && <Checkbox checked={checked} onChange={() => {}} />}
      <span className="text-preset-5 text-neutral-9">{children}</span>
    </div>
  );
};

export default DropdownItem;
