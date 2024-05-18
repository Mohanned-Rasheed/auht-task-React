interface Props {}
import { useSelector } from "react-redux";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { RootState } from "../state/store";
import { useState } from "react";
import DarkLight from "../components/darkLight";
import ChangeLang from "../components/changeLang";

function Home(props: Props) {
  const {} = props;
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  return (
    <>
      <div className="h-screen bg-gray-200 dark:bg-black dark:text-white">
        <DarkLight />
        <ChangeLang />
        {
          //Header
        }
        <div className="h-[5rem] bg-gray-300 flex justify-around items-center dark:bg-gray-700">
          <div className="font-bold text-2xl">Auth Task</div>
          <div className="font-bold cursor-pointer">Home</div>
          <div className="mr-6">
            {user.currentUser ? (
              <button
                onClick={() => {
                  const flag = confirm("Are you sure want to logout?");
                  if (flag) {
                    auth.signOut();
                    window.localStorage.clear();
                  }
                }}
                className="font-bold border border-black rounded-lg p-2 cursor-pointer hover:opacity-60"
              >
                Logout
              </button>
            ) : (
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="font-bold border border-black rounded-lg p-2 cursor-pointer hover:opacity-60"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/sginup");
                  }}
                  className="font-bold border border-black rounded-lg p-2 cursor-pointer hover:opacity-60"
                >
                  Sgin Up
                </button>
              </div>
            )}
          </div>
        </div>
        {
          ////
        }
        {
          // Verfication Message
        }
        {true && (
          <div className="mt-4 w-fit m-auto border border-gray-500 rounded-md py-2 px-8 flex justify-center text-red-600 dark:text-red-400">
            !Your Account Has'nt verified Yet{" "}
            <button className="pl-1 cursor-pointer underline hover:opacity-70">
              Resend verification
            </button>
          </div>
        )}
        {
          ////
        }

        <div
          className={`w-fit px-8 m-auto mt-16 rounded-lg flex justify-center border border-gray-500`}
        >
          <div className="my-4 font-bold text-2xl">
            {window.localStorage.getItem("nameInEnglish")
              ? ` Hello ${window.localStorage.getItem("nameInEnglish")} ${
                  auth.currentUser?.email
                }`
              : "your not loged in"}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
