import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../../../../interfaces/redux";
import { mediumPurple, pink } from "../../../../../utils/colors";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSocket } from "../../../../../context/SocketContext";
import { setShowCreateContact } from "../../../../../state/ui";
import { addContactEmail } from "../../../../../state/createContact";

export default function CreateContactResponsive() {
  const { ui } = useSelector((state: ReduxState) => state);
  const { user } = useSelector((state: ReduxState) => state.user);
  const {contactEmail} = useSelector((state:ReduxState) => state.createContact);
  const socket = useSocket();
  const dispatch = useDispatch();
  const initialValues = {
    userName: "",
    email: contactEmail,
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required().min(2),
    email: Yup.string().required().email("Enter valid email address"),
  });

  function resetForm() {
    dispatch(addContactEmail(''))
    dispatch(setShowCreateContact());
      formik.setTouched({ email: false });
      formik.setTouched({ userName: false });
      formik.setErrors({ email: undefined });
      formik.setErrors({ userName: undefined });
  }
  function onSubmit(values: { userName: string; email: string }) {
    const { userName, email } = values;
    socket.emit("add-contact", {
      name: userName,
      email: email,
      userId: user?._id,
    });
    resetForm();
    
  }

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  function handleCloseOverlay(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = e.target as HTMLElement;
    if (target.classList.contains("create-contact-overlay")) {
      resetForm();
    }
  }

  return (
    <motion.div
      className="create-contact-overlay fixed top-0 bottom-0 right-0 left-0 z-[30]"
      style={{ background: "rgba(0,0,0,.5)" }}
      initial={{ opacity: 0, pointerEvents: "none" }}
      animate={{
        opacity: ui.showCreateContact ? 1 : 0,
        pointerEvents: ui.showCreateContact ? "all" : "none",
      }}
      transition={{ duration: 0.5 }}
      onMouseDown={handleCloseOverlay}
    >
      <motion.div>
        <motion.form
        onSubmit={formik.handleSubmit}
        initial={{ y: 300 }}
        animate={{ y: ui.showCreateContact ? 0 : 300 }}
        className="absolute bottom-0 w-full h-[35%] bg-gray-800 rounded-t-3xl p-[1.5rem] flex flex-col gap-[1.5rem]"
      >
        <h2 className="text-2xl font-medium">New contact</h2>
        <div className="relative">
          <motion.label
            htmlFor="userName"
            className="absolute bg-gray-800 top-[-0.6rem] left-[1rem] px-[0.6rem]"
            animate={{
              color:
                formik.errors.userName && formik.touched.userName
                  ? pink
                  : mediumPurple,
            }}
          >
            Name
          </motion.label>
          <motion.input
            name="userName"
            className="bg-transparent w-full outline-none border-[2px]  rounded-md p-[1rem] text-xl"
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            animate={{
              borderColor:
                formik.errors.userName && formik.touched.userName
                  ? pink
                  : mediumPurple,
            }}
          />
        </div>
        <div className="relative">
          <motion.label
            htmlFor="email"
            className="absolute bg-gray-800 top-[-0.6rem] left-[1rem] px-[0.6rem]"
            animate={{
              color:
                formik.errors.email && formik.touched.email
                  ? pink
                  : mediumPurple,
            }}
          >
            Email
          </motion.label>
          <motion.input
            name="email"
            className="bg-transparent w-full outline-none border-[2px]  rounded-md p-[1rem] text-xl"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            animate={{
              borderColor:
                formik.errors.email && formik.touched.email
                  ? pink
                  : mediumPurple,
            }}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 py-[1rem] rounded-xl active:bg-purple-700 text-xl font-medium"
        
        >
          Create new contact
        </button>
      </motion.form>
      </motion.div>
    </motion.div>
  );
}
