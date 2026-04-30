import { useRef, useCallback, useEffect } from "react";
interface useDebounceProps {
  fn: (...args: any[]) => void;
  delay: number;
}
export const useDebounce = ({ fn, delay }: useDebounceProps) => {
  const timeRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const debounce = useCallback(
    (...args: any[]) => {
      if (timeRef.current) {
        clearTimeout(timeRef.current);
      }
      timeRef.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay],
  );
  useEffect(() => {
    return () => {
      if (timeRef.current) {
        clearTimeout(timeRef.current);
      }
    };
  }, []);
  return debounce;
};
