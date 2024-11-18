import { useState, useEffect } from "react";

interface WindowSize {
  width: number;
  height: number;
}

/**
 * The `useWindowSize` function returns the current width and height of the window and
 * updates them on window resize.
 * @returns The `useWindowSize` returns an object containing
 * the current width and height of the window.
 */
const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
