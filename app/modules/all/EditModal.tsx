import Button from "@/app/components/Button";
import CloseIcon from "@/app/components/icons/CloseIcon";
import Input from "@/app/components/Input";
import TextArea from "@/app/components/TextArea";
import { FlashCard, FormInputs } from "@/app/types";
import { useForm } from "react-hook-form";

const EditModal = ({
    card,
    isOpen,
    onModalClose,
    onCardEdit,
}: {
    card: FlashCard;
    isOpen: boolean;
    onModalClose: () => void;
    onCardEdit: (data: FormInputs) => void;
}) => {
    const { register, handleSubmit } = useForm<FormInputs>({
        defaultValues: {
            answer: card?.answer || "",
            question: card?.question || "",
            category: card?.category || "",
        },
    });

    const onFormSubmit = (data: FormInputs) => {
        onCardEdit(data);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed z-50 inset-0 bg-neutral-9/70 flex items-center justify-center">
            <form
                className="grid gap-300 relative rounded-16 border-t border-l border-r-4 border-b-4 border-neutral-9 p-400 bg-neutral-0 w-full max-w-[600px]"
                onSubmit={handleSubmit(onFormSubmit)}
            >
                <span
                    className="absolute top-4 right-4 cursor-pointer"
                    onClick={onModalClose}
                >
                    <CloseIcon />
                </span>
                <h2 className="text-preset-2">Edit your card</h2>
                <div className="grid gap-200">
                    <Input label="Question" {...register("question")} />
                    <TextArea label="Answer" {...register("answer")} />
                    <Input label="Category" {...register("category")} />
                </div>
                <div className="flex items-center justify-end">
                    <Button type="submit">Update Card</Button>
                </div>
            </form>
        </div>
    );
};

export default EditModal;
