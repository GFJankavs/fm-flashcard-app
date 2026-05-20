"use client";

import Button from "@/app/components/Button";
import Checkbox from "@/app/components/Checkbox";
import Dropdown from "@/app/components/Dropdown";
import CheckCircleIcon from "@/app/components/icons/CheckCircleIcon";
import ShuffleIcon from "@/app/components/icons/ShuffleIcon";
import UndoIcon from "@/app/components/icons/UndoIcon";
import ProgressBar from "@/app/components/ProgressBar";
import Image from "next/image";

const FlashcardMastery = () => {
    return (
        <section className="flex-1 lg:max-w-204 rounded-16 border-t border-r-[3px] border-b-[3px] border-l border-neutral-900 bg-neutral-0">
            <div className="flex justify-between py-150 px-200 border-b border-b-neutral-9">
                <div className="flex flex-col md:flex-row gap-125">
                    <Dropdown label="All Categories" />
                    <Checkbox />
                </div>
                <div>
                    <Button variant="secondary">
                        <ShuffleIcon />
                        <span>Shuffle</span>
                    </Button>
                </div>
            </div>
            <div className="py-300 px-200 flex flex-col gap-250">
                <div className="relative w-full flex flex-col items-center bg-pink-4 border-2 border-neutral-9 shadow-[2px_2px_0_0_#2E1401] rounded-16 px-200 py-250 h-90 text-neutral-9">
                    <span className="text-preset-6 inline-flex justify-center items-center py-75 px-150 shadow-[1px_1px_0_0_#000] bg-neutral-0 border border-neutral-9 rounded-full">
                        Web Development
                    </span>
                    <div className="text-center flex flex-col justify-center flex-1 gap-200">
                        <h1 className="text-preset-1--mobile">
                            What does HTML stand for?
                        </h1>
                        <p className="text-preset-4--medium">
                            Click to reveal answer
                        </p>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <ProgressBar progress={0} />
                        <span className="text-preset-6">0/5</span>
                    </div>
                    <Image
                        src="images/pattern-star-yellow.svg"
                        alt="Yellow Star"
                        width={32}
                        height={32}
                        className="absolute left-6.75 bottom-13"
                    />
                    <Image
                        src="images/pattern-star-blue.svg"
                        alt="Yellow Star"
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
                        <Button width="full" className="hidden md:flex">
                            <CheckCircleIcon />
                            <span>I Know This</span>
                        </Button>
                    </div>
                    <div className="w-full md:w-fit">
                        <Button
                            width="full"
                            variant="secondary"
                            className="hidden md:flex"
                        >
                            <UndoIcon />
                            <span>Reset Progress</span>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="p-200 border-t border-t-neutral-9 flex items-center justify-between">
                <Button variant="border">
                    <Image
                        src="images/icon-chevron-left.svg"
                        alt="Previous"
                        width={16}
                        height={16}
                    />
                    <span className="hidden md:inline">Previous</span>
                </Button>
                <span>Card 1 of 40</span>
                <Button variant="border">
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
