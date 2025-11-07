import classNames from "@/utils";
import { HiX } from "react-icons/hi";

type CloseButtonProps = {
  absolute?: boolean;
  className?: string;
  resetDefaultClass?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
};

const CloseButton = (props: CloseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { absolute, className, resetDefaultClass, ref, ...rest } = props;
  const closeButtonAbsoluteClass = "absolute z-10";

  const closeButtonClass = classNames(
    !resetDefaultClass && "close-button button-press-feedback",
    absolute && closeButtonAbsoluteClass,
    className
  );

  return (
    <button ref={ref} className={closeButtonClass} type="button" {...rest}>
      <HiX />
    </button>
  );
};

export default CloseButton;
