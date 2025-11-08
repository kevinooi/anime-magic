import cn from "classnames";
import ReactSelect, { components, type ClearIndicatorProps } from "react-select";
import { HiChevronDown, HiX } from "react-icons/hi";
import DefaultOption from "./Option";
import Spinner from "../Spinner";
import { CONTROL_SIZES } from "@/constants";

const DefaultDropdownIndicator = () => {
  return (
    <div className="select-dropdown-indicator">
      <HiChevronDown />
    </div>
  );
};

export const DefaultClearIndicator = (props: ClearIndicatorProps<any>) => {
  const {
    innerProps: { ref, ...restInnerProps }
  } = props;

  return (
    <components.ClearIndicator {...props}>
      <div {...restInnerProps} ref={ref}>
        <div className="select-clear-indicator">
          <HiX />
        </div>
      </div>
    </components.ClearIndicator>
  );
};

const DefaultLoadingIndicator = ({ selectProps }: { selectProps: { themeColor: string } }) => {
  const { themeColor } = selectProps;
  return <Spinner className={`select-loading-indicatior text-${themeColor}`} />;
};

type SelectStyles = {
  control?: React.CSSProperties;
  valueContainer?: React.CSSProperties;
  input?: React.CSSProperties;
  placeholder?: React.CSSProperties;
  singleValue?: React.CSSProperties;
  multiValue?: React.CSSProperties;
  multiValueLabel?: React.CSSProperties;
  multiValueRemove?: React.CSSProperties;
  menu?: React.CSSProperties;
  [key: string]: React.CSSProperties | undefined;
};

type SelectClassNames = {
  control?: string;
  valueContainer?: string;
  input?: string;
  placeholder?: string;
  indicatorsContainer?: string;
  singleValue?: string;
  multiValue?: string;
  multiValueLabel?: string;
  multiValueRemove?: string;
  menu?: string;
  [key: string]: string | undefined;
};

type SelectProps = {
  components?: Record<string, React.ComponentType<any>>;
  componentAs?: typeof ReactSelect;
  size?: "sm" | "md" | "lg";
  styles?: SelectStyles;
  className?: string;
  classNames?: SelectClassNames;
  field?: any;
  invalid?: boolean;
  [key: string]: any;
};

function Select(props: SelectProps) {
  const { components, componentAs: Component = ReactSelect, size, styles, className, classNames, field, invalid, ...rest } = props;
  const selectSize = size || "md";

  const isSelectInvalid = invalid;

  const selectClass = cn(`select select-${selectSize}`, className);

  return (
    <Component
      className={selectClass}
      classNames={{
        control: (state: { isDisabled: boolean; isFocused: boolean }) =>
          cn(
            "select-control",
            CONTROL_SIZES[selectSize].minH,
            state.isDisabled && "opacity-50 cursor-not-allowed",
            (() => {
              const classes = ["bg-gray-700"];

              const { isFocused } = state;

              if (isFocused) {
                classes.push("select-control-focused ring-1 ring-primary border-primary bg-transparent");
              }

              if (isSelectInvalid) {
                classes.push("select-control-invalid bg-error-subtle");
              }

              if (isFocused && isSelectInvalid) {
                classes.push("ring-error border-error");
              }

              return classes;
            })()
          ),
        valueContainer: ({
          isMulti,
          hasValue,
          selectProps
        }: {
          isMulti: boolean;
          hasValue: boolean;
          selectProps: { controlShouldRenderValue: boolean };
        }) => cn("select-value-container", isMulti && hasValue && selectProps.controlShouldRenderValue ? "flex" : "grid"),
        input: ({ value, isDisabled }: { value: string; isDisabled: boolean }) =>
          cn("select-input-container", isDisabled ? "invisible" : "visible", value && "[transform:translateZ(0)]"),
        placeholder: () => cn("select-placeholder", isSelectInvalid ? "text-error" : "text-gray-400"),
        indicatorsContainer: () => "select-indicators-container",
        singleValue: () => "select-single-value",
        multiValue: () => "select-multi-value",
        multiValueLabel: () => "select-multi-value-label",
        multiValueRemove: () => "select-multi-value-remove",
        menu: () => "select-menu",
        ...classNames
      }}
      classNamePrefix={"select"}
      styles={{
        control: () => ({}),
        valueContainer: () => ({}),
        input: ({
          margin,
          paddingTop,
          paddingBottom,
          ...provided
        }: {
          margin?: string;
          paddingTop?: string;
          paddingBottom?: string;
          [key: string]: any;
        }) => ({ ...provided }),
        placeholder: () => ({}),
        singleValue: () => ({}),
        multiValue: () => ({}),
        multiValueLabel: () => ({}),
        multiValueRemove: () => ({}),
        menu: ({
          backgroundColor,
          marginTop,
          marginBottom,
          border,
          borderRadius,
          boxShadow,
          ...provided
        }: {
          backgroundColor?: string;
          marginTop?: string;
          marginBottom?: string;
          border?: string;
          borderRadius?: string;
          boxShadow?: string;
          [key: string]: any;
        }) => ({ ...provided, zIndex: 50 }),
        ...styles
      }}
      components={{
        IndicatorSeparator: () => null,
        Option: DefaultOption,
        LoadingIndicator: DefaultLoadingIndicator,
        DropdownIndicator: DefaultDropdownIndicator,
        ClearIndicator: DefaultClearIndicator,
        ...components
      }}
      {...field}
      {...rest}
    />
  );
}

export default Select;
