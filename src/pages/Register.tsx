import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { doc, setDoc } from "firebase/firestore";
import { db, auth, imageDB } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
interface Props {}
type FormFields = {
  nameEnglish: string;
  nameArabic: string;
  date: string;
  phoneNumber: string;
  email: string;
  password: string;
  confPassword: string;
};
function Register(props: Props) {
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();
  const {} = props;
  const [t, i18n] = useTranslation();
  const [img, setImg] = useState<File | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confpasswordVisible, setconfPasswordVisible] = useState(false);
  const navigate = useNavigate();
  async function getImage(location: string) {
    const ImageURL = await getDownloadURL(ref(imageDB, location));
    return await ImageURL;
  }
  const imageFrom = async () => {
    const image = await getImage(`files/${auth.currentUser?.email}`);
    window.localStorage.setItem("profileImg", image);
  };

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async () => {
        window.localStorage.setItem("dateOfBirth", data.date.toString());
        window.localStorage.setItem("mobileNumber", data.phoneNumber);
        window.localStorage.setItem("nameInEnglish", data.nameEnglish);
        window.localStorage.setItem("nameinArabic", data.nameArabic);
        await setDoc(doc(db, "users", auth.currentUser!.uid), {
          nameInEnglish: data.nameEnglish,
          nameinArabic: data.nameArabic,
          dateOfBirth: data.date.toString(),
          mobileNumber: data.phoneNumber,
        });
        if (img != null) {
          uploadBytes(ref(imageDB, `files/${auth.currentUser?.email}`), img!)
            .then(() => {
              imageFrom();
            })
            .catch((err) => {
              alert(err);
            });
        }
        sendEmailVerification(auth.currentUser!);
        navigate("/");
      })
      .catch((err) => {
        if (err.code == "auth/email-already-in-use") {
          alert(t("messages.email already registered"));
        }
       
      });
  };

  return (
    <>
      <div className="h-screen bg-gray-200 flex justify-center dark:bg-black">
        <div className="flex flex-col items-center max-w-[30rem] m-auto w-[30rem] bg-white rounded-md dark:bg-slate-900 dark:text-white">
          <div className="mt-6 text-3xl font-bold">
            {t("registerPage.register")}
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 flex flex-col dark:text-black"
          >
            <input
              {...register("nameEnglish", {
                required: t("errors.Name in English is required"),
                pattern: {
                  value: /^[A-Za-z ]*$/,
                  message: t("errors.Enter only English characters"),
                },
                maxLength: {
                  value: 50,
                  message: t("errors.Max Number is 50 characters"),
                },
              })}
              placeholder={t("registerPage.full name in english")}
              className="shadow-sm placeholder:text-opacity-60 mt-4 placeholder:text-black  py-1 bg-blue-100  rounded-md outline-blue-500 pl-2"
            ></input>{" "}
            {errors.nameEnglish && (
              <span className="pl-2 text-sm text-red-500">
                {errors.nameEnglish.message}
              </span>
            )}
            <input
              {...register("nameArabic", {
                required: t("errors.Name in Arabic is required"),
                pattern: {
                  value: /^[\u0621-\u064A ]+$/,
                  message: t("errors.Enter only Arabic characters"),
                },
                maxLength: {
                  value: 50,
                  message: t("errors.Max Number is 50 characters"),
                },
              })}
              placeholder={t("registerPage.full name in arabic")}
              className="shadow-sm placeholder:text-opacity-60 mt-4 placeholder:text-black  py-1 bg-blue-100  rounded-md outline-blue-500 pl-2"
            ></input>
            {errors.nameArabic && (
              <span className="pl-2 text-sm text-red-500">
                {errors.nameArabic.message}
              </span>
            )}
            <input
              {...register("date", {
                required: t("errors.Birth date is required"),
                valueAsDate: true,
                validate: (value) => {
                  var today = new Date();
                  var BOD = new Date(value);
                  if (!(today.getFullYear() - BOD.getFullYear() >= 18)) {
                    return t("errors.Your age must be more than 18 years old");
                  }

                  return true;
                },
              })}
              placeholder="Birth date"
              type="date"
              className="shadow-sm mt-4 text-black py-1 bg-blue-100  rounded-md outline-blue-500 pl-2"
            ></input>
            {errors.date && (
              <span className="pl-2 text-sm text-red-500">
                {errors.date.message}
              </span>
            )}
            <input
              {...register("phoneNumber", {
                required: t("errors.Mobile number is required"),
                pattern: {
                  value: /^[0-9]+$/,
                  message: t("errors.Enter only numbers"),
                },
                maxLength: {
                  value: 12,
                  message: t("errors.Max Number is 12 Number"),
                },
              })}
              placeholder={t("registerPage.mobile number")}
              className="shadow-sm placeholder:text-opacity-60 mt-4 placeholder:text-black  py-1 bg-blue-100  rounded-md outline-blue-500 pl-2"
            ></input>
            {errors.phoneNumber && (
              <span className="pl-2 text-sm text-red-500">
                {errors.phoneNumber.message}
              </span>
            )}
            <input
              {...register("email", {
                required: t("errors.Email is required"),
                pattern: {
                  value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: t("errors.Enter vaild email"),
                },
              })}
              placeholder={t("registerPage.email address")}
              className="shadow-sm placeholder:text-opacity-60 mt-4 placeholder:text-black  py-1 bg-blue-100  rounded-md outline-blue-500 pl-2"
            ></input>
            {errors.email && (
              <span className="pl-2 text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
            <div className="flex relative items-center justify-center">
              <span
                onClick={() => {
                  setPasswordVisible(!passwordVisible);
                }}
                className="absolute right-1 top-[1.3rem] cursor-pointer text-sm"
              >
                {passwordVisible
                  ? t("registerPage.hide")
                  : t("registerPage.show")}
              </span>
              <input
                {...register("password", {
                  required: t("errors.Password is required"),
                  pattern: {
                    value: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$])/,
                    message: t(
                      "errors.password must including letter,number,and symbol"
                    ),
                  },
                  minLength: {
                    value: 8,
                    message: t(
                      "errors.The password must more than 8 characters"
                    ),
                  },
                })}
                type={passwordVisible ? "text" : "password"}
                placeholder={t("registerPage.password")}
                className="shadow-sm pr-10 w-full placeholder:text-opacity-60 mt-4 placeholder:text-black  py-1 bg-blue-100  rounded-md outline-blue-500 pl-2"
              ></input>
            </div>
            {errors.password && (
              <span className="pl-2 text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
            <div className="flex relative items-center justify-center">
              <span
                onClick={() => {
                  setconfPasswordVisible(!confpasswordVisible);
                }}
                className="absolute right-1 top-[1.3rem] cursor-pointer text-sm"
              >
                {confpasswordVisible
                  ? t("registerPage.hide")
                  : t("registerPage.show")}
              </span>
              <input
                {...register("confPassword", {
                  required: t("errors.Confirm password is required"),
                  validate: (value) => {
                    if (value != getValues("password")) {
                      return t("errors.Confirm password not same as password");
                    }
                    return true;
                  },
                })}
                type={confpasswordVisible ? "text" : "password"}
                placeholder={t("registerPage.confirm password")}
                className="w-full shadow-sm placeholder:text-opacity-60 mt-4 placeholder:text-black  py-1 bg-blue-100  rounded-md outline-blue-500 pl-2"
              ></input>
            </div>
            {errors.confPassword && (
              <span className="pl-2 text-sm text-red-500">
                {errors.confPassword.message}
              </span>
            )}
            <label
              className={`mt-3 font-bold pl-2 ${
                i18n.language == "ar" && "text-right"
              }`}
            >
              {t("registerAfter.upload personal picture")}
            </label>
            <input
              onChange={(e) => {
                setImg(e.target.files![0]);
              }}
              type="file"
              className="shadow-sm pr-10 w-full mt-1 placeholder:text-opacity-60 placeholder:text-black py-1 bg-blue-100  rounded-md outline-blue-500 pl-2"
            ></input>
            <input
              className="w-full shadow-md transition duration-500 hover:shadow-none shadow-gray-500 cursor-pointer mt-8 bg-blue-500 rounded-md py-1 text-white hover:bg-blue-600"
              type="submit"
              value={t("registerPage.register")}
            ></input>
          </form>
          <div className="mt-12 mb-4">
            {t("registerPage.alreday have an account login")}{" "}
            <Link className="hover:underline" to={"/login"}>
              {t("registerPage.login")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
