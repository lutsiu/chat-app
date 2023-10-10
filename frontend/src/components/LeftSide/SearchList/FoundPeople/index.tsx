import { useState } from "react";
/* import useHorizonalScroll from "../../../../hooks/useHorizontalScroll"; */
import Person from "./Person";
import { useEffect } from "react";
import useResponsive from "../../../../hooks/useResponsive";
import { FoundContact } from "..";
import SkeletonElement from "../../../Widgets/Skeletons/SkeletonElement";
interface Props {
  people: FoundContact[];
  dataIsLoading: boolean
}
export default function FoundPeople(props: Props) {
  const { people, dataIsLoading } = props;
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
    if (!ul || !ul.lastElementChild) return;
    setWidth(ul.offsetWidth);

    const lastPerson = ul.lastElementChild as HTMLElement;
    setLastPersonWidth(lastPerson.offsetWidth);
    setLastPersonOffsetLeft(lastPerson.offsetLeft);
  }, [translateX, translateX]);

  function handleScroll(e: any) {
    if (people.length === 0) return;
    if (width && lastPersonWidth && width > lastPersonWidth * people.length)
      return;
    const delta = e.deltaY;
    if (delta < 0 && translateX !== 0) {
      setTranslateX((prev) => prev + 20);
    }
    if (width && lastPersonOffsetLeft && lastPersonWidth) {
      if (screenWidth < 768) {
        const amountOfPeopleWithinScreen = screenWidth / lastPersonWidth;
        console.log(width, translateX);
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
    <div className="overflow-hidden" onWheel={handleScroll}>
      <ul
        id="found-people"
        className={`flex gap-[1rem] py-[.5rem] pl-[1.7rem] max-w-[100vw] border-y-black border-y-[1px]`}
        style={{ transform: `translateX(${translateX}px)` }}
      >
        {people.map((person, i) => {
          const { profilePicture, name, userName } = person;
          return (
            <Person
              key={i}
              profilePicture={profilePicture}
              fullName={name}
              userName={userName}
            />
          );
        })}
        {people.length === 0 && dataIsLoading && (
          <SkeletonElement
            count={10}
            className="h-[3rem] rounded-xl"
            width={width ? width / 5 : undefined}
            containerClassName="flex gap-[.5rem]"
          />
        )}
        {people.length === 0 && !dataIsLoading && (
          <p className="text-xl">We didn't find any contacts</p>
        )}
      </ul>
    </div>
  );
}
