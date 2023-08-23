import { FiUser } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { motion } from "framer-motion";
import { gray, mediumPurple, pink } from "../../../../utils/colors";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "../styles.module.scss";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  hideEverything,
  setShowContacts,
  setShowCreateContact,
} from "../../../../state/ui";
export default function CreateContact() {
  const dispatch = useDispatch();
  const [nameColor, setNameColor] = useState(gray);
  const [emailColor, setEmailColor] = useState(gray);
  const initialValues = {
    contactName: "",
    contactEmail: "",
  };

  const validationSchema = Yup.object({
    contactName: Yup.string().required(),
    contactEmail: Yup.string().required().email("Enter valid email address"),
  });

  async function onSubmit(values: {
    contactName: string;
    contactEmail: string;
  }): Promise<void> {
    try {
    } catch (err) {
      console.log(err);
    }
  }

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  useEffect(() => {
    if (!formik.touched.contactName && !formik.errors.contactName) {
      setNameColor(gray);
    }
    if (formik.values.contactName && !formik.errors.contactName) {
      setNameColor(mediumPurple);
    }
    if (formik.values.contactName && formik.errors.contactName) {
      setNameColor(pink);
    }
    if (!formik.touched.contactEmail && !formik.errors.contactEmail) {
      setEmailColor(gray);
    }
    if (formik.values.contactEmail && !formik.errors.contactEmail) {
      setEmailColor(mediumPurple);
    }
    if (formik.values.contactEmail && formik.errors.contactEmail) {
      setEmailColor(pink);
    }
  }, [formik]);

  return (
    <form
      className="absolute top-[50%] left-[50%] bg-gray-900 pt-[1.5rem] pb-[1rem] pl-[2rem] rounded-2xl 2xl:w-[35rem]"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <h3 className="text-2xl font-medium">New Contact</h3>
      <div className="flex items-end gap-[2.5rem] mt-[1rem]">
        <div className="pb-[0.3rem]">
          <FiUser className="text-4xl text-zinc-500" />
        </div>
        <div className="flex flex-col pt-[1rem] pr-[1rem]">
          <motion.label
            animate={{ color: nameColor }}
            htmlFor="contactName"
            className=" text-lg font-medium mb-[0.4rem]"
          >
            Name
          </motion.label>
          <motion.input
            type="text"
            name="contactName"
            autoFocus
            value={formik.values.contactName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            animate={{
              borderBottomColor: nameColor,
            }}
            className="outline-none bg-transparent border-b-[0.1rem] w-[26rem]  pb-[1rem] text-xl "
          />
        </div>
      </div>
      <div className="flex items-end gap-[2.5rem] mt-[2rem]">
        <div className="pb-[0.3rem]">
          <MdOutlineMailOutline className="text-4xl text-zinc-500" />
        </div>
        <div className="flex flex-col pt-[1rem] pr-[1rem]">
          <motion.label
            animate={{
              color: emailColor,
            }}
            htmlFor="contactEmail"
            className=" text-lg font-medium mb-[0.4rem]"
          >
            Email
          </motion.label>
          <motion.input
            type="text"
            name="contactEmail"
            value={formik.values.contactEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            animate={{
              borderBottomColor: emailColor,
            }}
            className="outline-none bg-transparent border-b-[0.1rem] w-[26rem] pb-[1rem] text-xl "
          />
        </div>
      </div>
      <div className="mt-[2.5rem] flex justify-end pr-[1rem] gap-[1rem] text-purple-500 text-xl font-medium">
        <button
          className={`${styles.button} py-[0.5rem] px-[1rem] duration-200 rounded-lg`}
          onClick={(e) => {
            e.preventDefault();
            dispatch(setShowCreateContact());
            dispatch(setShowContacts());
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`${styles.button} py-[0.5rem] px-[1rem] duration-200 rounded-lg`}
          onClick={() => dispatch(hideEverything())}
        >
          Create
        </button>
      </div>
    </form>
  );
}
