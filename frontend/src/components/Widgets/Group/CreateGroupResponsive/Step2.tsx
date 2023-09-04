import { motion } from "framer-motion";
import { BsCameraFill } from "react-icons/bs";
import { MdDone } from "react-icons/md";
import { HiMiniArrowLeft } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback } from "react";
import { ReduxState } from "../../../../interfaces/redux";
import { useDropzone } from "react-dropzone";
import {
  hideEverything,
  setShowCreateGroupStep1,
  setShowCreateGroupStep2,
} from "../../../../state/ui";
import { useFormik } from "formik";
import * as Yup from "yup";
import MobileStickyButton from "../../Buttons/MobileStickyButton";
import { setGroup } from "../../../../state/createGroup";
import { mediumPurple, pink } from "../../../../utils/colors";
export default function ResponsiveCreateGroupStep2() {
  const dispatch = useDispatch();
  const { ui } = useSelector((state: ReduxState) => state);
  const [image, setImage] = useState<null | Blob>(null);
  const [leftArrowIsActive, setLeftArrowIsActive] = useState(false);
  const [showChangeImg, setShowChangeImg] = useState(false);
  const onDrop = useCallback(
    (acceptedImage: Blob[]) => {
      const img = acceptedImage[0];
      setImage(img);
      // set image
    },
    [setImage]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
    },
  });

  const initialValues = {
    groupName: "",
  };

  const validationSchema = Yup.object({
    groupName: Yup.string().required("Required field"),
  });

  function onSubmit(values: { groupName: string }) {
    const { groupName } = values;
    dispatch(setGroup({ groupName, groupImg: image ? image : null }));
    dispatch(hideEverything());
  }
  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  console.log(formik.errors.groupName);
  return (
    <motion.form
      onSubmit={formik.handleSubmit}
      className="fixed top-0 bottom-0 w-full h-full bg-gray-900 rounded-xl"
      initial={{ opacity: 0, x: 100, pointerEvents: "none" }}
      animate={{
        opacity: ui.showCreateGroupStep2 ? 1 : 0,
        x: ui.showCreateGroupStep2 ? 0 : 100,
        pointerEvents: ui.showCreateGroupStep2 ? "auto" : "none",
      }}
    >
      <div className="flex pl-[1.3rem] py-[0.5rem] gap-[1.5rem]  mb-[1rem] items-center bg-gray-800">
        <div
          className="p-[0.7rem] rounded-full"
          style={{
            backgroundColor: leftArrowIsActive ? "rgba(55, 65, 81, 0.5)" : "",
          }}
        >
          <HiMiniArrowLeft
            className="text-4xl"
            onTouchStart={() => setLeftArrowIsActive(true)}
            onTouchEnd={() => setLeftArrowIsActive(false)}
            onClick={() => {
              dispatch(setShowCreateGroupStep2());
              dispatch(setShowCreateGroupStep1());
              formik.setErrors({});
            }}
          />
        </div>
        <div className="flex flex-col gap-[0.3rem]">
          <span className="text-2xl font-medium tracking-wide">New group</span>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-[2rem] pl-[1.3rem]">
          <div
            {...getRootProps({
              className:
                "w-[5.5rem] h-[5.5rem] bg-purple-600 flex items-center justify-center rounded-full  duration-150 cursor-pointer relative",
            })}
            onMouseEnter={() => setShowChangeImg(true)}
            onMouseLeave={() => setShowChangeImg(false)}
          >
            <input {...getInputProps()} />
            {!image && <BsCameraFill className="text-3xl" />}
            {image && (
              <>
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={URL.createObjectURL(image)}
                />

                <div
                  className="absolute top-0 left-0 w-full h-full flex justify-center items-center rounded-full"
                  style={{
                    background: "rgba(0,0,0,0.5)",
                    pointerEvents: showChangeImg ? "auto" : "none",
                    opacity: showChangeImg ? 1 : 0,
                  }}
                >
                  <BsCameraFill className="text-5xl" />
                </div>
              </>
            )}
          </div>
          <div className="flex-1 pr-[2rem]">
            <motion.input
              type="text"
              name="groupName"
              placeholder="Name the group"
              value={formik.values.groupName}
              autoFocus
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              initial={{ borderBottomColor: mediumPurple }}
              animate={{
                borderBottomColor: formik.errors.groupName && formik.touched.groupName
                  ? pink
                  : mediumPurple,
              }}
              className="outline-none bg-transparent border-b-[0.1rem] text-xl w-full pb-[0.1rem]"
            />
          </div>
        </div>
      </div>
      <div className="fixed bottom-[6rem] right-[6rem]">
        <MobileStickyButton type="submit">
          <MdDone className="text-4xl" />
        </MobileStickyButton>
      </div>
    </motion.form>
  );
}
