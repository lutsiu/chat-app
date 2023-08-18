import useSetColor from "../../../hooks/useSetColor";
import { useFormik } from "formik";
import * as Yup from "yup";
import SubmitButton from "../../Widgets/Buttons/Submit";
import { useState, useEffect } from "react";
import PhotoUpload from "../../Widgets/PhotoUpload";
interface Props {
  setStep: (step: number) => void;
}

export default function FormStep3(props: Props) {
  const [initialDisabled, setInitialDisabled] = useState(true);
  const [formError, setFormError] = useState(false);
  const [image, setImage] = useState<null | Blob>(null);
  const initialValues = {
    userName: "",
    fullName: "",
    bio: "",
  };

  const validationSchema = Yup.object({
    userName: Yup.string()
      .min(2, "User name should be at least 2 characters long")
      .max(20, "User name can't be longer than 20 characters")
      .required("Required field"),
    fullName: Yup.string()
      .min(2, "Full name should be at least 2 characters long")
      .max(30, "User name can't be longer than 30 characters")
      .required("Required field"),
    bio: Yup.string()
      .required("Required field")
      .max(50, "Bio can't be longer than 50 characters"),
  });

  async function onSubmit(values: {
    userName: string;
    fullName: string;
    bio: string;
  }): Promise<void> {
    try {
      console.log("function");
    } catch (err) {
      console.log(err);
    }
  }

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const userNameColor = useSetColor(
    initialDisabled,
    formik.errors.userName,
    formik.touched.userName
  );

  const fullNameColor = useSetColor(
    initialDisabled,
    formik.errors.fullName,
    formik.touched.fullName
  );

  const bioColor = useSetColor(
    initialDisabled,
    formik.errors.bio,
    formik.touched.bio
  );

  useEffect(() => {
    if (formik.touched.userName || formik.touched.fullName || formik.touched.bio) {
      setInitialDisabled(false);
    }
    if (formik.errors.userName || formik.errors.fullName || formik.errors.bio) {
      setFormError(true);
    } else {
      setFormError(false);
    }
  }, [formik.touched, formik.errors]);

  return (
    <form
      className="w-fit mx-auto flex flex-col gap-[1.3rem]"
      onSubmit={formik.handleSubmit}
    >
      <div className="2xl:max-w-[30rem] flex justify-between px-[0.2rem]">
        <div>
          <h2 className="text-2xl mt-[1rem] font-bold">Your info</h2>
          <p className="mt-[1rem] text-lg">Enter all necessary info about you</p>
        </div>
        <PhotoUpload image={image} setImage={setImage} />
      </div>
      <div className="2xl:max-w-[30rem]">
        <input
          type="text"
          name="userName"
          placeholder="User name"
          value={formik.values.userName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="py-[1rem] px-[1.5rem] rounded-2xl bg-transparent text-2xl w-full  border-[1px] outline-none"
          style={{ borderColor: userNameColor }}
        />
        {formik.errors.userName && formik.touched.userName && (
          <p className="mt-[0.5rem] ml-[0.3rem]">{formik.errors.userName}</p>
        )}
      </div>
      <div className="2xl:max-w-[30rem]">
        <input
          type="text"
          name="fullName"
          placeholder="Full name"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="py-[1rem] px-[1.5rem] rounded-2xl bg-transparent text-2xl w-full  border-[1px] outline-none"
          style={{ borderColor: fullNameColor }}
        />
        {formik.errors.fullName && formik.touched.fullName && (
          <p className="mt-[0.5rem] ml-[0.3rem]">{formik.errors.fullName}</p>
        )}
      </div>
      <div className="2xl:max-w-[30rem]">
        <textarea
          name="bio"
          rows={3}
          value={formik.values.bio}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="py-[1rem] px-[1.5rem] rounded-2xl bg-transparent text-2xl w-full  border-[1px] outline-none"
          placeholder="Bio"
          style={{ borderColor: bioColor }}
        ></textarea>
        {formik.errors.bio && formik.touched.bio && (
          <p className="mt-[0.5rem] ml-[0.3rem]">{formik.errors.bio}</p>
        )}
      </div>
      <div className="w-fit">
        <SubmitButton disabled={formError || initialDisabled || !image}>
          Login
        </SubmitButton>
      </div>
    </form>
  );
}
