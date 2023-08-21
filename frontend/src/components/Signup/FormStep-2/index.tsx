import useSetColor from "../../../hooks/useSetColor";
import { useFormik } from "formik";
import * as Yup from "yup";
import SubmitButton from "../../Widgets/Buttons/Submit";
import { useState, useEffect, FormEvent } from "react";
import { createPortal } from "react-dom";
import Popup from "../../Widgets/Popup";
interface Props {
  setStep: (step: number) => void;
  userId: string;
}

export default function FormStep2(props: Props) {
  const { setStep, userId } = props;
  const [initialDisabled, setInitialDisabled] = useState(true);
  const [formError, setFormError] = useState(false);
  const [wrondCodeTries, setWrongCodeTries] = useState(0);
  const [responseError, setResponseError] = useState<null | string>(null);
  const [resendCode, setResendCode] = useState(false);
  const [codeBeenSent, setCodeBeenSent] = useState(false);
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
      const body = JSON.stringify({ code: values.code, userId });
      const res = await fetch(`http://localhost:3000/auth/sign-up/step-2`, {
        headers: { "Content-Type": "application/json" },
        body,
        method: "POST",
      });
      if (res.ok) {
        setStep(2);
      }
      if (res.status === 400) {
        formik.setErrors({ code: "Code you input is incorrect" });
        setWrongCodeTries((prev) => prev + 1);
      }
      if (res.status === 404 || res.status === 409) {
        const error = (await res.json()) as string;
        setResponseError(error);
        setTimeout(() => {
          setResponseError(null);
          formik.resetForm();
        }, 3000);
      }
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

  async function sendCodeAgain(e: FormEvent<HTMLFormElement>): Promise<void> {
    try {
      e.preventDefault();
      const body = JSON.stringify({ userId });
      console.log(body);
      const res = await fetch(`http://localhost:3000/auth/resend-code`, {
        headers: { "Content-Type": "application/json" },
        body,
        method: "POST",
      });
      if (!res.ok) {
        const error = (await res.json()) as string;
        formik.setErrors({ code: error });
      } else {
        setCodeBeenSent(true);
        setWrongCodeTries(0);
        setResendCode(false);
        formik.values.code = "";
        setTimeout(() => {
          setCodeBeenSent(false);
        }, 3000);
        console.log("done");
        console.log(wrondCodeTries, resendCode);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (formik.touched.code || formik.values.code) {
      setInitialDisabled(false);
    }
    if (formik.errors.code || formik.errors.code) {
      setFormError(true);
    } else {
      setFormError(false);
    }
  }, [formik]);

  useEffect(() => {
    if (wrondCodeTries === 3) {
      setResendCode(true);
    }
  }, [wrondCodeTries]);

  useEffect(() => {
    function deleteUserData(e: BeforeUnloadEvent) {
      e.preventDefault();
      e.returnValue = '';
      fetch(`http://localhost:3000/auth/delete-account?userId=${userId}`, {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
      });
    }
    window.addEventListener('beforeunload', deleteUserData);
    return () => {
      window.removeEventListener('beforeunload', deleteUserData);
    }
  }, [userId]);

  return (
    <>
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

        {codeBeenSent && (
          <p className="text-emerald-400 text-xl">
            Code was sent again. Check your email
          </p>
        )}
        <div className="w-fit">
          <SubmitButton disabled={formError || initialDisabled}>
            Confirm code
          </SubmitButton>
        </div>
      </form>
      {responseError &&
        createPortal(
          <Popup bottom={10}>AAAA</Popup>,
          document.getElementById("overlay") as HTMLElement
        )}
      {resendCode && (
        <form className="mx-auto w-fit mt-[1rem]" onSubmit={sendCodeAgain}>
          <button type="submit" className=" text-emerald-400 text-xl">
            Click here to send you a new code
          </button>
        </form>
      )}
    </>
  );
}
