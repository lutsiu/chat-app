import { useState, useEffect } from "react";
import { lightGray, pink, mediumPurple } from "../utils/colors";

export default function useColor(
  error: string | undefined,
  touched: boolean | undefined
) {
  const [color, setColor] = useState(lightGray);

  useEffect(() => {
    if (!touched && !error) {
      setColor(lightGray);
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
