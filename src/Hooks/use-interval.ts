import { useEffect, useRef } from "react";

// Creating the custom useInterval hook
export function useInterval(callback: () => void, delay: number | null) {
  // Creating a ref to remember the latest callback
  const savedCallback = useRef<() => void>();

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval and clean up
  useEffect(() => {
    function func() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(func, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
