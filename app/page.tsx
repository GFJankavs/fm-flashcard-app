"use client";

import { useState } from "react";
import { TabMode } from "./types";
import FlashcardHeader from "./modules/study/FlashcardHeader";
import StudyTab from "./modules/study/StudyTab";
import AllTab from "./modules/all/AllTab";

export default function Home() {
    const [mode, setMode] = useState<TabMode>("study");

    return (
        <main className="flex flex-col gap-300 pt-200 pb-500 px-200 w-full max-w-310 mx-auto">
            <FlashcardHeader mode={mode} onModeChange={setMode} />
            {mode === "study" ? <StudyTab /> : <AllTab />}
        </main>
    );
}
