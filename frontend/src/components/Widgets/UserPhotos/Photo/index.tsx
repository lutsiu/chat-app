import { useEffect, useState } from "react";
import spinner from "../../../../assets/tail-spin.svg";
import SkeletonElement from "../../Skeletons/SkeletonElement";
import BACKEND_SERVER from "../../../../utils/VARIABLES";

interface Props {
  photo: string;
}

export default function Photo(props: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const { photo } = props;
  const [src, setSrc] = useState(spinner);
  function handleOnLoad() {
    setIsLoading(false);
  }
  useEffect(() => {
    const image = new Image();
    image.src = `${BACKEND_SERVER}/${photo}`;

    image.onload = () => {
      setIsLoading(false);
      setSrc(image.src);
    };
  }, [photo]);
  return (
    <>
      {isLoading && <SkeletonElement count={1} className="h-[50rem] w-[50rem]" />}
      {!isLoading && (
        <img
          src={src}
          loading="lazy"
          className="h-full object-cover block min-w-full max-w-full"
          onLoad={handleOnLoad}
        />
      )}
    </>
  );
}
