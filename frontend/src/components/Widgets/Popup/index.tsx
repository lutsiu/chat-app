interface Props {
  children: React.ReactNode;
  marginTop: number
}
export default function Popup(props: Props) {
  const {marginTop, children} = props
  return (
    <div
      className={`bg-purple-600 px-[1.5rem] py-[1rem] rounded-2xl w-fit mx-auto`}
      style={{marginTop: `${marginTop}rem`}}
    >
      {children}
    </div>
  );
}
