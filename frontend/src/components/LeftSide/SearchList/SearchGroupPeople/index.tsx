import { useState } from "react";
import Person from "./Person";

export default function SearchGroupPeople() {
  const [translateX, setTranslateX] = useState(0);
  
  const resultsLength = 10;
  /* for 100 % of parent width i can fit 5 people,
   so every extra person = 20% of width,
    hence you multiply number of extra people per 20%
    e.g : length = 15. 15 - 5 = 10; 10 * 20 = 200 %. so you can translate max for -200%
    */
   const translateMinExtremum = -(resultsLength - 5) * 20;
  function handleScroll(e:any) {
    const delta = e.deltaY;
    if (delta < 0 && translateX !== 0) {
      setTranslateX(prev => prev + 5);
    }
    if (delta > 0 && translateX > translateMinExtremum) {
      setTranslateX(prev => prev - 5);
    }
  }
  return (
    <div className="overflow-hidden" onWheel={handleScroll}>
      <ul

        className="flex justify-between border-y-[1px] border-y-black py-[.5rem]"
        style={{ transform: `translateX(${translateX}%)` }}
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
