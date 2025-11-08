import classNames from "@/utils";
import { HiCheck } from "react-icons/hi";

type OptionData = {
  [key: string]: any;
};

type OptionProps = {
  innerProps: { [key: string]: any };
  label: string;
  isSelected: boolean;
  isDisabled: boolean;
  data: OptionData;
  customLabel?: (data: OptionData, label: string) => React.ReactNode;
};

const Option = (props: OptionProps) => {
  const { innerProps, label, isSelected, isDisabled, data, customLabel } = props;

  return (
    <div
      className={classNames(
        "select-option",
        !isDisabled && !isSelected && "hover:text-gray-100",
        isSelected && "text-primary bg-primary-subtle",
        isDisabled && "opacity-50 cursor-not-allowed"
      )}
      {...innerProps}
    >
      {customLabel ? customLabel(data, label) : <span className="ml-2">{label}</span>}
      {isSelected && <HiCheck className="text-xl" />}
    </div>
  );
};

export default Option;
