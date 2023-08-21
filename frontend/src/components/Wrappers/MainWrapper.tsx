import { Outlet } from "react-router-dom";
import LeftSide from "../LeftSide";

export default function MainWrapper() {
  return (
    <main className="flex h-full">
      <div className="2xl:flex-[3.5]">
        <LeftSide/>
      </div>
      <div className="2xl:flex-[6.5]">
        <Outlet />
      </div>
    </main>
  );
}
