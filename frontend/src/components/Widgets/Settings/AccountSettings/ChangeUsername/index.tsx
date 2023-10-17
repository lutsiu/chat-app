import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { mediumPurple, pink } from "../../../../../utils/colors";
import styles from "../styles.module.scss";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../../../interfaces/redux";
import { useSocket } from "../../../../../context/SocketContext";
import { useEffect, useState } from "react";
interface Props {
  showPopup: boolean;
  setShowPopup: (show: boolean) => void;
}

export default function ChangeUsername(props: Props) {
  const { setShowPopup, showPopup } = props;
  const { user } = useSelector((state: ReduxState) => state.user);
  const [error, setError] = useState(false);
  const socket = useSocket();
  const initialValues = {
    userName: user?.userName as string,
  };

  const validationSchema = Yup.object({
    userName: Yup.string().min(2).max(30).required("Required field"),
  });

  function onSubmit(values: { userName: string }) {
    if (error) return;
    socket.emit("change-user-name", {
      userId: user?._id,
      userName: values.userName.trim(),
    });
    setShowPopup(false);
    setError(false);
  }
  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  useEffect(() => {
    socket.emit("check-user-name-uniqueness", formik.values.userName.trim());
  }, [formik.values.userName, socket]);

  useEffect(() => {
    socket.on(
      "check-user-name-uniqueness",
      (data: { userName: string; status: 200 | 404 }) => {
        const { userName, status } = data;
       
        if (status === 200) {
          if (userName.trim() === formik.values.userName.trim()) {
            formik.setErrors({ userName: undefined });
            setError(false);
          }
          if (userName.trim() !== formik.values.userName.trim()) {
            formik.setErrors({ userName: "Username is used" });
            setError(true);
          }
        } else {
          setError(false);
        }
      }
    );
  }, [formik, socket]);
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
      <div
        className="absolute top-[32%] left-[50%] w-[80%] bg-gray-900 rounded-xl flex flex-col py-[1.5rem] "
        style={{ transform: "translateX(-50%)" }}
      >
        <h3 className="text-2xl px-[2rem]">Edit your name</h3>
        <form onSubmit={formik.handleSubmit} className="mt-[1rem] ">
          <div className="flex flex-col pt-[1rem] pr-[1rem] px-[2rem]">
            <motion.label
              htmlFor="userName"
              className="text-lg font-medium"
              initial={{ color: mediumPurple }}
              animate={{
                color: formik.errors.userName ? pink : mediumPurple,
              }}
            >
              @username
            </motion.label>
            <motion.input
              type="text"
              placeholder="Name"
              name="userName"
              onBlur={formik.handleBlur}
              value={formik.values.userName}
              onChange={formik.handleChange}
              maxLength={30}
              initial={{ borderBottomColor: mediumPurple }}
              animate={{
                borderBottomColor: formik.errors.userName ? pink : mediumPurple,
              }}
              className="outline-none bg-transparent border-b-[0.1rem] pb-[0.6rem] text-xl "
            />
          </div>
          <div className="mt-[1.5rem] bg-gray-800 flex flex-col gap-[1rem] text-xl text-gray-400 px-[2rem] py-[1rem]">
            <p>
              You can choose a username on Telegram. If you do, other people
              will be able to find you by this username, and contact you without
              knowing your email.
            </p>
            <p>
              You can use a-z, 0-9 and underscores.Minimum length is 2
              characters
            </p>
          </div>
          <div className="mt-[1rem] flex justify-end gap-[1rem] text-purple-500 text-xl font-medium px-[2rem] ">
            <div className="flex gap-[1rem] text-purple-500 text-xl font-medium">
              <button
                className={`${styles.button} py-[0.5rem] px-[1rem] duration-200 rounded-lg`}
                type="reset"
                onClick={() => {
                  setShowPopup(false);
                  setTimeout(() => {
                    formik.setValues({ userName: user?.userName as string });
                  }, 300);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`${styles.button} py-[0.5rem] px-[1rem] duration-200 rounded-lg`}
              >
                Change
              </button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
