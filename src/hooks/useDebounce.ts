import { useMemo, useRef, useEffect } from "react";
import debounce from "lodash/debounce";

export function useDebounce<T extends (...args: any[]) => any>(fn: T, wait: number) {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const debounced = useMemo(() => {
    return debounce((...args: any[]) => fnRef.current(...args), wait);
  }, [wait]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      debounced.cancel();
    };
  }, [debounced]);

  return debounced;
}

export default useDebounce;
