import { create } from "zustand";
import cardData from "./data.json";
import { FlashCard, FormInputs } from "../types";
import { shuffleArray } from "../utils";

type FlashcardStore = {
    cards: FlashCard[];
    removeCard: (id: string) => void;
    addCard: (card: FlashCard) => void;
    editCard: (id: string, payload: FormInputs) => void;
    shuffleCards: () => void;
    resetProgress: (id: string) => void;
    updateProgress: (id: string) => void;
};

const useFlashcardStore = create<FlashcardStore>()((set) => ({
    cards: cardData.flashcards as FlashCard[],
    addCard: (card) =>
        set((state) => {
            const newCards = [...state.cards];
            newCards.push(card);
            return {
                cards: newCards,
            };
        }),
    removeCard: (id) =>
        set((state) => {
            const cardsToRemove = [...state.cards];
            const filteredCards = cardsToRemove.filter(
                (card) => card.id !== id,
            );
            return {
                cards: filteredCards,
            };
        }),
    editCard: (id, payload) =>
        set((state) => {
            const updatedCards = [...state.cards];
            const existingCardId = updatedCards.findIndex(
                (card) => card.id === id,
            );

            if (existingCardId === -1) return state;

            updatedCards[existingCardId] = {
                ...updatedCards[existingCardId],
                ...payload,
            };

            return {
                cards: updatedCards,
            };
        }),
    shuffleCards: () =>
        set((state) => {
            const cardsToShuffle = shuffleArray([...state.cards]);
            return {
                cards: cardsToShuffle,
            };
        }),
    resetProgress: (id) =>
        set((state) => {
            const updatedCards = [...state.cards];
            const cardToUpdateIdx = updatedCards.findIndex(
                (card) => card.id === id,
            );

            if (cardToUpdateIdx !== -1) {
                updatedCards[cardToUpdateIdx].knownCount = 0;
            }

            return {
                cards: updatedCards,
            };
        }),
    updateProgress: (id) =>
        set((state) => {
            const updatedCards = [...state.cards];
            const cardToUpdateIdx = updatedCards.findIndex(
                (card) => card.id === id,
            );

            if (cardToUpdateIdx !== -1) {
                updatedCards[cardToUpdateIdx].knownCount =
                    updatedCards[cardToUpdateIdx].knownCount + 1;
            }

            return {
                cards: updatedCards,
            };
        }),
}));

export default useFlashcardStore;
