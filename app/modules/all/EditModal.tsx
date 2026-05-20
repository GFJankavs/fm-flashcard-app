import Button from "@/app/components/Button";
import CloseIcon from "@/app/components/icons/CloseIcon";
import Input from "@/app/components/Input";
import TextArea from "@/app/components/TextArea";

const EditModal = ({
    isOpen,
    onModalClose,
}: {
    isOpen: boolean;
    onModalClose: () => void;
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed z-50 inset-0 bg-neutral-9/70 flex items-center justify-center">
            <form className="grid gap-300 relative rounded-16 border-t border-l border-r-4 border-b-4 border-neutral-9 p-400 bg-neutral-0 w-full max-w-[600px]">
                <span
                    className="absolute top-4 right-4 cursor-pointer"
                    onClick={onModalClose}
                >
                    <CloseIcon />
                </span>
                <h2 className="text-preset-2">Edit your card</h2>
                <div className="grid gap-200">
                    <Input label="Question" />
                    <TextArea label="Answer" />
                    <Input label="Category" />
                </div>
                <div className="flex items-center justify-end">
                    <Button>Update Card</Button>
                </div>
            </form>
        </div>
    );
};

export default EditModal;
