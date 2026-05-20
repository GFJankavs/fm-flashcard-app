import Button from "@/app/components/Button";
import PlusIcon from "@/app/components/icons/PlusIcon";
import Input from "@/app/components/Input";
import TextArea from "@/app/components/TextArea";

const NewFlashcardForm = () => {
    return (
        <section className="p-250 rounded-16 border-t border-l border-r-4 border-b-4 border-neutral-9">
            <form className=" flex flex-col gap-300">
                <div className="grid gap-200">
                    <Input
                        label="Question"
                        placeholder="e.g., What is the capital of France?"
                    />
                    <TextArea label="Answer" placeholder="e.g., Paris" />
                    <Input label="Category" placeholder="e.g., Geography" />
                </div>
                <Button width="fit">
                    <PlusIcon />
                    <span>Create Card</span>
                </Button>
            </form>
        </section>
    );
};

export default NewFlashcardForm;
