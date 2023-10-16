import { useEffect, useState } from "react"
import spinner from '../../../../../assets/tail-spin.svg'
import BACKEND_SERVER from "../../../../../utils/VARIABLES";
interface Props {
  photo: string
}
export default function Photo(props: Props) {
  const { photo } = props;
  const [src, setSrc] = useState(spinner);

  useEffect(() => {
    const image = new Image();
    image.src = `${BACKEND_SERVER}/${photo}`;

    image.onload = () => {
      setSrc(image.src);
    };
  }, [photo]);
  return (
    <div className="min-w-full max-w-full h-full flex items-center justify-center" >
      <img src={src} alt="user-photo" className="w-[35vw] h-[60vh] object-cover" />
    </div>
  )
}