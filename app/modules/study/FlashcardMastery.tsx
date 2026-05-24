"use client";

import Button from "@/app/components/Button";
import Checkbox from "@/app/components/Checkbox";
import Dropdown from "@/app/components/Dropdown";
import CheckCircleIcon from "@/app/components/icons/CheckCircleIcon";
import ShuffleIcon from "@/app/components/icons/ShuffleIcon";
import UndoIcon from "@/app/components/icons/UndoIcon";
import MasteredTag from "@/app/components/MasteredTag";
import ProgressBar from "@/app/components/ProgressBar";
import { MASTERED_COUNT } from "@/app/constants";
import { CategoryDropdownOption, FlashCard } from "@/app/types";
import classNames from "classnames";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

const FlashcardMastery = ({
  cards,
  onShuffleCards,
  onProgressReset,
  onKnownUpdate,
  availableCategories,
}: {
  cards: FlashCard[];
  onShuffleCards: () => void;
  onProgressReset: (id: string) => void;
  onKnownUpdate: (id: string) => void;
  availableCategories: CategoryDropdownOption[];
}) => {
  const [currentView, setCurrentView] = useState<"question" | "answer">(
    "question",
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [hideMastered, setHideMastered] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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

  const isMastered = availableCards[currentIndex].knownCount === MASTERED_COUNT;

  const handleCardChange = useCallback(
    (type: "next" | "prev") => {
      if (type === "next") {
        if (currentIndex === availableCards.length - 1) {
          setCurrentIndex(0);
        } else {
          setCurrentIndex((prev) => prev + 1);
        }
      } else if (type === "prev") {
        if (currentIndex === 0) {
          setCurrentIndex(availableCards.length - 1);
        } else {
          setCurrentIndex((prev) => prev - 1);
        }
      }
      setCurrentView("question");
    },
    [availableCards.length, currentIndex],
  );

  const currentProgress =
    (availableCards[currentIndex].knownCount / MASTERED_COUNT) * 100;

  return (
    <section className="flex-1 lg:max-w-204 rounded-16 border-t border-r-[3px] border-b-[3px] border-l border-neutral-900 bg-neutral-0">
      <div className="flex justify-between py-150 px-200 border-b border-b-neutral-9">
        <div className="flex flex-col md:flex-row gap-125">
          <Dropdown
            label="All Categories"
            options={availableCategories}
            selectedOptions={selectedCategories}
            onOptionSelect={handleOptionSelect}
          />
          <Checkbox
            label="Hide Mastered"
            checked={hideMastered}
            onChange={() => {
              setHideMastered((prev) => !prev);
              setCurrentIndex(0);
            }}
          />
        </div>
        <div>
          <Button variant="secondary" onClick={onShuffleCards}>
            <ShuffleIcon />
            <span>Shuffle</span>
          </Button>
        </div>
      </div>
      <div className="py-300 px-200 flex flex-col gap-250">
        <div
          onClick={() =>
            setCurrentView((prev) =>
              prev === "answer" ? "question" : "answer",
            )
          }
          className={classNames(
            "cursor-pointer relative w-full flex flex-col items-center border-2 border-neutral-9 shadow-[2px_2px_0_0_#2E1401] rounded-16 px-200 py-250 h-90 text-neutral-9",
            {
              "bg-pink-4": currentView === "question",
              "bg-blue-4": currentView === "answer",
            },
          )}
        >
          <span className="select-none text-preset-6 inline-flex justify-center items-center py-75 px-150 shadow-[1px_1px_0_0_#000] bg-neutral-0 border border-neutral-9 rounded-full">
            {availableCards[currentIndex].category}
          </span>
          <div className="text-center flex flex-col justify-center flex-1 gap-200 select-none">
            {currentView === "question" ? (
              <>
                <h1 className="text-preset-1--mobile">
                  {availableCards[currentIndex].question}
                </h1>
                <p className="text-preset-4--medium">Click to reveal answer</p>
              </>
            ) : (
              <>
                <p className="text-preset-4--medium">Answer:</p>
                <h1 className="text-preset-2">
                  {availableCards[currentIndex].answer}
                </h1>
              </>
            )}
          </div>

          <div className="flex items-center justify-center gap-2">
            {isMastered ? (
              <MasteredTag count={availableCards[currentIndex].knownCount} />
            ) : (
              <>
                <ProgressBar progress={currentProgress} />
                <span className="text-preset-6 select-none">{`${availableCards[currentIndex].knownCount}/${MASTERED_COUNT}`}</span>
              </>
            )}
          </div>
          <Image
            src="images/pattern-star-yellow.svg"
            alt="Yellow Star"
            width={32}
            height={32}
            className="absolute left-6.75 bottom-13"
          />
          <Image
            src={
              currentView === "question"
                ? "images/pattern-star-blue.svg"
                : "images/pattern-star-pink.svg"
            }
            alt="Blue Star"
            width={24}
            height={24}
            className="absolute top-10 right-7.5"
          />
        </div>
        <div
          id="controls"
          className="flex flex-col md:flex-row md:justify-center gap-125"
        >
          <div className="w-full md:w-fit">
            <Button
              width="full"
              className="hidden md:flex"
              disabled={isMastered}
              onClick={() => {
                onKnownUpdate(availableCards[currentIndex].id);
                handleCardChange("next");
              }}
            >
              <CheckCircleIcon />
              <span>{isMastered ? "Already Mastered" : "I Know This"}</span>
            </Button>
          </div>
          <div className="w-full md:w-fit">
            <Button
              width="full"
              variant="secondary"
              className="hidden md:flex"
              onClick={() => onProgressReset(availableCards[currentIndex].id)}
            >
              <UndoIcon />
              <span>Reset Progress</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="p-200 border-t border-t-neutral-9 flex items-center justify-between">
        <Button variant="border" onClick={() => handleCardChange("prev")}>
          <Image
            src="images/icon-chevron-left.svg"
            alt="Previous"
            width={16}
            height={16}
          />
          <span className="hidden md:inline">Previous</span>
        </Button>
        <span>{`Card ${currentIndex + 1} of ${availableCards.length}`}</span>
        <Button variant="border" onClick={() => handleCardChange("next")}>
          <span className="hidden md:inline">Next</span>
          <Image
            src="images/icon-chevron-right.svg"
            alt="Next"
            width={16}
            height={16}
          />
        </Button>
      </div>
    </section>
  );
};

export default FlashcardMastery;
