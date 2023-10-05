import { useSelector } from "react-redux";
import SearchGroupPeople from "./SearchGroupPeople";
import { ReduxState } from "../../../interfaces/redux";
import FoundPeople from "./FoundPeople";
import FoundChats from "./FoundChats";

export default function SearchList() {
  const { searchBarValue } = useSelector(
    (state: ReduxState) => state.peopleSearch
  );

  return (
    <div className="flex-1 max-w-full bg-slate-800 origin-bottom  ">
      {!searchBarValue && <SearchGroupPeople />}
      {searchBarValue && <FoundPeople />}

      {searchBarValue && <FoundChats />}
    </div>
  );
}
