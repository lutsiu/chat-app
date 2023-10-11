import { Outlet, useLoaderData, useLocation} from "react-router-dom";
import LeftSide from "../LeftSide";
import { createPortal } from "react-dom";
import DesktopMenu from "../Widgets/Menus/DesktopMenu";
import CreateGroupStep1 from "../Widgets/Group/CreateGroup/Step1";
import { useDispatch, useSelector } from "react-redux";
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
import ResponsiveSettings from "../Widgets/Settings/ResponsiveSettings";
import PersonalResponsiveSettings from "../Widgets/Settings/ResponsiveSettings/PersonalResponsiveSettings";
import {IMessage, UserModel} from "../../interfaces/models"
import { useEffect } from "react";
import { useSocket } from "../../context/SocketContext";
import {changeContactName, setBio, setFullName, setProfilePicture, setStatus, setUserName} from '../../state/user'
import { setContact } from "../../state/user";
import { IContact } from "../../interfaces/models";
export default function MainWrapper() {
  const { ui } = useSelector((state: ReduxState) => state);
  const userId = useSelector((state: ReduxState) => state.user.user?._id);
  const dispatch = useDispatch();
  const socket = useSocket();
  const width = useResponsive();

  const location = useLocation();
  const loaderData = useLoaderData() as {chatId: string, chatHistory: IMessage[], interlocutor: UserModel}; 
  useEffect(() => {
    socket.on('change-bio', (bio: string) => {
      console.log('change bio', bio);
      dispatch(setBio(bio));
    });
    socket.on('change-full-name', (fullName: string) => {
      dispatch(setFullName(fullName))
    })
    socket.on('change-user-name', (userName: string) => {
      dispatch(setUserName(userName))
    });
    socket.on('change-profile-picture', (filePath: string) => {
      dispatch(setProfilePicture(filePath));
    })
  }, [socket, dispatch]);
  useEffect(() => {
    socket.on("add-contact", (data: IContact | null) => {
      if (data) {
        dispatch(setContact(data));
      }
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on('change-contact-name', (data: {contactName: string, contactId: string}) => {
      const {contactId, contactName} = data
      dispatch(changeContactName({id: contactId, name: contactName}))
    })  
  }, [socket, dispatch]);

  // set status to active 
  useEffect(() => {
    socket.emit("set-status", {userId: userId, isActive: true});
    

  }, [socket, userId]); 
  useEffect(() => {
    function windowClosed() {
      socket.emit("set-status", {userId: userId, isActive: false});
    }
    window.addEventListener("beforeunload", windowClosed);
  }, [socket, userId])  
  // set status to non active, if page is not active  
  useEffect(() => {
    function checkTabVisibility() {
      if (!document.hidden) {
        // active
          socket.emit("set-status", {userId: userId, isActive: true});
      } else {
        // not active
          socket.emit("set-status", {userId: userId, isActive: false});
      }
    }
    checkTabVisibility();
    document.addEventListener("visibilitychange", checkTabVisibility);
    return () => {
      document.removeEventListener("visibilitychange", checkTabVisibility);
    }
  }, [socket, userId]);

  useEffect(() => {
    socket.on("set-status", (data: {isActive: boolean, lastTimeSeen: Date}) => {
      if (data) {
        const {isActive, lastTimeSeen} = data;
        dispatch(setStatus({isActive, lastTimeSeen}));
      }
    })
  }, [socket, dispatch]);

  return (
    <>
      <main className="flex h-full ">
        <div className="md:flex-[2.5] md:max-w-[25%] flex-1">
          <LeftSide />
        </div>
        {width > 768 && (
          <div className="flex-1">
            <Outlet context={location.pathname == '/home' ? '' : loaderData}/>
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
          {createPortal(
            <ResponsiveSettings/>,
            document.getElementById("overlay") as HTMLElement
          )}
          {createPortal(
            <PersonalResponsiveSettings/>,
            document.getElementById("overlay") as HTMLElement
          )}
          
        </>
      )}

    </>
  );
}
