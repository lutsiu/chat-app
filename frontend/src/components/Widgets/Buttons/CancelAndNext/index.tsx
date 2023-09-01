import styles from './styles.module.scss';
import { useDispatch } from 'react-redux';
import { hideEverything } from '../../../../state/ui';

export default function CancelAndNext() {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-[1rem] text-purple-500 text-xl font-medium">
      <button
        className={`${styles.button} py-[0.5rem] px-[1rem] duration-200 rounded-lg`}
        onClick={(e) => {
          e.preventDefault();
          dispatch(hideEverything());
        }}
      >
        Cancel
      </button>
      <button
        type="submit"
        className={`${styles.button} py-[0.5rem] px-[1rem] duration-200 rounded-lg`}
      >
        Next
      </button>
    </div>
  );
}
