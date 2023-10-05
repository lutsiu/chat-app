import { useState, useEffect } from "react";
import { gray, pink, mediumPurple } from "../utils/colors";

export default function useSetColor(
  initialDisabled: boolean,
  error: string | undefined,
  touched: boolean | undefined
) {
  const [color, setColor] = useState(gray);

  useEffect(() => {
    if (error && touched) {
      setColor(pink);
    }
    if (!error && !initialDisabled) {
      setColor(mediumPurple);
    }
  }, [error, initialDisabled, touched]);
  return color;
}
