import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import DropdownItem from "./DropdownItem";
import AngleDownIcon from "./icons/AngleDownIcon";
import { CategoryDropdownOption } from "../types";

const Dropdown = ({
    label,
    selectedOptions,
    options,
    onOptionSelect,
}: {
    label: string;
    selectedOptions: string[];
    options: CategoryDropdownOption[];
    onOptionSelect: (label: string) => void;
}) => {
    const [open, setOpen] = useState<boolean>(false);
    const dropdownWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (
                dropdownWrapperRef.current &&
                !dropdownWrapperRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownWrapperRef}>
            <Button
                variant="secondary"
                className="flex items-center gap-100"
                onClick={() => setOpen(!open)}
            >
                <span className="text-preset-4--medium">{label}</span>
                <AngleDownIcon />
            </Button>
            {open && (
                <div className="absolute z-50 top-13 left-0 rounded-8 border border-neutral-9 bg-neutral-0 shadow-[0_3px_8px_0_#2E1401] w-65 overflow-hidden">
                    <div>
                        {options.map((option) => (
                            <DropdownItem
                                key={option.id}
                                withCheckbox
                                checked={selectedOptions.includes(option.label)}
                                onClick={() => onOptionSelect(option.label)}
                            >
                                {`${option.label} (${option.count})`}
                            </DropdownItem>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
