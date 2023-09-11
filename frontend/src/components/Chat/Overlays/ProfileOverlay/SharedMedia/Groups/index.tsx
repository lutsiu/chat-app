import { Link } from "react-router-dom";
interface Props {
  groups: { title: string; groupImg: string; members: number }[];
}
export default function Groups(props: Props) {
  const { groups } = props;

  return (
    <div className="min-w-full flex-1 px-[1rem] pt-[1rem]">
      {groups.map((group, i) => {
        return (
          <Link
            to={`/${group.title}`}
            className="px-[1rem] py-[0.7rem] flex gap-[2rem] hover:bg-gray-700 rounded-xl duration-200 cursor-pointer"
            key={i}
          >
            <div className="w-[4rem] h-[4rem] overflow-hidden rounded-full">
              <img
                src={group.groupImg}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-between py-[0.1rem]">
              <h5 className="text-2xl font-medium">{group.title}</h5>
              <span className="text-gray-300 text-lg">
                {group.members} members
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
