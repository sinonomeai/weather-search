import { useRef, useCallback,useEffect } from "react";
interface useThrottleProps {
  fn: (...args: any[]) => void;
  t: number;
}
export const useThrottle = ({ fn, t }: useThrottleProps) => {
  const timeRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const throttle = useCallback((...args: any[]) => {
    if (!timeRef.current) {
        fn(...args)
      timeRef.current = setTimeout(()=>timeRef.current = undefined ,t)
    }
  }, [fn,t]);
   useEffect(() => {
     return () => {
       if (timeRef.current) {
         clearTimeout(timeRef.current);
       }
     };
   }, []);
   return throttle
};
