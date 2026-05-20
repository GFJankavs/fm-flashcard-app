import Button from "./Button";
import AngleDownIcon from "./icons/AngleDownIcon";

const Dropdown = () => (
  <div>
    <Button variant="secondary">
      <span className="text-preset-4--medium">All Categories</span>
      <AngleDownIcon />
    </Button>
  </div>
);

export default Dropdown;
