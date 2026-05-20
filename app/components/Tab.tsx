import classNames from "classnames";
import type { ButtonHTMLAttributes, FC } from "react";
import { TabMode } from "../types";

const TabButton: FC<
    ButtonHTMLAttributes<HTMLButtonElement> & { isActive: boolean }
> = ({ children, isActive, ...rest }) => (
    <button
        className={classNames(
            "text-preset-4--semibold cursor-pointer rounded-full py-150 px-200 focus:outline-2 focus:outline-offset-2",
            {
                "bg-yellow-5 border border-neutral-9": isActive,
                "bg-neutral-0 border border-transparent hover:border-neutral-9":
                    !isActive,
            },
        )}
        {...rest}
    >
        {children}
    </button>
);

const Tab = ({
    mode,
    onTabClick,
}: {
    mode: TabMode;
    onTabClick: (mode: TabMode) => void;
}) => {
    return (
        <div className="flex items-center justify-center w-fit gap-1 p-50 rounded-full border border-neutral-9 bg-neutral-0 shadow-[1px_2px_0_0_#2E1401]">
            <TabButton
                isActive={mode === "study"}
                onClick={() => onTabClick("study")}
            >
                Study Mode
            </TabButton>
            <TabButton
                isActive={mode === "all"}
                onClick={() => onTabClick("all")}
            >
                All Cards
            </TabButton>
        </div>
    );
};

export default Tab;
