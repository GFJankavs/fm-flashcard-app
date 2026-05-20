"use client";

import { useState } from "react";
import { TabMode } from "./types";
import FlashcardHeader from "./modules/study/FlashcardHeader";
import FlashcardMastery from "./modules/study/FlashcardMastery";
import FlashcardStatistics from "./modules/study/FlashcardStatistics";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import Dropdown from "./components/Dropdown";
import ShuffleIcon from "./components/icons/ShuffleIcon";
import NewFlashcardForm from "./modules/all/NewFlashcardForm";
import Flashcard from "./modules/all/Flashcard";

export default function Home() {
    const [mode, setMode] = useState<TabMode>("all");

    return (
        <main className="flex flex-col gap-300 pt-200 pb-500 px-200 w-full max-w-310 mx-auto">
            <FlashcardHeader mode={mode} onModeChange={setMode} />
            {mode === "study" ? (
                <div className="flex flex-col gap-300 lg:flex-row">
                    <FlashcardMastery />
                    <FlashcardStatistics />
                </div>
            ) : (
                <div className="grid gap-300">
                    <NewFlashcardForm />
                    <div className="flex justify-between pt-200">
                        <div className="flex flex-col md:flex-row gap-125">
                            <Dropdown label="All Categories" />
                            <Checkbox label="Hide Mastered" />
                        </div>
                        <div>
                            <Button variant="secondary">
                                <ShuffleIcon />
                                <span>Shuffle</span>
                            </Button>
                        </div>
                    </div>
                    <div className="grid gap-300 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        <Flashcard />
                        <Flashcard />
                        <Flashcard />
                        <Flashcard />
                    </div>
                </div>
            )}
        </main>
    );
}
