import {FiSettings} from 'react-icons/fi'
import {AiOutlineBell} from 'react-icons/ai';
import {BsDatabase, BsFolder2Open} from 'react-icons/bs';
import {HiOutlineLockClosed} from 'react-icons/hi'
import {MdDevices} from 'react-icons/md';
import {IoLanguageOutline} from 'react-icons/io5';
export default function SettingsList() {

  return (
    <ul className='w-full '>
      <li className='px-[1rem] py-[1.3rem] flex items-center gap-[2.5rem] bg-gray-800  active:bg-gray-700 duration-150'>
        <FiSettings className="text-gray-300 text-2xl" />
        <p className='text-xl'>General Settings</p>
      </li>
      <li className='px-[1rem] py-[1.3rem] flex items-center gap-[2.5rem] bg-gray-800  active:bg-gray-700 duration-150'>
        <AiOutlineBell className="text-gray-300 text-2xl" />
        <p className='text-xl'>Notifications</p>
      </li>
      <li className='px-[1rem] py-[1.3rem] flex items-center gap-[2.5rem] bg-gray-800  active:bg-gray-700 duration-150'>
        <BsDatabase className="text-gray-300 text-2xl" />
        <p className='text-xl'>Data and Storage</p>
      </li>
      <li className='px-[1rem] py-[1.3rem] flex items-center gap-[2.5rem] bg-gray-800  active:bg-gray-700 duration-150'>
        <BsFolder2Open className="text-gray-300 text-2xl" />
        <p className='text-xl'>Chat Folders</p>
      </li>
      <li className='px-[1rem] py-[1.3rem] flex items-center gap-[2.5rem] bg-gray-800  active:bg-gray-700 duration-150'>
        <HiOutlineLockClosed className="text-gray-300 text-2xl" />
        <p className='text-xl'>Privacy and security</p>
      </li>
      <li className='px-[1rem] py-[1.3rem] flex items-center gap-[2.5rem] bg-gray-800  active:bg-gray-700 duration-150'>
        <MdDevices className="text-gray-300 text-2xl" />
        <p className='text-xl'>Devices</p>
      </li>
      <li className='px-[1rem] py-[1.3rem] flex items-center gap-[2.5rem] bg-gray-800  active:bg-gray-700 duration-150'>
        <IoLanguageOutline className="text-gray-300 text-2xl" />
        <p className='text-xl'>Language</p>
      </li>
    </ul>
  )
}