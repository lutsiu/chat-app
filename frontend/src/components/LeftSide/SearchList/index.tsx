import SearchGroupPeople from "./SearchGroupPeople";
import { motion } from "framer-motion";
interface Props {
  showSearchList: boolean;
}
export default function SearchList(props: Props) {
  const { showSearchList } = props;

  return (
    <div
      
      className="flex-1 bg-slate-800 origin-bottom"
    >
      <SearchGroupPeople />
    </div>
  );
}
