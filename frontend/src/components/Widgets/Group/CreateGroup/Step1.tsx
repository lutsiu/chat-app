import { motion } from "framer-motion";
import { BsCameraFill } from "react-icons/bs";
import { FiMoreVertical } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback } from "react";
import { ReduxState } from "../../../../interfaces/redux";
import { useDropzone } from "react-dropzone";
import { setShowCreateGroupStep1, setShowCreateGroupStep2 } from "../../../../state/ui";
import { useFormik } from "formik";
import * as Yup from "yup";
import { mediumPurple, pink } from "../../../../utils/colors";
import { setGroup } from "../../../../state/createGroup";
import CancelAndNext from "../../Buttons/CancelAndNext";
export default function CreateGroupStep1() {
  const dispatch = useDispatch();
  const { ui } = useSelector((state: ReduxState) => state);
  const [image, setImage] = useState<null | Blob>(null);
  const [showChangeImg, setShowChangeImg] = useState(false);
  const onDrop = useCallback(
    (acceptedImage: Blob[]) => {
      const img = acceptedImage[0];
      setImage(img);
      // set image
    },
    [setImage]
  );

  const { getRootProps, getInputProps} = useDropzone({
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
    const {groupName} = values;
    dispatch(setGroup({groupName, groupImg: image ? image: null}))
    dispatch(setShowCreateGroupStep1());
    dispatch(setShowCreateGroupStep2());

  }

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <motion.form
    onSubmit={formik.handleSubmit}
      className="absolute md:top-[30%] 2xl:top-[40%] md:left-[35%] lg:left-[40%] 2xl:left-[40%] bg-gray-800 py-[1rem] pl-[2rem] pr-[1rem] rounded-xl flex gap-[2rem] z-[50]"
      initial={{ opacity: 0, x: 100, pointerEvents: "none" }}
      animate={{
        opacity: ui.showCreateGroupStep1 ? 1 : 0,
        x: ui.showCreateGroupStep1 ? 0 : 100,
        pointerEvents: ui.showCreateGroupStep1 ? "auto" : "none",
      }}
    >
      <div className="flex-[2] pt-[2rem]">
        <div
          {...getRootProps({
            className:
              "w-[7rem] h-[7rem] bg-purple-600 flex items-center justify-center rounded-full hover:bg-purple-500 duration-150 cursor-pointer relative",
          })}
          onMouseEnter={() => setShowChangeImg(true)}
          onMouseLeave={() => setShowChangeImg(false)}
        >
          <input {...getInputProps()} />
          {!image && <BsCameraFill className="text-5xl" />}
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
      </div>
      <div className="flex-[8] flex flex-col relative items-end">
        <div>
          <FiMoreVertical className="text-3xl text-zinc-400 cursor-pointer duration-200 hover:text-zinc-100" />
        </div>
        <div className="flex flex-col pt-[1rem] pr-[1rem]">
          <motion.label
            initial={{ color: mediumPurple }}
            animate={{ color: formik.errors.groupName ? pink : mediumPurple }}
            
            htmlFor="groupName"
            className=" text-lg font-medium"
          >
            Group name
          </motion.label>
          <motion.input
            type="text"
            name="groupName"
            value={formik.values.groupName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            initial={{ borderBottomColor: mediumPurple }}
            animate={{ borderBottomColor: formik.errors.groupName ? pink : mediumPurple }}
            className="outline-none bg-transparent border-b-[0.1rem] w-[20rem] pb-[0.3rem] text-xl "

          />
        </div>
        <div className="mt-[3.5rem]">
          <CancelAndNext/>
        </div>
      </div>
    </motion.form>
  );
}
