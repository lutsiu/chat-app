import useSetColor from "../../../hooks/useSetColor";
import { useFormik } from "formik";
import * as Yup from "yup";
import SubmitButton from "../../Widgets/Buttons/Submit";
import { useState, useEffect } from "react";

interface Props {
  setStep: (step: number) => void;
}

export default function FormStep2(props: Props) {
  const [initialDisabled, setInitialDisabled] = useState(true);
  const [formError, setFormError] = useState(false);
  const initialValues = {
    code: "",
  };

  const validationSchema = Yup.object({
    code: Yup.string()
      .length(6, "Code must be 6 characters long")
      .required("Required field"),
  });

  async function onSubmit(values: { code: string }): Promise<void> {
    try {
      console.log("function");
    } catch (err) {
      console.log(err);
    }
  }

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const codeColor = useSetColor(
    initialDisabled,
    formik.errors.code,
    formik.touched.code
  );

  useEffect(() => {
    if (formik.touched.code || formik.touched.code) {
      setInitialDisabled(false);
    }
    if (formik.errors.code || formik.errors.code) {
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
          type="text"
          name="code"
          placeholder="Enter code"
          value={formik.values.code}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="py-[1rem] px-[1.5rem] rounded-2xl bg-transparent text-2xl 2xl:w-full  border-[1px] outline-none"
          style={{ borderColor: codeColor }}
        />
        {formik.errors.code && formik.touched.code && (
          <p className="mt-[0.5rem] ml-[0.3rem]">{formik.errors.code}</p>
        )}
      </div>
      <div className="w-fit">
        <SubmitButton disabled={formError || initialDisabled}>
          Confirm code
        </SubmitButton>
      </div>
    </form>
  );
}
