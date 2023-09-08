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
import styles from './styles.module.scss'
interface Props {
  setShowProfile: (show: boolean) => void;
}

export default function EditProfile(props: Props) {
  const { setShowProfile } = props;
  const dispatch = useDispatch();
  const { showEditContactProfile } = useSelector(
    (state: ReduxState) => state.ui
  );

  const initialValues = {
    fullName: "Sasha",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required(),
  });

  async function onSubmit(values: { fullName: string }) {
    try {
      console.log("");
    } catch (err) {
      console.log(err);
    }
  }

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const fullNameColor = useColor(
    formik.errors.fullName,
    formik.touched.fullName
  );

  return (
    <motion.form
      onSubmit={formik.handleSubmit}
      className="w-full md:w-[42rem] h-full overflow-y-scroll bg-gray-900 absolute top-0 right-0"
      initial={{ x: 1000 }}
      animate={{ x: showEditContactProfile ? 0 : 1000 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex items-center bg-gray-800 py-[0.8rem]">
        <div
          className="px-[2rem]"
          onClick={() => {
            dispatch(setShowEditContactProfile());
            setShowProfile(true);
          }}
        >
          <HiOutlineArrowLeft className="py-[0.7rem] rounded-full min-h-[3.7rem] min-w-[3.7rem] hover:bg-gray-700 duration-200 cursor-pointer text-gray-400" />
        </div>
        <h4 className="text-3xl font-semibold">Edit</h4>
      </div>
      <div className="flex flex-col gap-[2rem] items-center pt-[4rem] bg-gray-800">
        <div className="w-[14rem] h-[14rem] rounded-full overflow-hidden">
          <img
            src="https://sklepotaku.pl/userdata/public/news/images/4.jpg"
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-4xl font-semibold">{`Username`}</p>
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
        <div className={`${styles.delete}  flex gap-[2rem] items-center px-[2rem] py-[1rem] text-red-500 duration-300 rounded-xl cursor-pointer`}>
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
