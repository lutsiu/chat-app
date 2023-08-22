import { Outlet } from "react-router-dom";
import LeftSide from "../LeftSide";
import {createPortal} from 'react-dom';
import DesktopMenu from "../Widgets/Menus/DesktopMenu";
import CreateGroupStep1 from "../Widgets/CreateGroup/Step1";
export default function MainWrapper() {




  return (
    <>
      <main className="flex h-full">
        <div className="2xl:flex-[3.5]">
          <LeftSide />
        </div>
        <div className="2xl:flex-[6.5]">
          <Outlet />
        </div>
      </main>
      {createPortal(<DesktopMenu/>, document.getElementById('overlay') as HTMLElement)}
      {createPortal(<CreateGroupStep1/>, document.getElementById('overlay') as HTMLElement)}
    </>
  );
}
