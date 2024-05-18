import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/config";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {}
type FormFields = {
  email: string;
};
function ForgotPass(props: Props) {
  const {} = props;
  const [email, setEmail] = useState("");
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    sendPasswordResetEmail(auth, email).then(() => {
      alert("Reset Password Sent To Email!");
    });
  };
  return (
    <>
      <div className="h-screen bg-gray-200 flex justify-center items-center">
        <div className="max-w-[30rem] w-[30rem] border flex items-center flex-col bg-white rounded-md shadow-md">
          <div className="mt-5 text-2xl font-bold"> Reset Password</div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-center"
          >
            <input
              {...(register("email"), { required: true })}
              value={email}
              onChange={(input) => {
                setEmail(input.target.value);
              }}
              placeholder="Email"
              className="mt-12 max-w-80 w-80 shadow-sm placeholder:text-opacity-60 placeholder:text-black py-2 bg-gray-200 rounded-md outline-blue-500 pl-2"
            ></input>
            <input
              type="submit"
              placeholder="Send"
              className="bg-blue-500 mt-6 mb-12 text-white max-w-80 w-80 rounded-md text-xl p-1 text-center cursor-pointer"
            ></input>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPass;
