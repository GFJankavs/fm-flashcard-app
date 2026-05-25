import Button from "@/app/components/Button";
import Checkbox from "@/app/components/Checkbox";
import Dropdown from "@/app/components/Dropdown";
import ShuffleIcon from "@/app/components/icons/ShuffleIcon";
import Flashcard from "./Flashcard";
import NewFlashcardForm from "./NewFlashcardForm";
import useFlashcardStore from "@/app/store/flashcard";
import { getCategoryOptions, notify } from "@/app/utils";
import { useMemo, useState } from "react";
import { MASTERED_COUNT } from "@/app/constants";
import { FlashCard } from "@/app/types";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { ToastContainer } from "react-toastify";

const AllTab = () => {
    const { cards, shuffleCards, removeCard, editCard, addCard } =
        useFlashcardStore();
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [hideMastered, setHideMastered] = useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [cardToEdit, setCardToEdit] = useState<FlashCard | null>(null);

    const categoryDropdownOptions = useMemo(
        () => getCategoryOptions(cards),
        [cards],
    );

    const availableCards = useMemo(() => {
        let visibleCards = [...cards];

        if (selectedCategories.length > 0) {
            visibleCards = visibleCards.filter((card) =>
                selectedCategories.includes(card.category),
            );
        }

        if (hideMastered) {
            visibleCards = visibleCards.filter(
                (card) => card.knownCount !== MASTERED_COUNT,
            );
        }

        return visibleCards;
    }, [cards, hideMastered, selectedCategories]);

    const handleOptionSelect = (label: string) => {
        if (selectedCategories.includes(label)) {
            const idToRemove = selectedCategories.findIndex(
                (category) => category === label,
            );
            const newCategories = [...selectedCategories];
            newCategories.splice(idToRemove, 1);
            setSelectedCategories(newCategories);
        } else {
            const updatedCategories = [...selectedCategories, label];
            setSelectedCategories(updatedCategories);
        }
    };

    return (
        <>
            <div className="grid gap-300">
                <NewFlashcardForm onCardAdd={addCard} />
                <div className="flex justify-between pt-200">
                    <div className="flex flex-col md:flex-row gap-125">
                        <Dropdown
                            label="All Categories"
                            options={categoryDropdownOptions}
                            selectedOptions={selectedCategories}
                            onOptionSelect={handleOptionSelect}
                        />
                        <Checkbox
                            label="Hide Mastered"
                            checked={hideMastered}
                            onChange={() => setHideMastered((prev) => !prev)}
                        />
                    </div>
                    <div>
                        <Button variant="secondary" onClick={shuffleCards}>
                            <ShuffleIcon />
                            <span>Shuffle</span>
                        </Button>
                    </div>
                </div>
                <div className="grid gap-300 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {availableCards.map((card) => (
                        <Flashcard
                            key={card.id}
                            card={card}
                            onCardEdit={() => {
                                setEditModalOpen(true);
                                setCardToEdit(card);
                            }}
                            onCardDelete={() => {
                                setDeleteModalOpen(true);
                                setCardToEdit(card);
                            }}
                        />
                    ))}
                </div>
            </div>

            <ToastContainer />
            {cardToEdit && (
                <EditModal
                    onCardEdit={(data) => {
                        if (!cardToEdit) return;
                        editCard(cardToEdit.id, data);
                        setEditModalOpen(false);
                        setCardToEdit(null);
                        notify("Card updated successfully.");
                    }}
                    card={cardToEdit}
                    isOpen={editModalOpen}
                    onModalClose={() => {
                        setEditModalOpen(false);
                        setCardToEdit(null);
                    }}
                />
            )}

            <DeleteModal
                onCardDelete={() => {
                    if (!cardToEdit) return;
                    removeCard(cardToEdit.id);
                    setDeleteModalOpen(false);
                    setCardToEdit(null);
                    notify("Card deleted.");
                }}
                isOpen={deleteModalOpen}
                onModalClose={() => {
                    setDeleteModalOpen(false);
                    setCardToEdit(null);
                }}
            />
        </>
    );
};

export default AllTab;
