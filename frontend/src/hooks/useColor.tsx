import { useState, useEffect } from "react";
import { gray, pink, mediumPurple } from "../utils/colors";

export default function useColor(
  error: string | undefined,
  touched: boolean | undefined
) {
  const [color, setColor] = useState(gray);

  useEffect(() => {
    if (!touched && !error) {
      setColor(gray);
    }
    if (touched && !error) {
      setColor(mediumPurple)
    }
    if (error) {
      setColor(pink)
    }
  }, [error, touched]);
  return color;
}
