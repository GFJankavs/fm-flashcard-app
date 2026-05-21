import useFlashcardStore from "@/app/store/flashcard";
import FlashcardMastery from "./FlashcardMastery";
import { getCategoryOptions } from "@/app/utils";
import { useMemo } from "react";
import FlashcardStatistics from "./FlashcardStatistics";

const StudyTab = () => {
    const { cards, shuffleCards, resetProgress, updateProgress } =
        useFlashcardStore();

    const categoryDropdownOptions = useMemo(
        () => getCategoryOptions(cards),
        [cards],
    );

    return (
        <div className="flex flex-col gap-300 lg:flex-row">
            <FlashcardMastery
                cards={cards}
                onShuffleCards={shuffleCards}
                onProgressReset={resetProgress}
                onKnownUpdate={updateProgress}
                availableCategories={categoryDropdownOptions}
            />
            <FlashcardStatistics cards={cards} />
        </div>
    );
};

export default StudyTab;
