import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { doc, setDoc } from "firebase/firestore";
import { db, auth, imageDB } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface Props {}
type FormFields = {
  nameEnglish: string;
  nameArabic: string;
  date: string;
  phoneNumber: string;
};
type EditData = {
  nameInEnglish: string;
  nameinArabic: string;
  dateOfBirth: string;
  mobileNumber: string;
};

function Edit(props: Props) {
  const {} = props;
  const [t, i18n] = useTranslation();
  const [disabledFlag, setDisabledFlag] = useState(true);
  const [editData, setEditData] = useState<EditData>({
    dateOfBirth: "",
    mobileNumber: "",
    nameInEnglish: "",
    nameinArabic: "",
  });
  const date = new Date(window.localStorage.getItem("dateOfBirth")!);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();
  const navigate = useNavigate();
  const [img, setImg] = useState<File | null>(null);
  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/");
    }
  }, [auth.currentUser]);
  async function getImage(location: string) {
    const ImageURL = await getDownloadURL(ref(imageDB, location));
    return await ImageURL;
  }
  const imageFrom = async () => {
    const image = await getImage(`files/${auth.currentUser?.email}`);
    window.localStorage.setItem("profileImg", image);
  };
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await setDoc(doc(db, "users", auth.currentUser!.uid), {
      nameInEnglish:
        data.nameEnglish || window.localStorage.getItem("nameInEnglish"),
      nameinArabic:
        data.nameArabic || window.localStorage.getItem("nameinArabic"),
      dateOfBirth: data.date || window.localStorage.getItem("dateOfBirth"),
      mobileNumber:
        data.phoneNumber || window.localStorage.getItem("mobileNumber"),
    })
      .then(() => {
        window.localStorage.setItem(
          "dateOfBirth",
          data.date || window.localStorage.getItem("dateOfBirth")!
        );
        window.localStorage.setItem(
          "mobileNumber",
          data.phoneNumber || window.localStorage.getItem("mobileNumber")!
        );
        window.localStorage.setItem(
          "nameInEnglish",
          data.nameEnglish || window.localStorage.getItem("nameInEnglish")!
        );
        window.localStorage.setItem(
          "nameinArabic",
          data.nameArabic || window.localStorage.getItem("nameinArabic")!
        );
        if (img != null) {
          uploadBytes(ref(imageDB, `files/${auth.currentUser?.email}`), img!)
            .then(() => {
              imageFrom();
            })
            .catch((err) => {
              alert(err);
            });
        }
        setEditData({
          dateOfBirth: "",
          mobileNumber: "",
          nameInEnglish: "",
          nameinArabic: "",
        });
      })
      .catch((err) => {
        alert(err);
      });

    navigate("/");
    alert(t("messages.your information has been updated"));
  };

  return (
    <>
      <div className="h-screen bg-gray-200 flex justify-center dark:bg-black">
        <div className="flex flex-col items-center max-w-[30rem] m-auto w-[30rem] bg-white rounded-md dark:bg-slate-900 dark:text-white">
          <div
            className={`${
              i18n.language == "ar" && "flex-row-reverse "
            } mt-6 text-3xl font-bold flex justify-around items-center w-full `}
          >
            <div className="">{t("editPage.profile")}</div>
            <button
              disabled={!auth.currentUser?.emailVerified}
              onClick={() => {
                setDisabledFlag(!disabledFlag);
              }}
              className={`mt-2 ${
                auth.currentUser?.emailVerified
                  ? "text-xl hover:underline cursor-pointer"
                  : "text-xs "
              }`}
            >
              {auth.currentUser?.emailVerified
                ? disabledFlag
                  ? t("editPage.edit")
                  : t("editPage.cancel")
                : t("messages.email must verified to edit")}
            </button>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 flex flex-col dark:text-black"
          >
            <input
              disabled={disabledFlag}
              {...register("nameEnglish", {
                required:
                  editData.nameInEnglish != "" &&
                  t("errors.Name in English is required"),
                pattern: {
                  value: /^[A-Za-z ]*$/,
                  message: t("errors.Enter only English characters"),
                },
                maxLength: {
                  value: 50,
                  message: t("errors.Max Number is 50 characters"),
                },
              })}
              placeholder={
                window.localStorage.getItem("nameInEnglish") ||
                t("registerPage.full name in english")
              }
              onChange={(input) => {
                setEditData({ ...editData, nameInEnglish: input.target.value });
              }}
              className="shadow-sm  mt-4 placeholder:text-black  py-1 bg-blue-100  rounded-md outline-blue-500 pl-2"
            ></input>{" "}
            {errors.nameEnglish && (
              <span className="pl-2 text-sm text-red-500">
                {errors.nameEnglish.message}
              </span>
            )}
            <input
              disabled={disabledFlag}
              {...register("nameArabic", {
                required:
                  editData.nameinArabic != "" &&
                  t("errors.Name in Arabic is required"),
                pattern: {
                  value: /^[\u0621-\u064A ]+$/,
                  message: t("errors.Enter only Arabic characters"),
                },
                maxLength: {
                  value: 50,
                  message: t("errors.Max Number is 50 characters"),
                },
              })}
              placeholder={
                window.localStorage.getItem("nameinArabic") ||
                t("registerPage.full name in arabic")
              }
              onChange={(input) => {
                setEditData({ ...editData, nameinArabic: input.target.value });
              }}
              className="shadow-sm  mt-4 placeholder:text-black  py-1 bg-blue-100  rounded-md outline-blue-500 pl-2"
            ></input>
            {errors.nameArabic && (
              <span className="pl-2 text-sm text-red-500">
                {errors.nameArabic.message}
              </span>
            )}
            <input
              disabled={disabledFlag}
              {...register("date", {
                required:
                  editData.dateOfBirth != "" &&
                  t("errors.Birth date is required"),
                valueAsDate: true,
                validate: (value) => {
                  if (editData.dateOfBirth != "") {
                    var today = new Date();
                    var BOD = new Date(value);
                    if (!(today.getFullYear() - BOD.getFullYear() >= 18)) {
                      return t(
                        "errors.Your age must be more than 18 years old"
                      );
                    }
                  }
                  return true;
                },
              })}
              placeholder={date.toLocaleDateString() || "Birth date"}
              type={disabledFlag ? "text" : "date"}
              onChange={(input) => {
                setEditData({ ...editData, dateOfBirth: input.target.value });
              }}
              className="shadow-sm mt-4 text-black py-1 bg-blue-100  rounded-md outline-blue-500 pl-2"
            ></input>
            {errors.date && (
              <span className="pl-2 text-sm text-red-500">
                {errors.date.message}
              </span>
            )}
            <input
              disabled={disabledFlag}
              {...register("phoneNumber", {
                required:
                  editData.mobileNumber != "" &&
                  t("errors.Mobile number is required"),
                pattern: {
                  value: /^[0-9]+$/,
                  message: t("errors.Enter only numbers"),
                },
                maxLength: {
                  value: 12,
                  message: t("errors.Max Number is 12 Number"),
                },
              })}
              placeholder={
                window.localStorage.getItem("mobileNumber") ||
                t("registerPage.mobile number")
              }
              onChange={(input) => {
                setEditData({ ...editData, mobileNumber: input.target.value });
              }}
              className="shadow-sm  mt-4 placeholder:text-black  py-1 bg-blue-100  rounded-md outline-blue-500 pl-2"
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
              disabled={disabledFlag}
              onChange={(e) => {
                setImg(e.target.files![0]);
              }}
              type="file"
              className="shadow-sm pr-10 w-full placeholder:text-opacity-60 mt-1 placeholder:text-black py-1 bg-blue-100  rounded-md outline-blue-500 pl-2"
            ></input>
            <input
              disabled={
                !(
                  editData.nameInEnglish != "" ||
                  editData.nameinArabic != "" ||
                  editData.mobileNumber != "" ||
                  editData.dateOfBirth != "" ||
                  img != null
                )
              }
              className={`
              ${
                (editData.nameInEnglish != "" ||
                  editData.nameinArabic != "" ||
                  editData.mobileNumber != "" ||
                  editData.dateOfBirth != "" ||
                  img != null) &&
                "cursor-pointer hover:bg-blue-600 hover:shadow-none"
              } w-full shadow-md transition duration-500 shadow-gray-500 mt-8  bg-blue-500 rounded-md py-1 text-white mb-12`}
              type="submit"
              value={t("editPage.update")}
            ></input>
          </form>
        </div>
      </div>
    </>
  );
}

export default Edit;
