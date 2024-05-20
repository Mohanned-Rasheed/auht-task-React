import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import DarkLight from "../components/darkLight";
import { useTranslation } from "react-i18next";
import ChangeLang from "../components/changeLang";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confpasswordVisible, setconfPasswordVisible] = useState(false);
  const navigate = useNavigate();
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
    sendEmailVerification(auth.currentUser!);
    navigate("/");
  };
  const {} = props;
  const [t, i18n] = useTranslation();
  return (
    <>
      <div className="h-screen bg-gray-200 flex justify-center dark:bg-gray-700">
        <DarkLight />
        <ChangeLang />
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
              className="shadow-md transition duration-500 hover:shadow-none shadow-gray-500 cursor-pointer mt-8 w-80 bg-blue-500 rounded-md py-1 text-white hover:bg-blue-600"
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

export default RegisterAfter;
