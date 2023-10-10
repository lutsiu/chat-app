import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function MessagesSkeleton() {
  return (
    <div>
      <Skeleton
        count={1}
        className="w-[70%] 2xl:right-[15rem] right-0 h-[7rem] absolute rounded-2xl "
        baseColor="#171f2d"
        highlightColor="#2d3d58"
      />
      <Skeleton
        count={1}
        className="w-[70%] 2xl:left-[10rem] left-0 top-[8rem] h-[10rem] absolute rounded-2xl "
        baseColor="#171f2d"
        highlightColor="#2d3d58"
      />
      <Skeleton
        count={1}
        className="w-[70%] 2xl:right-[15rem] right-0 top-[19rem] h-[15rem] absolute rounded-2xl "
        baseColor="#171f2d"
        highlightColor="#2d3d58"
      />
      <Skeleton
        count={1}
        className="w-[50%] 2xl:left-[10rem] left-0 top-[35rem] h-[8rem] absolute rounded-2xl "
        baseColor="#171f2d"
        highlightColor="#2d3d58"
      />
      <Skeleton
        count={1}
        className="w-[40%] 2xl:left-[10rem] left-0 top-[44rem] h-[7rem] absolute rounded-2xl "
        baseColor="#171f2d"
        highlightColor="#2d3d58"
      />
      <Skeleton
        count={1}
        className="w-[40%] 2xl:right-[15rem] right-0 top-[52rem] h-[7rem] absolute z-0 rounded-2xl "
        baseColor="#171f2d"
        highlightColor="#2d3d58"
      />
    </div>
  );
}
