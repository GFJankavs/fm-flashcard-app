import DropdownItem from "@/app/components/DropdownItem";
import DotsIcon from "@/app/components/icons/DotsIcon";
import EditIcon from "@/app/components/icons/EditIcon";
import TrashIcon from "@/app/components/icons/TrashIcon";
import ProgressBar from "@/app/components/ProgressBar";
import { useEffect, useRef, useState } from "react";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

const MenuButton = () => {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="relative" ref={wrapperRef}>
                <button
                    title="Dots Menu"
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="rounded-4 flex items-center justify-center h-6 w-6 cursor-pointer hover:bg-neutral-0 border border-transparent hover:border-neutral-9 hover:shadow-[2px_2px_0_0_#2E1401] transition-all duration-300"
                >
                    <DotsIcon />
                </button>
                {dropdownOpen && (
                    <div className="absolute top-7 right-0 rounded-8 border border-neutral-9 bg-neutral-0 shadow-[0_3px_8px_0_#2E1401] overflow-hidden w-[140px]">
                        <div className="w-full">
                            <DropdownItem
                                icon={EditIcon}
                                onClick={() => setEditModalOpen(true)}
                            >
                                Edit
                            </DropdownItem>
                        </div>
                        <div>
                            <DropdownItem
                                icon={TrashIcon}
                                onClick={() => setDeleteModalOpen(true)}
                            >
                                Delete
                            </DropdownItem>
                        </div>
                    </div>
                )}
            </div>

            <EditModal
                isOpen={editModalOpen}
                onModalClose={() => setEditModalOpen(false)}
            />
            <DeleteModal
                isOpen={deleteModalOpen}
                onModalClose={() => setDeleteModalOpen(false)}
            />
        </>
    );
};

const Flashcard = () => {
    return (
        <article className="flex flex-col rounded-16 border-t border-l border-r-[3px] border-b-[3px] border-neutral-9 w-full h-[238px]">
            <div className="p-200">
                <h2 className="text-preset-3">What does HTML stand for?</h2>
            </div>
            <div
                id="answer"
                className="flex flex-col flex-1 p-200 border-y border-neutral-9 text-neutral-9"
            >
                <h5 className="text-preset-5 opacity-60">Answer:</h5>
                <p className="text-preset-5">HyperText Markup Language</p>
            </div>
            <div className="px-200 grid grid-cols-[1fr_1fr_24px] gap-100">
                <div className="flex items-center pr-125 py-3.5 border-r border-neutral-9">
                    <span className="text-nowrap text-preset-6 py-75 px-150 rounded-full border border-neutral-9 bg-neutral-0 shadow-[1px_1px_0_0_#2E1401]">
                        Web Development
                    </span>
                </div>
                <div className="flex items-center gap-2 border-r border-neutral-9 w-full max-w-43.5">
                    <ProgressBar progress={40} />
                    <span>2/5</span>
                </div>
                <div className="flex justify-center items-center w-full">
                    <MenuButton />
                </div>
            </div>
        </article>
    );
};

export default Flashcard;
