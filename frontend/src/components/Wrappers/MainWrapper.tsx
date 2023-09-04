import { Outlet } from "react-router-dom";
import LeftSide from "../LeftSide";
import { createPortal } from "react-dom";
import DesktopMenu from "../Widgets/Menus/DesktopMenu";
import CreateGroupStep1 from "../Widgets/Group/CreateGroup/Step1";
import { useSelector } from "react-redux";
import { ReduxState } from "../../interfaces/redux";
import CreateGroupStep2 from "../Widgets/Group/CreateGroup/Step2";
import ContactsPopup from "../Widgets/Contacts/ContactsPopup";
import CreateContact from "../Widgets/Contacts/CreateContact";
import MainSettings from "../Widgets/Settings/MainSettings";
import AccountSettings from "../Widgets/Settings/AccountSettings";
import useResponsive from "../../hooks/useResponsive";
import DeviceMenu from "../Widgets/Menus/DeviceMenu";
import ResponsiveCreateGroupStep1 from "../Widgets/Group/CreateGroupResponsive/Step1";
import ResponsiveCreateGroupStep2 from "../Widgets/Group/CreateGroupResponsive/Step2";
import ContactsResponsive from "../Widgets/Contacts/ContactsResponsive";

export default function MainWrapper() {
  const { ui } = useSelector((state: ReduxState) => state);

  const width = useResponsive();

  return (
    <>
      <main className="flex h-full">
        <div className="md:flex-[3.5] flex-1">
          <LeftSide />
        </div>
        {width > 768 && (
          <div className="flex-[6.5]">
            <Outlet />
          </div>
        )}
      </main>
      {/* for desktops and big tablets */}
      {width >= 768 && (
        <>
          {createPortal(
            <DesktopMenu />,
            document.getElementById("overlay") as HTMLElement
          )}
          {createPortal(
            <CreateGroupStep1 />,
            document.getElementById("overlay") as HTMLElement
          )}
          {ui.showCreateGroupStep2 &&
            createPortal(
              <CreateGroupStep2 />,
              document.getElementById("overlay") as HTMLElement
            )}
          {createPortal(
            <ContactsPopup />,
            document.getElementById("overlay") as HTMLElement
          )}
          {ui.showCreateContact &&
            createPortal(
              <CreateContact />,
              document.getElementById("overlay") as HTMLElement
            )}
          {createPortal(
            <MainSettings />,
            document.getElementById("overlay") as HTMLElement
          )}
          {ui.showMyAccountSettings &&
            createPortal(
              <AccountSettings />,
              document.getElementById("overlay") as HTMLElement
            )}
        </>
      )}

      {/* for tablets and mobile phones */}
      {width < 768 && (
        <>
          {createPortal(
            <DeviceMenu />,
            document.getElementById("overlay") as HTMLElement
          )}
          {createPortal(
            <ResponsiveCreateGroupStep1 />,
            document.getElementById("overlay") as HTMLElement
          )}
          {createPortal(
            <ResponsiveCreateGroupStep2 />,
            document.getElementById("overlay") as HTMLElement
          )}
          {createPortal(
            <ContactsResponsive/>,
            document.getElementById("overlay") as HTMLElement
          )}
          {/* {ui.showCreateGroupStep2 &&
            createPortal(
              <CreateGroupStep2 />,
              document.getElementById("overlay") as HTMLElement
            )}
          {createPortal(
            <ContactsPopup />,
            document.getElementById("overlay") as HTMLElement
          )}
          {ui.showCreateContact &&
            createPortal(
              <CreateContact />,
              document.getElementById("overlay") as HTMLElement
            )}
          {createPortal(
            <MainSettings />,
            document.getElementById("overlay") as HTMLElement
          )}
          {ui.showMyAccountSettings &&
            createPortal(
              <AccountSettings />,
              document.getElementById("overlay") as HTMLElement
            )} */}
        </>
      )}

    </>
  );
}
