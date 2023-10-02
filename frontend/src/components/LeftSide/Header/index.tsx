import SearchBar from "../../Widgets/SearchBars/MainSearchBar";
import { IoMenuSharp } from "react-icons/io5";
import { setShowLeftMenu, setShowOverlay } from "../../../state/ui";
import { useDispatch } from "react-redux";
import { HiArrowLeft } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../interfaces/redux";
import { setSearchBarIsActive, setSearchBarValue } from "../../../state/peopleSearch";

export default function Header() {
  const {searchBarIsActive} = useSelector((state: ReduxState) => state.peopleSearch)

  const dispatch = useDispatch();
  function hideShowSearchList() {
    dispatch(setSearchBarIsActive(false));
    dispatch(setSearchBarValue(''))
  }
  function handleShowSettings() {
    dispatch(setShowOverlay());
    dispatch(setShowLeftMenu());
  }
  return (
    <div className="flex bg-slate-800 px-[1.2rem] w-full items-center gap-[1rem] py-[0.8rem]">
      <div className="p-[0.6rem] rounded-full duration-200 active:bg-slate-700">
        {searchBarIsActive && (
          <HiArrowLeft
            onClick={hideShowSearchList}
            className="text-4xl text-zinc-400 hover:text-white duration-200 cursor-pointer"
          />
        )}
        {!searchBarIsActive && (
          <IoMenuSharp
            onClick={handleShowSettings}
            className="text-4xl text-zinc-400 hover:text-white duration-200 cursor-pointer"
          />
        )}
      </div>
      <SearchBar/>
    </div>
  );
}
