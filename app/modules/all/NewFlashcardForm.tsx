import Button from "@/app/components/Button";
import PlusIcon from "@/app/components/icons/PlusIcon";
import Input from "@/app/components/Input";
import TextArea from "@/app/components/TextArea";
import { FlashCard, FormInputs } from "@/app/types";
import { notify } from "@/app/utils";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const NewFlashcardForm = ({
  onCardAdd,
}: {
  onCardAdd: (data: FlashCard) => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const onFormSubmit = (data: FormInputs) => {
    const uniqueId = uuidv4();

    onCardAdd({
      id: uniqueId,
      answer: data.answer,
      category: data.category,
      question: data.question,
      knownCount: 0,
    });

    notify("Card created successfully.");

    reset();
  };

  console.log(errors);

  return (
    <section className="p-250 rounded-16 border-t border-l border-r-4 border-b-4 border-neutral-9">
      <form
        role="form"
        className=" flex flex-col gap-300"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <div className="grid gap-200">
          <Input
            label="Question"
            placeholder="e.g., What is the capital of France?"
            error={errors.question?.message}
            {...register("question", {
              required: "Question is required.",
            })}
          />
          <TextArea
            label="Answer"
            placeholder="e.g., Paris"
            error={errors.answer?.message}
            {...register("answer", {
              required: "Answer is required.",
            })}
          />
          <Input
            label="Category"
            placeholder="e.g., Geography"
            error={errors.category?.message}
            {...register("category", {
              required: "Category is required.",
            })}
          />
        </div>
        <Button role="button" width="fit">
          <PlusIcon />
          <span>Create Card</span>
        </Button>
      </form>
    </section>
  );
};

export default NewFlashcardForm;
