import { useState } from "react";
import FormStep1 from "../../components/Signup/FormStep-1";
import FormStep2 from "../../components/Signup/FormStep-2";
import FormStep3 from "../../components/Signup/FormStep-3";
export default function SignupPage() {
  const [step, setStep] = useState(0);
  const [userId, setUserId] = useState("");
  return (
    <main className="pt-[4rem]">
      <div className="w-fit mx-auto">
        <h1 className="text-center text-4xl font-semibold ">Sign-up</h1>
        <p className="text-center my-[1rem] text-zinc-300 text-lg">
          Step {step + 1}/3
        </p>
        {step === 0 && <FormStep1 setStep={setStep} setUserId={setUserId} />}
        {step === 1 && <FormStep2 setStep={setStep} userId={userId} />}
        {step === 2 && <FormStep3 setStep={setStep} userId={userId} />}
      </div>
    </main>
  );
}
