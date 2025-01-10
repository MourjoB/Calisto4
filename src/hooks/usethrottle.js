import { useCallback, useRef } from 'react';

export const useThrottle = (callback, delay) => {
  const lastCall = useRef(0);
  const timeoutId = useRef();

  return useCallback((...args) => {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall.current;

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    if (timeSinceLastCall >= delay) {
      callback(...args);
      lastCall.current = now;
    } else {
      timeoutId.current = setTimeout(() => {
        callback(...args);
        lastCall.current = Date.now();
      }, delay - timeSinceLastCall);
    }
  }, [callback, delay]);
};