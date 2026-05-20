import Tab from "@/app/components/Tab";
import { TabMode } from "@/app/types";
import Image from "next/image";

const FlashcardHeader = ({
    mode,
    onModeChange,
}: {
    mode: TabMode;
    onModeChange: (mode: TabMode) => void;
}) => (
    <header className="flex items-center justify-between">
        <Image
            src="/images/logo-small.svg"
            alt="Logo"
            width={40}
            height={40}
            className="md:hidden"
        />
        <Image
            src="/images/logo-large.svg"
            alt="Logo"
            width={157}
            height={40}
            className="hidden md:block"
        />
        <Tab mode={mode} onTabClick={onModeChange} />
    </header>
);

export default FlashcardHeader;
