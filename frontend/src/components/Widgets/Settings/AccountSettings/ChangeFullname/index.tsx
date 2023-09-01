import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { mediumPurple, pink } from "../../../../../utils/colors";
import styles from "../styles.module.scss";
interface Props {
  showPopup: boolean;
  setShowPopup: (show: boolean) => void;
}

export default function ChangeFullname(props: Props) {
  const { setShowPopup, showPopup } = props;
  const initialValues = {
    fullName: "fullname",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().min(2).max(30).required("Required field"),
  });

  async function onSubmit(values: { fullName: string }): Promise<void> {
    try {
      setShowPopup(false);
    } catch (err) {
      console.log(err);
    }
  }
  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  return (
    <motion.div
      initial={{ opacity: 0, pointerEvents: "none" }}
      animate={{
        opacity: showPopup ? 1 : 0,
        pointerEvents: showPopup ? "auto" : "none",
      }}
      className="absolute w-full h-full top-0 right-0 bottom-0 left-0 z-20"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="w-full h-full relative">
        <div
          className="absolute top-[60%] left-[50%] w-[80%] bg-gray-800 rounded-xl flex flex-col py-[1.5rem] px-[2rem]"
          style={{ transform: "translateX(-50%)" }}
        >
          <h3 className="text-2xl">Edit your name</h3>
          <form onSubmit={formik.handleSubmit} className="mt-[2rem]">
            <div className="flex flex-col pt-[1rem] pr-[1rem]">
              <motion.label
                htmlFor="fullName"
                className="text-lg font-medium"
                initial={{ color: mediumPurple }}
                animate={{
                  color: formik.errors.fullName ? pink : mediumPurple,
                }}
              >
                Name
              </motion.label>
              <motion.input
                type="text"
                placeholder="Name"
                name="fullName"
                onBlur={formik.handleBlur}
                value={formik.values.fullName}
                onChange={formik.handleChange}
                maxLength={30}
                initial={{ borderBottomColor: mediumPurple }}
                animate={{
                  borderBottomColor: formik.errors.fullName
                    ? pink
                    : mediumPurple,
                }}
                className="outline-none bg-transparent border-b-[0.1rem] pb-[0.6rem] text-xl "
              />
            </div>
            <div className="mt-[3.5rem] flex justify-end gap-[1rem] text-purple-500 text-xl font-medium">
              <div className="flex gap-[1rem] text-purple-500 text-xl font-medium">
                <button
                  className={`${styles.button} py-[0.5rem] px-[1rem] duration-200 rounded-lg`}
                  onClick={(e) => {
                    setShowPopup(false);
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
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
