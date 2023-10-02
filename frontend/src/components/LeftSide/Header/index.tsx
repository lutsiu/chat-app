import SearchBar from "../../Widgets/SearchBars/MainSearchBar";
import { IoMenuSharp } from "react-icons/io5";
import { setShowLeftMenu, setShowOverlay } from "../../../state/ui";
import { useDispatch } from "react-redux";
import { HiArrowLeft } from "react-icons/hi2";

interface Props {
  showSearchList: boolean;
  setShowSearchList: (show: boolean) => void;
}
export default function Header(props: Props) {
  const { showSearchList, setShowSearchList } = props;
  const dispatch = useDispatch();
  function hideShowSearchList() {
    setShowSearchList(false);
  }
  function handleShowSettings() {
    dispatch(setShowOverlay());
    dispatch(setShowLeftMenu());
  }
  return (
    <div className="flex bg-slate-800 px-[1.2rem] w-full items-center gap-[1rem] py-[0.8rem]">
      <div className="p-[0.6rem] rounded-full duration-200 active:bg-slate-700">
        {showSearchList && (
          <HiArrowLeft
            onClick={hideShowSearchList}
            className="text-4xl text-zinc-400 hover:text-white duration-200 cursor-pointer"
          />
        )}
        {!showSearchList && (
          <IoMenuSharp
            onClick={handleShowSettings}
            className="text-4xl text-zinc-400 hover:text-white duration-200 cursor-pointer"
          />
        )}
      </div>
      <SearchBar setShowSearchList={setShowSearchList} />
    </div>
  );
}
