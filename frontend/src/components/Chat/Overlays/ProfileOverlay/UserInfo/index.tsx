import UserPhotos from "../../../../Widgets/UserPhotos"
import UserInformation from "../../../../Widgets/Settings/ResponsiveSettings/UserInfo"
interface Props {
  email: string,
  bio: string,
  userName: string,
  userImages: string[]
}
export default function UserInfo(props: Props) {
  const {email, bio, userName, userImages} = props;
  return (
    <div>
      <UserPhotos userName={userName} photos={userImages}/>
      <div className="flex flex-col">
        <UserInformation email={email} bio={bio} userName={userName} />
      </div>
      <div className="bg-black h-[1rem]"></div>
    </div>
  )
}