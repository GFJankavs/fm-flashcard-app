import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import DropdownItem from "./DropdownItem";
import AngleDownIcon from "./icons/AngleDownIcon";

const Dropdown = ({ label }: { label: string }) => {
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
                        <DropdownItem withCheckbox>Art (1)</DropdownItem>
                        <DropdownItem withCheckbox>Art (1)</DropdownItem>
                        <DropdownItem withCheckbox>Art (1)</DropdownItem>
                        <DropdownItem withCheckbox>Art (1)</DropdownItem>
                        <DropdownItem withCheckbox>Art (1)</DropdownItem>
                        <DropdownItem withCheckbox>Art (1)</DropdownItem>
                        <DropdownItem withCheckbox>Art (1)</DropdownItem>
                        <DropdownItem withCheckbox>Art (1)</DropdownItem>
                        <DropdownItem withCheckbox>Art (1)</DropdownItem>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
