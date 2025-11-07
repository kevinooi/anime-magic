import classNames from "@/utils";
import { CgSpinner } from "react-icons/cg";

type SpinnerProps = {
  className?: string;
  customColorClass?: string;
  indicator?: React.ElementType;
  isSpining?: boolean;
  size?: number;
  style?: React.CSSProperties;
  ref?: React.Ref<any>;
  [key: string]: any;
};

const Spinner = (props: SpinnerProps) => {
  const { className, customColorClass, indicator: Component = CgSpinner, isSpining = true, size = 20, style, ref, ...rest } = props;

  const spinnerColor = customColorClass;

  const spinnerStyle = {
    height: size,
    width: size,
    ...style
  };

  const spinnerClass = classNames(isSpining && "animate-spin", spinnerColor, className);

  return <Component ref={ref} style={spinnerStyle} className={spinnerClass} {...rest} />;
};

export default Spinner;
