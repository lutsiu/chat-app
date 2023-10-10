import { AiOutlineMail } from "react-icons/ai";
import { HiAtSymbol } from "react-icons/hi";
import { MdInfoOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../../../interfaces/redux";
import SkeletonElement from "../../../Skeletons/SkeletonElement";
interface Props {
  userName: string | undefined;
  email: string | undefined;
  bio: string | undefined;
}
export default function UserInformation(props: Props) {
  const { userName, email, bio } = props;
  const {dataIsLoading} = useSelector((state: ReduxState) => state.chat)
  return (
    <div className="flex-col bg-gray-800">
      <div className="flex gap-[2rem] py-[1rem] px-[1rem] items-center hover:bg-gray-700 duration-200 rounded-xl cursor-pointer">
        <div>
          <AiOutlineMail className="text-3xl text-gray-400" />
        </div>
        <div className="flex flex-col gap-[0.2rem]">
          {!dataIsLoading && email && <span className="text-xl">{`@${email}`}</span>}
          {dataIsLoading && <SkeletonElement count={1} className="w-[10rem] h-[1rem]"/>}
          <span className="text-gray-300 text-lg">Email</span>
        </div>
      </div>
      <div className="flex gap-[2rem] py-[1rem] px-[1rem] items-center hover:bg-gray-700 duration-200 rounded-xl cursor-pointer">
        <div>
          <HiAtSymbol className="text-3xl text-gray-400" />
        </div>
        <div className="flex flex-col gap-[0.2rem]">
        {!dataIsLoading && userName && <span className="text-xl">{userName}</span>}
          {dataIsLoading && <SkeletonElement count={1} className="w-[10rem] h-[1rem]"/>}
          <span className="text-gray-300 text-lg">Username</span>
        </div>
      </div>
      <div className="flex gap-[2rem] py-[1rem] px-[1rem] items-center hover:bg-gray-700 duration-200 rounded-xl cursor-pointer">
        <div>
          <MdInfoOutline className="text-3xl text-gray-400" />
        </div>
        <div className="flex flex-col gap-[0.2rem]">
          {!dataIsLoading && bio && <span className="text-xl">{bio}</span>}
          {dataIsLoading  && <SkeletonElement count={1} className="w-[10rem] h-[1rem]"/>}
          <span className="text-gray-300 text-lg">Bio</span>
        </div>
      </div>
    </div>
  );
}
