import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
interface Props {
  count: number;
  className: string;
  containerClassName?:string
  width?: number
}

export default function SkeletonElement(props: Props) {
  const { count, className, containerClassName, width } = props;
  return (
    <SkeletonTheme>
      <Skeleton
        count={count}
        className={className}
        containerClassName={containerClassName}
        style={{width: width ? `${width}px`: ""}}
        baseColor="#171f2d"
        highlightColor="#2d3d58"
        duration={1}
      />
    </SkeletonTheme>
  );
}
