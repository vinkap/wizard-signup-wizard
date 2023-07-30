import { useEffect, useRef } from "react";

// Couldn't get this to work!!!

export default function useCustomDelay(callback: Function, delay: number) {
    const callbackRef = useRef(callback);

    useEffect(() => {
      callbackRef.current = callback;
    }, [callback]);
  
    useEffect(() => {
      const timerId = setTimeout(() => {
        callbackRef.current();
      }, delay);
  
      return () => clearTimeout(timerId);
    }, [delay]);
}
