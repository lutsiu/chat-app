import { useState } from "react";
/* import useHorizonalScroll from "../../../../hooks/useHorizontalScroll"; */
import Person from "./Person";
import { useEffect } from "react";
import useResponsive from "../../../../hooks/useResponsive";
export default function FoundPeople() {
  const [translateX, setTranslateX] = useState(0);
  const [width, setWidth] = useState<null | number>(null);
  const [lastPersonWidth, setLastPersonWidth] = useState<null | number>(null);
  const [lastPersonOffsetLeft, setLastPersonOffsetLeft] = useState<
    null | number
  >(null);
  const AMOUNT_OF_PEOPLE = 10;
  const screenWidth = useResponsive();
  useEffect(() => {
    const ul = document.getElementById("found-people") as HTMLElement;
    setWidth(ul.offsetWidth);
    const lastPerson = ul.lastElementChild as HTMLElement;
    setLastPersonWidth(lastPerson.offsetWidth);
    setLastPersonOffsetLeft(lastPerson.offsetLeft);
  }, [translateX, translateX]);

  function handleScroll(e: any) {
    const delta = e.deltaY;
    if (delta < 0 && translateX !== 0) {
      setTranslateX((prev) => prev + 20);
    }
    if (width && lastPersonOffsetLeft && lastPersonWidth) {
  
      if (screenWidth < 768) {
        const amountOfPeopleWithinScreen = screenWidth / lastPersonWidth;
        console.log(width,  translateX)
        const amountOfPeopleBeyondScreen = -(
          AMOUNT_OF_PEOPLE - amountOfPeopleWithinScreen
        );
     
        const MIN_EXTREMA = amountOfPeopleBeyondScreen * lastPersonWidth;
       
        if (delta > 0 && translateX > MIN_EXTREMA) {
        
          return setTranslateX((prev) => prev - 20);
        }
      } else {
        const amountOfPeopleWithinScreen = width / lastPersonWidth;
        const amountOfPeopleBeyondScreen = -(
          AMOUNT_OF_PEOPLE - amountOfPeopleWithinScreen
        );
        const MIN_EXTREMA = amountOfPeopleBeyondScreen * lastPersonWidth;
        if (delta > 0 && translateX > MIN_EXTREMA) {
          return setTranslateX((prev) => prev - 20);
        }
      }
    }
  }
  return (
    <div className="overflow-hidden " onWheel={handleScroll}>
      <ul
      id="found-people"
        className="flex gap-[1rem] justify-between border-y-[1px] border-y-black py-[.5rem] pl-[1.7rem] max-w-[100vw]"
        style={{ transform: `translateX(${translateX}px)` }}
      >
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
      </ul>
    </div>
  );
}
