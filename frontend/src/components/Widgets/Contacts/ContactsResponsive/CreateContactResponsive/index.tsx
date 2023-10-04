import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../../../interfaces/redux";
import { mediumPurple, pink } from "../../../../../utils/colors";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSocket } from "../../../../../context/SocketContext";

export default function CreateContactResponsive() {
  const { ui } = useSelector((state: ReduxState) => state);

  const initialValues = {
    userName: "",
    email: "",
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required(),
    email: Yup.string().email().required(),
  });

  async function onSubmit(values: {
    userName: string;
    email: string;
  }): Promise<void> {
    try {
      console.log("");
    } catch (err) {
      console.log(err);
    }
  }

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <motion.form
      onSubmit={formik.handleSubmit}
      animate={{ y: ui.showCreateContact ? 0 : 300 }}
      className="absolute bottom-0 w-full h-[35%] bg-gray-800 rounded-t-3xl p-[1.5rem] flex flex-col gap-[1.5rem]"
    >
      <h2 className="text-2xl font-medium">New contact</h2>
      <div className="relative">
        <motion.label
          htmlFor="userName"
          className="absolute bg-gray-800 top-[-0.6rem] left-[1rem] px-[0.6rem]"
          animate={{color: formik.errors.userName && formik.touched.userName ? pink : mediumPurple}}
        >
          Name
        </motion.label>
        <motion.input
          name="userName"
          className="bg-transparent w-full outline-none border-[2px]  rounded-md p-[1rem] text-xl"
          value={formik.values.userName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          animate={{borderColor: formik.errors.userName && formik.touched.userName ? pink : mediumPurple}}
        />
      </div>
      <div className="relative">
        <motion.label
          htmlFor="email"
          className="absolute bg-gray-800 top-[-0.6rem] left-[1rem] px-[0.6rem]"
          animate={{color: formik.errors.email && formik.touched.email ? pink : mediumPurple}}
        >
          Email
        </motion.label>
        <motion.input
          name="email"
          className="bg-transparent w-full outline-none border-[2px]  rounded-md p-[1rem] text-xl"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          animate={{borderColor: formik.errors.email && formik.touched.email ? pink : mediumPurple}}
        />
      </div>
      <button type="submit" className="w-full bg-purple-600 py-[1rem] rounded-xl active:bg-purple-700 text-xl font-medium">Create new contact</button>
    </motion.form>
  );
}
