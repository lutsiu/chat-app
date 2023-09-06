import {motion} from 'framer-motion'
import { useState, useEffect } from 'react'
import MainHeader from './Headers/MainHeader';
import ShareMediaHeader from './Headers/ShareMediaHeader';
import UserInfo from './UserInfo';
import BottomNavigationBar from './BottomNavigationBar';
export default function ProfileOverlay() {
  const [initialHeader, setInitialHeader] = useState(true);
  return (
    <motion.div className='md:w-[42rem] h-full overflow-y-scroll bg-slate-800 absolute top-0 right-0'>
      <div className='sticky top-0 z-20 py-[0.8rem] bg-slate-800 px-[2rem]'>
        <MainHeader showHeader={initialHeader}/>
        {/* <ShareMediaHeader/> */}
      </div>
      <UserInfo/>
      <BottomNavigationBar/>
      <div className='h-[0.1rem] bg-black'></div>
    </motion.div>
  )
}