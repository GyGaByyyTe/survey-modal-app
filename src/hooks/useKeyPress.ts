import { useEffect, useState } from "react";

/**
 * Custom hook to detect if a specific key is pressed.
 *
 * @param targetKey - The key to listen for (e.g., "Escape", "Enter").
 * @returns An object containing:
 *   - `keyPressed`: A boolean indicating if the key is currently pressed.
 *   - `setKeyPressed`: A function to manually set the key pressed state.
 */
export const useKeyPress = (targetKey: string) => {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const downHandler = (event: KeyboardEvent): void => {
      if (event.key === targetKey) {
        setKeyPressed(true);
      }
    };

    const upHandler = (event: KeyboardEvent): void => {
      if (event.key === targetKey) {
        setKeyPressed(false);
      }
    };

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [targetKey]);

  return { keyPressed, setKeyPressed };
};
