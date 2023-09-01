interface Props {
  setShowChangeFullnamePopup: (show: boolean) => void;
  setShowChangeUsernamePopup: (show: boolean) => void;
}
export default function Overlay(props: Props) {
  const { setShowChangeFullnamePopup, setShowChangeUsernamePopup } = props;

  return (
    <div
      className="fixed w-full h-full top-0 right-0 bottom-0 left-0 z-10 "
      onClick={() => {
        setShowChangeFullnamePopup(false);
        setShowChangeUsernamePopup(false);
      }}
    ></div>
  );
}
