import UserPhotos from "../../../../Widgets/UserPhotos"
import {HiOutlineMail, HiOutlineAtSymbol, HiBell} from 'react-icons/hi'
import UserInformation from "../../../../Widgets/Settings/ResponsiveSettings/UserInfo"
export default function UserInfo() {

  return (
    <div>
      <UserPhotos/>
      <div className="flex flex-col">
        <UserInformation email="yasv229@gmail.com" bio="bio" userName="lutsiu" />
      </div>
      <div className="bg-black h-[1rem]"></div>
    </div>
  )
}