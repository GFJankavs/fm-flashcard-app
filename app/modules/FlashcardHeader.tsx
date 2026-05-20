import Image from "next/image";
import Tab from "../components/Tab";

const FlashcardHeader = () => (
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
    <Tab />
  </header>
);

export default FlashcardHeader;
