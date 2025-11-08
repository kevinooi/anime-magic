import Modal from "react-modal";
import classNames from "@/utils";
import CloseButton from "./CloseButton";
import { motion } from "framer-motion";
import useWindowSize from "@/hooks/useWindowSize";

type DialogProps = {
  bodyOpenClassName?: string;
  children?: React.ReactNode;
  className?: string;
  closable?: boolean;
  closeTimeoutMS?: number;
  contentClassName?: string;
  height?: number | string;
  isOpen: boolean;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  overlayClassName?: string;
  portalClassName?: string;
  style?: {
    content?: React.CSSProperties;
    overlay?: React.CSSProperties;
  };
  width?: number;
  [key: string]: any;
};

const Dialog = (props: DialogProps) => {
  const currentSize = useWindowSize();

  const {
    bodyOpenClassName,
    children,
    className,
    closable = true,
    closeTimeoutMS = 150,
    contentClassName,
    height,
    isOpen,
    onClose,
    overlayClassName,
    portalClassName,
    style,
    width = 520,
    ...rest
  } = props;

  const onCloseClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    onClose?.(e);
  };

  const renderCloseButton = <CloseButton absolute className="right-6 top-4.5" onClick={onCloseClick} />;

  const contentStyle: { content: React.CSSProperties } = {
    content: {
      inset: "unset"
    },
    ...style
  };

  if (width !== undefined) {
    contentStyle.content.width = width;

    if (typeof currentSize.width !== "undefined" && currentSize.width <= width) {
      contentStyle.content.width = "auto";
    }
  }

  if (height !== undefined) {
    contentStyle.content.height = height;
  }

  const defaultDialogContentClass = "dialog-content";

  const dialogClass = classNames(defaultDialogContentClass, contentClassName);

  return (
    <Modal
      className={{
        base: classNames("dialog", className),
        afterOpen: "dialog-after-open",
        beforeClose: "dialog-before-close"
      }}
      overlayClassName={{
        base: classNames("dialog-overlay", overlayClassName),
        afterOpen: "dialog-overlay-after-open",
        beforeClose: "dialog-overlay-before-close"
      }}
      portalClassName={classNames("dialog-portal", portalClassName)}
      bodyOpenClassName={classNames("dialog-open", bodyOpenClassName)}
      ariaHideApp={false}
      isOpen={isOpen}
      style={{ ...contentStyle }}
      closeTimeoutMS={closeTimeoutMS}
      {...rest}
    >
      <motion.div
        className={dialogClass}
        initial={{ transform: "scale(0.9)" }}
        animate={{
          transform: isOpen ? "scale(1)" : "scale(0.9)"
        }}
      >
        {closable && renderCloseButton}
        {children}
      </motion.div>
    </Modal>
  );
};

export default Dialog;
