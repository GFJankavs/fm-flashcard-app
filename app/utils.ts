import { toast } from "react-toastify";
import ToastNotification from "./components/ToastNotification";
import { CategoryDropdownOption, FlashCard } from "./types";

export const shuffleArray = (array: Array<FlashCard>) => {
    const arr = array;
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

export const getCategoryOptions = (
    cards: FlashCard[],
): CategoryDropdownOption[] => {
    const categoryMap = new Map<string, number>();

    cards.forEach((card) => {
        categoryMap.set(
            card.category,
            (categoryMap.get(card.category) || 0) + 1,
        );
    });

    return Array.from(categoryMap).map(([category, count], index) => ({
        id: `${index}`,
        label: category,
        count,
        selected: false,
    }));
};

export const notify = (content: string) =>
    toast(ToastNotification, {
        data: { content },
        className: "bg-transparent! shadow-none! p-0! min-h-0! rounded-none!",
        ariaLabel: content,
        closeButton: false,
        hideProgressBar: true,
    });
