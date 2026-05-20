import FlashcardMastery from "./modules/FlashcardMastery";
import FlashcardHeader from "./modules/FlashcardHeader";
import FlashcardStatistics from "./modules/FlashcardStatistics";

export default function Home() {
  return (
    <main className="flex flex-col gap-300 pt-200 pb-500 px-200 w-full max-w-310 mx-auto">
      <FlashcardHeader />
      <div className="flex flex-col gap-300 lg:flex-row">
        <FlashcardMastery />
        <FlashcardStatistics />
      </div>
    </main>
  );
}
