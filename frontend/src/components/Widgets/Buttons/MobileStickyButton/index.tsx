interface Props {
  type: "submit" | "button";
  children: React.ReactNode;
  onClick?: () => void;
}

export default function MobileStickyButton(props: Props) {
  const { type, children } = props;

  return (
    <button
      className="absolute bg-purple-600 p-[1.3rem] rounded-full flex items-center justify-center"
      type={type}
      onClick={() => {
        props.onClick ? props.onClick() : "";
      }}
    >
      {children}
    </button>
  );
}
