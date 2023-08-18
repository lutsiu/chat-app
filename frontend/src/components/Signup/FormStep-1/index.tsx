import useSetColor from "../../../hooks/useSetColor"
import { useFormik } from "formik"
import * as Yup from 'yup';
import SubmitButton from "../../Widgets/Buttons/Submit";
import { useState, useEffect } from "react";

interface Props {
  setStep: (step: number) => void
}

export default function FormStep1(props: Props) {

  const [initialDisabled, setInitialDisabled] = useState(true);
  const [formError, setFormError] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter valid email address")
      .required("Required field"),
    password: Yup.string()
      .min(8, "Password has to contain at least 8 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
        "Password must contain at least one uppercase letter and one special character"
      )
      .required("Required field"),
  });

  async function onSubmit(values: {
    email: string;
    password: string;
  }): Promise<void> {
    try {
      console.log("function");
    } catch (err) {
      console.log(err);
    }
  }

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const emailColor = useSetColor(
    initialDisabled,
    formik.errors.email,
    formik.touched.email
  );
  const passwordColor = useSetColor(
    initialDisabled,
    formik.errors.password,
    formik.touched.password
  );

  useEffect(() => {
    if (formik.touched.email || formik.touched.password) {
      setInitialDisabled(false);
    }
    if (formik.errors.email || formik.errors.password) {
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
      <div className="2xl:max-w-[30rem]">
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="py-[1rem] px-[1.5rem] rounded-2xl bg-transparent text-2xl 2xl:w-full  border-[1px] outline-none"
          style={{ borderColor: emailColor }}
        />
        {formik.errors.email && formik.touched.email && (
          <p className="mt-[0.5rem] ml-[0.3rem]">{formik.errors.email}</p>
        )}
      </div>
      <div className="2xl:max-w-[30rem]">
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="py-[1rem] px-[1.5rem] rounded-2xl bg-transparent text-2xl 2xl:w-full border-zinc-500 border-[1px] outline-none"
          style={{ borderColor: passwordColor }}
        />

        {formik.errors.password && formik.touched.password && (
          <p className="mt-[0.5rem] ml-[0.3rem]">{formik.errors.password}</p>
        )}
      </div>
      <div className="w-fit">
        <SubmitButton disabled={formError || initialDisabled}>
          Login
        </SubmitButton>
      </div>
    </form>
  )
}