export type TabMode = "study" | "all";

export type FlashCard = {
    id: string;
    question: string;
    answer: string;
    category: string;
    knownCount: number;
};

export type CategoryDropdownOption = {
    id: string;
    label: string;
    count: number;
    selected: boolean;
};

export type FormInputs = {
    question: string;
    answer: string;
    category: string;
};
