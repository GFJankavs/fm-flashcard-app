import DropdownItem from "@/app/components/DropdownItem";
import DotsIcon from "@/app/components/icons/DotsIcon";
import EditIcon from "@/app/components/icons/EditIcon";
import TrashIcon from "@/app/components/icons/TrashIcon";
import ProgressBar from "@/app/components/ProgressBar";
import { useEffect, useRef, useState } from "react";
import { FlashCard } from "@/app/types";
import { MASTERED_COUNT } from "@/app/constants";
import MasteredTag from "@/app/components/MasteredTag";

const MenuButton = ({
    onDelete,
    onEdit,
}: {
    onEdit: () => void;
    onDelete: () => void;
}) => {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

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
        <div className="relative" ref={wrapperRef}>
            <button
                title="Dots Menu"
                type="button"
                role="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="rounded-4 flex items-center justify-center h-6 w-6 cursor-pointer hover:bg-neutral-0 border border-transparent hover:border-neutral-9 hover:shadow-[2px_2px_0_0_#2E1401] transition-all duration-300"
            >
                <DotsIcon />
            </button>
            {dropdownOpen && (
                <div
                    role="menu"
                    className="absolute top-7 right-0 rounded-8 border border-neutral-9 bg-neutral-0 shadow-[0_3px_8px_0_#2E1401] overflow-hidden w-[140px]"
                >
                    <div className="w-full">
                        <DropdownItem
                            icon={EditIcon}
                            onClick={() => {
                                onEdit();
                                setDropdownOpen(false);
                            }}
                        >
                            Edit
                        </DropdownItem>
                    </div>
                    <div>
                        <DropdownItem
                            icon={TrashIcon}
                            onClick={() => {
                                onDelete();
                                setDropdownOpen(false);
                            }}
                        >
                            Delete
                        </DropdownItem>
                    </div>
                </div>
            )}
        </div>
    );
};

const Flashcard = ({
    card,
    onCardDelete,
    onCardEdit,
}: {
    card: FlashCard;
    onCardEdit: () => void;
    onCardDelete: () => void;
}) => {
    const currentProgress = (card.knownCount / MASTERED_COUNT) * 100;
    const isMastered = card.knownCount === MASTERED_COUNT;

    return (
        <article
            role="listitem"
            className="flex flex-col rounded-16 border-t border-l border-r-[3px] border-b-[3px] border-neutral-9 w-full h-[238px]"
        >
            <div className="p-200">
                <h2 className="text-preset-3">{card.question}</h2>
            </div>
            <div
                id="answer"
                className="flex flex-col flex-1 overflow-scroll p-200 border-y border-neutral-9 text-neutral-9"
            >
                <h5 className="text-preset-5 opacity-60">Answer:</h5>
                <p className="text-preset-5">{card.answer}</p>
            </div>
            <div className="px-200 grid grid-cols-[1fr_1fr_24px] gap-100 h-14">
                <div className="flex items-center pr-125 py-3.5 border-r border-neutral-9">
                    <span className="text-nowrap text-preset-6 py-75 px-150 rounded-full border border-neutral-9 bg-neutral-0 shadow-[1px_1px_0_0_#2E1401]">
                        {card.category}
                    </span>
                </div>
                <div className="flex items-center gap-2 border-r border-neutral-9 w-full max-w-43.5">
                    {isMastered ? (
                        <MasteredTag count={card.knownCount} />
                    ) : (
                        <>
                            <ProgressBar progress={currentProgress} />
                            <span>{`${card.knownCount}/5`}</span>
                        </>
                    )}
                </div>
                <div className="flex justify-center items-center w-full">
                    <MenuButton onEdit={onCardEdit} onDelete={onCardDelete} />
                </div>
            </div>
        </article>
    );
};

export default Flashcard;
