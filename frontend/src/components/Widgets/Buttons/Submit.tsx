import {mediumPurple, black, white, gray, darkGray, blackPurple} from '../../../utils/colors';

interface Props {
  children: React.ReactNode;
  disabled: boolean;
}

export default function SubmitButton(props: Props) {
  const {children, disabled} = props;
  return (
    <button
      type="submit"
      disabled={disabled}
      className="2xl:w-[30rem]  rounded-2xl p-[1rem] text-2xl font-medium"
      style={{background: disabled ? darkGray : blackPurple, cursor: disabled ? 'default': 'pointer'}}
    >
      {children}
    </button>
  );
}
