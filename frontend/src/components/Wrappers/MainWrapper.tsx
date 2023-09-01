import { Outlet } from "react-router-dom";
import LeftSide from "../LeftSide";
import {createPortal} from 'react-dom';
import DesktopMenu from "../Widgets/Menus/DesktopMenu";
import CreateGroupStep1 from "../Widgets/Group/CreateGroup/Step1";
import { useSelector } from "react-redux";
import { ReduxState } from "../../interfaces/redux";
import CreateGroupStep2 from "../Widgets/Group/CreateGroup/Step2";
import ContactsPopup from "../Widgets/Contacts/ContactsPopup";
import CreateContact from "../Widgets/Contacts/CreateContact";
import MainSettings from "../Widgets/Settings/MainSettings";
import AccountSettings from "../Widgets/Settings/AccountSettings";
export default function MainWrapper() {

  const {ui} = useSelector((state: ReduxState) => state);


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
      {ui.showCreateGroupStep2 && createPortal(<CreateGroupStep2/>, document.getElementById('overlay') as HTMLElement)}
      {createPortal(<ContactsPopup/>, document.getElementById('overlay') as HTMLElement)}
      {ui.showCreateContact && createPortal(<CreateContact/>, document.getElementById('overlay') as HTMLElement)}
      {createPortal(<MainSettings/>, document.getElementById('overlay') as HTMLElement)}
      {ui.showMyAccountSettings && createPortal(<AccountSettings/>, document.getElementById('overlay') as HTMLElement)}

    </>
  );
}
