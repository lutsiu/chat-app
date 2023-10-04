import PhotoUpload from "../PhotoUpload";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import MobileStickyButton from "../../../../Buttons/MobileStickyButton";
import { MdDone } from "react-icons/md";
import useColor from "../../../../../../hooks/useColor";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../../../../../interfaces/redux";
import { useSocket } from "../../../../../../context/SocketContext";
import {
  setShowMyAccountSettings,
  setShowSettings,
} from "../../../../../../state/ui";
import { useEffect } from "react";
export default function UserData() {
  const [image, setImage] = useState<null | Blob>(null);
  const [userNameIsTaken, setUserNameIsTaken] = useState(false);
  const { user } = useSelector((state: ReduxState) => state.user);
  const { ui } = useSelector((state: ReduxState) => state);
  const socket = useSocket();
  const initialValues = {
    fullName: user?.fullName as  string,
    bio: user?.bio as string,
    userName: user?.userName as string,
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required(),
    bio: Yup.string().notRequired().max(70),
    userName: Yup.string().required().min(2),
  });
  const dispatch = useDispatch();
  function onSubmit(values: {
    fullName: string;
    bio: string;
    userName: string;
  }) {
    const { fullName, bio, userName } = values;
    if (fullName !== initialValues.fullName) {
      socket.emit("change-full-name", { userId: user?._id, fullName });
    }
    if (userName !== initialValues.userName) {
      socket.emit("change-user-name", { userId: user?._id, userName });
    }
    if (bio !== initialValues.bio) {
      socket.emit("change-bio", { userId: user?._id, bio });
    }
    if (image) {
      socket.emit("change-profile-picture", {
        userId: user?._id,
        picture: { file: image, fileName: image.name },
      });
    }
    dispatch(setShowMyAccountSettings());
    dispatch(setShowSettings());
  }

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const fullNameColor = useColor(
    formik.errors.fullName,
    formik.touched.fullName
  );
  const userNameColor = useColor(
    formik.errors.userName,
    formik.touched.userName
  );
  const bioColor = useColor(formik.errors.bio, formik.touched.bio);
  const hasFormChanges =
    ( 
      formik.values.fullName !== formik.initialValues.fullName) ||
    formik.values.bio !== formik.initialValues.bio ||
    formik.values.userName !== formik.initialValues.userName ||
    image;
  useEffect(() => {
    socket.emit("check-user-name-uniqueness", formik.values.userName.trim());
  }, [formik.values.userName, socket]);
  useEffect(() => {
    socket.on(
      "check-user-name-uniqueness",
      (data: { userName: string; status: number }) => {
        const { userName, status } = data;

        if (status === 200) {
          if (userName.trim() !== formik.initialValues.userName) {
            console.log(userName, formik.initialValues.userName)
            setUserNameIsTaken(true);
            formik.setErrors({'userName': 'Username is taken'})
          }
          if (userName.trim() === formik.initialValues.userName) {
            setUserNameIsTaken(false)
            formik.setErrors({'userName': undefined})
          }
        } else {
          setUserNameIsTaken(false);
        }
      }
    );
  }, [socket, formik])
  useEffect(() => {
    if (!ui.showMyAccountSettings) {
      formik.values.bio = formik.initialValues.bio;
      formik.values.fullName = formik.initialValues.fullName;
      formik.values.userName = formik.initialValues.userName;
      setImage(null);
    }
  }, [formik, ui.showMyAccountSettings]);
  return (
    <form
      className="pt-[2rem] bg-gray-800 flex flex-col"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex items-center justify-center">
        <PhotoUpload image={image} setImage={setImage} />
      </div>
      <div className="py-[2rem] px-[2.5rem] flex flex-col gap-[2rem]">
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
        <div className="flex relative">
          <motion.label
            htmlFor="bio"
            className="absolute top-[-0.7rem] left-[0.5rem] bg-gray-800 px-[0.4rem]"
            animate={{ color: bioColor }}
          >
            Bio
          </motion.label>
          <motion.input
            type="text"
            name="bio"
            maxLength={70}
            className="w-full p-[1rem] bg-transparent text-xl outline-none border-[1px] rounded-xl"
            animate={{ borderColor: bioColor }}
            value={formik.values.bio}
            onChange={formik.handleChange}
            onBlur={() => formik.setTouched({ bio: false })}
            onFocus={() => formik.setTouched({ bio: true })}
          />
          <span className="absolute bottom-[-0.7rem] bg-gray-800 px-[0.4rem] right-[1rem]">
            {70 - formik.values.bio.length}
          </span>
        </div>
        <div className="text-xl text-gray-300">
          <p>Any details such as age, occupation or city.</p>
          <p>Example: 23 y.o. designer from San Franciso</p>
        </div>
      </div>

      <div className="h-[1rem] bg-black"></div>

      <div className="py-[2rem] px-[2.5rem] flex flex-col gap-[2rem]">
        <h3 className="text-2xl font-medium text-gray-300">Username</h3>
        <div className="flex relative">
          <motion.label
            htmlFor="userName"
            className="absolute top-[-0.7rem] left-[0.5rem] bg-gray-800 px-[0.4rem]"
            animate={{ color: userNameIsTaken ? 'red' : userNameColor }}
          >
            Username
          </motion.label>
          <motion.input
            type="text"
            name="userName"
            className="w-full p-[1rem] bg-transparent text-xl outline-none border-[1px] rounded-xl"
            animate={{ borderColor: userNameIsTaken ? 'red' : userNameColor, }}
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={() => formik.setTouched({ userName: false })}
            onFocus={() => formik.setTouched({ userName: true })}
          />
        </div>
        <div className="text-xl text-gray-300">
          <p>
            You can choose a username on Telegram. If you do, people will be
            able to find you by this username and contact you without needing
            your email.
          </p>
          <p className="mt-[2rem]">
            You can use a-z, 0-9 and underscores. Minimum length is 2
            characters.
          </p>
        </div>
      </div>
      <div className="fixed bottom-[7rem] right-[7rem]">
        {!userNameIsTaken && hasFormChanges && (
          <MobileStickyButton type="submit">
            <MdDone className="text-4xl" />
          </MobileStickyButton>
        )}
      </div>
    </form>
  );
}
