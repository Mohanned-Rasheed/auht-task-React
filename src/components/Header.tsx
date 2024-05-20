import { useEffect, useState } from "react";
import { RootState } from "../state/store";
import { useSelector } from "react-redux";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import profilePNG from "../assets/profile-circle-svgrepo-com.png";
import { useTranslation } from "react-i18next";
import { onAuthStateChanged } from "firebase/auth";
import Loader from "./Loader";
interface Props {}

function Header(props: Props) {
  const {} = props;
  onAuthStateChanged(auth, async () => {
    if (!isLodaing) {
      setIsLoading(true);
    }
  });
  let [isLodaing, setIsLoading] = useState(false);
  const [t] = useTranslation();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const [image, setImage] = useState<string | null>("");
  useEffect(() => {
    setTimeout(() => {
      setImage(window.localStorage.getItem("profileImg"));
    }, 500);
  }, [window.localStorage.getItem("profileImg")]);
  return (
    <>
      <div className="h-fit py-3 bg-gray-300 flex justify-around items-center dark:bg-gray-700 dark:text-white">
        <div className="font-bold text-2xl">Auth Task</div>
        <div
          className="font-bold cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          {t("header.home")}
        </div>
        <div className="mr-6">
          {isLodaing ? (
            user.currentUser ? (
              <div className="flex gap-8 items-center">
                <button
                  onClick={() => {
                    const flag = confirm("Are you sure want to logout?");
                    if (flag) {
                      auth.signOut();
                      window.localStorage.clear();
                      navigate("login");
                    }
                  }}
                  className="font-bold border border-black dark:border-white rounded-lg p-2 cursor-pointer hover:opacity-60"
                >
                  {t("header.logout")}
                </button>
                <div className="flex items-center gap-2">
                  <img
                    onClick={() => {
                      navigate("/edit");
                    }}
                    className="cursor-pointer hover:opacity-60 rounded-full"
                    width={40}
                    src={image || profilePNG}
                  ></img>
                  <div>{auth.currentUser?.email}</div>
                </div>
              </div>
            ) : (
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="font-bold border border-black dark:border-white rounded-lg p-2 cursor-pointer hover:opacity-60"
                >
                  {t("header.login")}
                </button>
                <button
                  onClick={() => {
                    navigate("/sginup");
                  }}
                  className="font-bold border border-black dark:border-white rounded-lg p-2 cursor-pointer hover:opacity-60"
                >
                  {t("header.sgin up")}
                </button>
              </div>
            )
          ) : (
            <div className="h-12 w-12">
              <Loader hight={"8vh"} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
