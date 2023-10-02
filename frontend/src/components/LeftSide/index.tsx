import ChatListItem from "../ChatListItem";
import styles from "./styles.module.scss";
import SearchList from "./SearchList";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../interfaces/redux";
import { useEffect } from "react";
import {
  setSearchBarIsActive,
  setSearchBarValue,
} from "../../state/peopleSearch";
export default function LeftSide() {
  const { searchBarIsActive } = useSelector(
    (state: ReduxState) => state.peopleSearch
  );
  const dispatch = useDispatch();
  useEffect(() => {
    function resetRedux() {
      dispatch(setSearchBarIsActive(false));
      dispatch(setSearchBarValue(""));
    }
    window.addEventListener("beforeunload", resetRedux);
    return () => {
      window.removeEventListener("beforeunload", resetRedux);
    };
  }, [dispatch]);
  return (
    <div className="w-full h-full flex flex-col max-h-[100vh] overflow-hidden">
      <Header />
      {!searchBarIsActive && (
        <ul
          className={`${styles.chatsList} bg-slate-800 h-full  flex flex-col overflow-y-scroll `}
        >
          <ChatListItem />
        </ul>
      )}
      {searchBarIsActive && <SearchList />}
    </div>
  );
}
