import EditIcon from "./icons/EditIcon";
import Checkbox from "./Checkbox";

const DropdownItem = () => {
  return (
    <div
      className="flex items-center px-200 py-100 gap-100 cursor-pointer hover:bg-neutral-1 w-fit"
      tabIndex={0}
    >
      <EditIcon />
      <Checkbox />
      <span className="text-preset-5 text-neutral-9">Edit</span>
    </div>
  );
};

export default DropdownItem;
