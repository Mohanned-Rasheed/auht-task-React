import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/config";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Props {}

function ForgotPass(props: Props) {
  const {} = props;
  const [t] = useTranslation();
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <div className="h-screen  bg-gray-200 flex justify-center items-center dark:bg-black dark:text-white">
        <div className="max-w-[30rem] w-[30rem] flex items-center flex-col bg-white dark:bg-gray-900 rounded-md shadow-md">
          <div className="mt-5 text-2xl font-bold"> Reset Password</div>
          <form
            onSubmit={(target) => {
              target.preventDefault();
              if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)) {
                sendPasswordResetEmail(auth, email).then(() => {
                  setErr("");
                  alert(t("messages.reset password sent to email"));
                  navigate("/login");
                });
              } else {
                setErr(t("errors.Enter vaild email"));
              }
            }}
            className="flex flex-col justify-center items-center"
          >
            <input
              onChange={(input) => {
                setEmail(input.target.value);
              }}
              placeholder="Email"
              name="email"
              className="mt-12 max-w-80 w-80 shadow-sm placeholder:text-opacity-60 placeholder:text-black py-2 bg-gray-200 rounded-md outline-blue-500 pl-2"
            ></input>
            {err.length > 0 && (
              <span className="w-full text-red-500">{err}</span>
            )}
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
