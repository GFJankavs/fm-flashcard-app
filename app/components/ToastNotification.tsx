import CrossIcon from "./icons/CrossIcon";
import { ToastContentProps } from "react-toastify";

const ToastNotification = ({
    closeToast,
    data,
}: ToastContentProps<{
    content: string;
}>) => (
    <div
        role="alert"
        className="text-neutral-9 py-125 px-200 flex items-center justify-between w-[300px] rounded-full border border-neutral-9 bg-neutral-0 shadow-[2px_2px_0_0_#2E1401]"
    >
        <p className="text-preset-4--medium">{data.content}</p>
        <button
            className="cursor-pointer"
            title="Close notification"
            type="button"
            onClick={() => closeToast("remove")}
        >
            <CrossIcon />
        </button>
    </div>
);

export default ToastNotification;
