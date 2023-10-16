import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../../../../interfaces/redux";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { IoCheckmark } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import { setShowEditContactProfile } from "../../../../../state/ui";
import { useFormik } from "formik";
import * as Yup from "yup";
import useColor from "../../../../../hooks/useColor";
import MobileStickyButton from "../../../../Widgets/Buttons/MobileStickyButton";
import styles from "./styles.module.scss";
import { IContact } from "../../../../../interfaces/models";
import { useSocket } from "../../../../../context/SocketContext";
import { useEffect, useState } from "react";
import spinner from "../../../../../assets/tail-spin.svg";
import SkeletonElement from "../../../../Widgets/Skeletons/SkeletonElement";
import BACKEND_SERVER from "../../../../../utils/VARIABLES";
interface Props {
  setShowProfile: (show: boolean) => void;
}

export default function EditProfile(props: Props) {
  const { setShowProfile } = props;
  const { user } = useSelector((state: ReduxState) => state.user);
  const { interlocutor, dataIsLoading } = useSelector((state: ReduxState) => state.chat);
  const [contactInfo, setContactInfo] = useState<undefined | IContact>(
    undefined
  );

  const dispatch = useDispatch();
  const { showEditContactProfile } = useSelector(
    (state: ReduxState) => state.ui
  );
  const socket = useSocket();
  const initialValues = {
    fullName: contactInfo?.name as string,
  };
  function handleCloseEdit() {
    dispatch(setShowEditContactProfile());
    setShowProfile(true);
  }
  const validationSchema = Yup.object({
    fullName: Yup.string().required(),
  });

  function onSubmit(values: { fullName: string }) {
    if (dataIsLoading || !interlocutor) return; 
    const { fullName } = values;
    socket.emit("change-contact-name", {
      userId: user?._id,
      contactName: fullName,
      contactId: contactInfo?._id,
    });
    handleCloseEdit();
  }

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const fullNameColor = useColor(
    formik.errors.fullName,
    formik.touched.fullName
  );

  useEffect(() => {
    if (user?.contacts && interlocutor) {
      const contact = user?.contacts.find(
        (cont) => cont._id === interlocutor._id
      );
      if (contact) {
        setContactInfo(contact);
        formik.initialValues.fullName = contact.name;
      }
    }
  }, [interlocutor, user?.contacts, formik]);
  return (
    <motion.form
      onSubmit={formik.handleSubmit}
      className="w-full md:w-[42rem] h-full overflow-y-scroll bg-gray-900 absolute top-0 right-0 z-10"
      initial={{ x: 1000 }}
      animate={{ x: showEditContactProfile ? 0 : 1000 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex items-center bg-gray-800 py-[0.8rem]">
        <div className="px-[2rem]" onClick={handleCloseEdit}>
          <HiOutlineArrowLeft className="py-[0.7rem] rounded-full min-h-[3.7rem] min-w-[3.7rem] hover:bg-gray-700 duration-200 cursor-pointer text-gray-400" />
        </div>
        <h4 className="text-3xl font-semibold">Edit</h4>
      </div>
      <div className="flex flex-col gap-[2rem] items-center pt-[4rem] bg-gray-800">
        <div className="w-[14rem] h-[14rem] rounded-full overflow-hidden flex items-center justify-center">
          <img
            src={
              interlocutor
                ? `${BACKEND_SERVER}/${interlocutor.profilePictures.at(-1)}`
                : spinner
            }
            alt="Avatar"
            className="object-cover"
            style={{
              width: interlocutor ? "100%" : "50%",
              height: interlocutor ? "100%" : "50%",
            }}
          />
        </div>
        {dataIsLoading && <SkeletonElement count={1} className="w-[10rem] h-[3rem]"/>}
        
        {!dataIsLoading && interlocutor && <p className="text-4xl font-semibold">{interlocutor.userName}</p>}
      </div>
      <div className="py-[2rem] px-[2.5rem] flex flex-col gap-[2rem] bg-gray-800">
        <div className="flex relative">
          <motion.label
            htmlFor="fullName"
            className="absolute top-[-0.7rem] left-[0.5rem] bg-gray-800 px-[0.4rem]"
            animate={{ color: fullNameColor }}
          >
            Name (required)
          </motion.label>
          <motion.input
            type="text"
            name="fullName"
            className="w-full p-[1rem] bg-transparent text-xl outline-none border-[1px] rounded-xl"
            animate={{ borderColor: fullNameColor }}
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={() => formik.setTouched({ fullName: false })}
            onFocus={() => formik.setTouched({ fullName: true })}
          />
        </div>
      </div>
      <div className="p-[1rem] bg-gray-800 mt-[1rem]">
        <div
          className={`${styles.delete}  flex gap-[2rem] items-center px-[2rem] py-[1rem] text-red-500 duration-300 rounded-xl cursor-pointer`}
        >
          <div>
            <MdOutlineDelete className="w-[3rem] h-[3rem]" />
          </div>
          <p className="text-2xl font-medium">Delete Contact</p>
        </div>
      </div>
      <motion.div
        className="fixed right-[8rem] bottom-[7rem]"
        animate={{
          y: initialValues.fullName === formik.values.fullName ? 200 : 0,
        }}
        transition={{ bounce: 0.5, type: "spring" }}
      >
        <MobileStickyButton type="submit">
          <IoCheckmark className="text-4xl" />
        </MobileStickyButton>
      </motion.div>
    </motion.form>
  );
}
