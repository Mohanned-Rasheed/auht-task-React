import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { doc, setDoc } from "firebase/firestore";
import { db, auth, imageDB } from "../firebase/config";
import { sendEmailVerification } from "firebase/auth";
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
function RegisterAfter(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();
  const {} = props;
  const [t, i18n] = useTranslation();
  const [img, setImg] = useState<File | null>(null);
  const navigate = useNavigate();
  async function getImage(location: string) {
    const ImageURL = await getDownloadURL(ref(imageDB, location));
    return await ImageURL;
  }
  const imageFrom = async () => {
    const image = await getImage(`files/${auth.currentUser?.email}`);
    window.localStorage.setItem("profileImg", image);
  };
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
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
  };

  return (
    <>
      <div className="h-screen bg-gray-200 flex justify-center dark:bg-black">
        <div className="flex flex-col items-center max-w-[30rem] m-auto w-[30rem] bg-white rounded-md dark:bg-slate-900 dark:text-white">
          <div className=" w-[75%]">
            <div className="mt-6 text-3xl font-bold text-center">
              {t("registerAfter.personal informaion")}
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-4 flex flex-col dark:text-black"
            >
              <label className="font-bold text-center ">
                {t("registerAfter.one last step Complete neccery information")}
              </label>
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
                      return t(
                        "errors.Your age must be more than 18 years old"
                      );
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
              <label
                className={`mt-3 font-bold pl-2 ${
                  i18n.language == "ar" && "text-right"
                }`}
              >
                {t("registerPage.upload personal picture")}
              </label>
              <input
                onChange={(e) => {
                  setImg(e.target.files![0]);
                }}
                type="file"
                className="shadow-sm pr-10 w-full placeholder:text-opacity-60 mt-1 placeholder:text-black py-1 bg-blue-100  rounded-md outline-blue-500 pl-2"
              ></input>
              <input
                className="shadow-md transition duration-500 hover:shadow-none shadow-gray-500 cursor-pointer mt-8 w-full bg-blue-500 rounded-md py-1 text-white hover:bg-blue-600 mb-12"
                type="submit"
                value={t("registerAfter.submit")}
              ></input>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterAfter;
