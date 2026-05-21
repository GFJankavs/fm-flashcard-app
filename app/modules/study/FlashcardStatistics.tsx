import { ComponentType, useMemo } from "react";

import classNames from "classnames";
import BookIcon from "@/app/components/icons/BookIcon";
import BoxIcon from "@/app/components/icons/BoxIcon";
import BrainIcon from "@/app/components/icons/BrainIcon";
import LayersIcon from "@/app/components/icons/LayersIcon";
import { FlashCard } from "@/app/types";
import { MASTERED_COUNT } from "@/app/constants";

const FlashcardStatisticsCard = ({
    label,
    count,
    color,
    icon: Icon,
}: {
    label: string;
    count: number;
    color: string;
    icon: ComponentType;
}) => (
    <div className="flex justify-between overflow-hidden rounded-12 border-t border-r-2 border-b-2 border-l border-neutral-9 bg-neutral-0 h-30">
        <div className="flex flex-col justify-between p-250">
            <h4 className="text-preset-4--medium">{label}</h4>
            <span className="text-preset-1--mobile">{count}</span>
        </div>
        <div
            className={classNames(
                "h-full w-[100px]",
                "flex items-center justify-center",
                color,
            )}
        >
            <Icon />
        </div>
    </div>
);

const FlashcardStatistics = ({ cards }: { cards: FlashCard[] }) => {
    const statisticsSections = useMemo(() => {
        const totalCount = cards.length;
        const masteredCount = cards.filter(
            (card) => card.knownCount === MASTERED_COUNT,
        ).length;
        const progressCount = cards.filter(
            (card) => card.knownCount < MASTERED_COUNT && card.knownCount > 0,
        ).length;
        const notStartedCount = cards.filter(
            (card) => card.knownCount === 0,
        ).length;

        return [
            {
                id: "total",
                label: "Total",
                count: totalCount,
                color: "bg-blue-4",
                icon: LayersIcon,
            },
            {
                id: "mastered",
                label: "Mastered",
                count: masteredCount,
                icon: BrainIcon,
                color: "bg-teal-4",
            },
            {
                id: "progress",
                label: "In Progress",
                count: progressCount,
                color: "bg-pink-5",
                icon: BookIcon,
            },
            {
                id: "started",
                label: "Not Started",
                count: notStartedCount,
                color: "bg-pink-4",
                icon: BoxIcon,
            },
        ];
    }, [cards]);

    return (
        <section className="grid gap-200 text-neutral-9 py-250 px-200 rounded-16 border-t border-r-[3px] border-b-[3px] border-l border-neutral-900 bg-neutral-0">
            <h2 className="text-preset-2">Study Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 lg:w-98 gap-200">
                {statisticsSections.map((statistic, index) => (
                    <FlashcardStatisticsCard
                        key={index}
                        color={statistic.color}
                        label={statistic.label}
                        count={statistic.count}
                        icon={statistic.icon}
                    />
                ))}
            </div>
        </section>
    );
};

export default FlashcardStatistics;
