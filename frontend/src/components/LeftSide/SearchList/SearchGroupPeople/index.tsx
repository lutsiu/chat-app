import { useEffect, useState } from "react";
import Person from "./Person";
import useResponsive from "../../../../hooks/useResponsive";

export default function SearchGroupPeople() {
  const [translateX, setTranslateX] = useState(0);
  const [width, setWidth] = useState<null | number>(null);
  const [lastPersonWidth, setLastPersonWidth] = useState<null | number>(null);
  const [lastPersonOffsetLeft, setLastPersonOffsetLeft] = useState<
    null | number
  >(null);
  const AMOUNT_OF_PEOPLE = 10;
  const screenWidth = useResponsive();
  useEffect(() => {
    const ul = document.getElementById("search-group") as HTMLElement;
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
        const amountOfPeopleBeyondScreen = -(
          AMOUNT_OF_PEOPLE - amountOfPeopleWithinScreen
        );
        const MIN_EXTREMA = amountOfPeopleBeyondScreen * lastPersonWidth;
        if (delta > 0 && translateX > MIN_EXTREMA) {
          console.log(translateX, width)
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
    <div className="overflow-hidden" onWheel={handleScroll}>
      <ul
        id="search-group"
        className="flex justify-between border-y-[1px] border-y-black py-[.5rem]"
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