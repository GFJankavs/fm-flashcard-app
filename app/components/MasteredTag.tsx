import { MASTERED_COUNT } from "../constants";
import BrainSolidIcon from "./icons/BrainSolidIcon";

const MasteredTag = ({ count }: { count: number }) => (
    <div className="py-75 px-150 flex items-center justify-center gap-75 text-preset-6 text-neutral-9 rounded-full border border-neutral-9 bg-teal-4 shadow-[1px_1px_0_0_#2E1401]">
        <BrainSolidIcon />
        <span>Mastered</span>
        <span>{`${count}/${MASTERED_COUNT}`}</span>
    </div>
);

export default MasteredTag;
