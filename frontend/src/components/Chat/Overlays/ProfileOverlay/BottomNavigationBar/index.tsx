import { useState } from "react";
import styles from './styles.module.scss'
export default function BottomNavigationBar() {
  const [activeButton, setActiveButton] = useState(0);

  return (
    <ul className="flex justify-between">
      <li
        data-id="0"
        className="w-[20%] py-[1.5rem] hover:bg-gray-900 duration-300 text-center cursor-pointer text-xl font-medium"
        
      >
        <span className={activeButton ===0 ? styles.span : ''}>Media</span>
      </li>
      <li
        data-id="1"
        className="w-[20%] py-[1.5rem] hover:bg-gray-900 duration-300 text-center cursor-pointer text-xl font-medium"
      >
        <span className={activeButton ===1 ? styles.span : ''}>Files</span>
      </li>
      <li
        data-id="2"
        className="w-[20%] py-[1.5rem] hover:bg-gray-900 duration-300 text-center cursor-pointer text-xl font-medium"
      >
        <span className={activeButton ===2 ? styles.span : ''}>Links</span>
      </li>
      <li
        data-id="3"
        className="w-[20%] py-[1.5rem] hover:bg-gray-900 duration-300 text-center cursor-pointer text-xl font-medium"
      >
        <span className={activeButton ===3 ? styles.span : ''}>Voice</span>
      </li>
      <li
        data-id="4"
        className="w-[20%] py-[1.5rem] hover:bg-gray-900 duration-300 text-center cursor-pointer text-xl font-medium"
      >
        <span className={activeButton ===4 ? styles.span : ''}>Groups</span>
      </li>
    </ul>
  );
}
