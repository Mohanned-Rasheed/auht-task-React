import { useSelector } from "react-redux";
import { auth } from "../firebase/config";
import { RootState } from "../state/store";
import { sendEmailVerification } from "firebase/auth";
import { useTranslation } from "react-i18next";
interface Props {}
function Home(props: Props) {
  const {} = props;
  const [t, i18n] = useTranslation();
  const user = useSelector((state: RootState) => state.user);
  return (
    <>
      <div className="h-screen bg-gray-200 dark:bg-black dark:text-white">
        {
          // Verfication Message
        }
        {!auth.currentUser?.emailVerified && user.currentUser && (
          <div className="pt-4">
            <div
              className={`${
                i18n.language == "ar" && "flex-row-reverse gap-1"
              } w-fit m-auto border border-gray-500 rounded-md py-2 px-8 flex justify-center text-red-600 dark:text-red-400`}
            >
              {t("homePage.verifiedMessage")}
              <button
                onClick={() => {
                  sendEmailVerification(user.currentUser!);
                  alert(t("messages.email has sent"));
                }}
                className="pl-1 cursor-pointer underline hover:opacity-70"
              >
                {t("homePage.resend verification")}
              </button>
            </div>
          </div>
        )}
        {
          ////
        }

        <div className={`w-fit m-auto pt-16 flex justify-center`}>
          <div
            className={`${
              i18n.language == "ar" && "flex-row-reverse gap-1"
            }  my-4 font-bold text-2xl border border-gray-500 rounded-lg p-8`}
          >
            {window.localStorage.getItem("nameInEnglish") ? (
              <div
                className={`${
                  i18n.language == "ar" && "flex-row-reverse"
                } flex gap-2 `}
              >
                <div>{t("homePage.hello")}</div>{" "}
                <div>{window.localStorage.getItem("nameInEnglish")}</div>
              </div>
            ) : (
              t("homePage.not login")
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
