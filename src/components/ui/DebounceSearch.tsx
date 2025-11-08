import useDebounce from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import { HiX } from "react-icons/hi";
import { TbSearch } from "react-icons/tb";

type DebounceSearchProps = {
  wait?: number;
  ref?: React.Ref<HTMLInputElement>;
  value: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">;

const DebounceSearch = (props: DebounceSearchProps) => {
  const { wait = 250, value, onChange, onClear, ...rest } = props;
  const [internalVal, setInternalVal] = useState(value);

  useEffect(() => {
    setInternalVal(value);
  }, [value]);

  const debounceFn = useDebounce((val: string) => {
    onChange?.(val as any);
  }, wait);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInternalVal(val);
    debounceFn(val);
  };

  return (
    <span className="relative w-full flex disabled:opacity-50 disabled:cursor-not-allowed">
      <div className="absolute top-2/4 transform -translate-y-2/4 ltr:left-2.5">
        <TbSearch className="text-lg text-white" />
      </div>
      <input {...rest} value={internalVal} onChange={handleInputChange} />
      {value.length > 0 && onClear && (
        <button onClick={onClear} className="absolute top-2/4 transform -translate-y-2/4 -right-1.5 flex">
          <HiX />
        </button>
      )}
    </span>
  );
};

export default DebounceSearch;
