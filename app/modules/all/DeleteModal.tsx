import Button from "@/app/components/Button";

const DeleteModal = ({
    isOpen,
    onModalClose,
    onCardDelete,
}: {
    onCardDelete: () => void;
    isOpen: boolean;
    onModalClose: () => void;
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed z-50 inset-0 bg-neutral-9/70 flex items-center justify-center">
            <div className="rounded-16 border-t border-l border-r-4 border-b-4 border-neutral-9 bg-neutral-0 w-full max-w-[600px]">
                <div className="p-300 grid gap-100">
                    <h2 className="text-preset-2">Delete this card?</h2>
                    <p className="text-preset-4--regular">
                        This action can&apos;t be undone.
                    </p>
                </div>
                <div className="flex gap-2.5 items-center justify-end pt-150 pb-200 px-300 border-t border-t-neutral-9">
                    <Button variant="border" onClick={onModalClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={onCardDelete}>
                        Delete Card
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
