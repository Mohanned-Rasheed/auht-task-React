import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

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

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };
  const {} = props;

  return (
    <>
      <div className="h-screen bg-gray-200 flex justify-center dark:bg-gray-700">
        <div className="flex flex-col items-center max-w-[30rem] m-auto w-[30rem]  bg-white rounded-md dark:bg-slate-900 dark:text-white">
          <div className="mt-6 text-3xl">Register</div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 flex flex-col dark:text-black"
          >
            <input
              {...register("nameEnglish", {
                required: "Name in English is required",
                pattern: {
                  value: /^[A-Za-z ]*$/,
                  message: "Enter only English characters",
                },
                maxLength: {
                  value: 50,
                  message: "Max Number is 50 characters",
                },
              })}
              placeholder="Full Name in English"
              className="placeholder:text-opacity-60 mt-4 placeholder:text-black  py-1 bg-blue-100  rounded-md outline-blue-500 pl-2"
            ></input>{" "}
            {errors.nameEnglish && (
              <span className="pl-2 text-sm text-red-500">
                {errors.nameEnglish.message}
              </span>
            )}
            <input
              {...register("nameArabic", {
                required: "Name in Arabic is required",
                pattern: {
                  value: /^[\u0621-\u064A ]+$/,
                  message: "Enter only Arabic characters",
                },
                maxLength: {
                  value: 50,
                  message: "Max Number is 50 characters",
                },
              })}
              placeholder="Full name in Arabic"
              className="placeholder:text-opacity-60 mt-4 placeholder:text-black  py-1 bg-blue-100  rounded-md outline-blue-500 pl-2"
            ></input>
            {errors.nameArabic && (
              <span className="pl-2 text-sm text-red-500">
                {errors.nameArabic.message}
              </span>
            )}
            <input
              {...register("date", {
                required: "Birth date is required ",
                valueAsDate: true,
                validate: (value) => {
                  var today = new Date();
                  var BOD = new Date(value);
                  if (!(today.getFullYear() - BOD.getFullYear() >= 18)) {
                    return "Your age must be more than 18 years old";
                  }

                  return true;
                },
              })}
              placeholder="Birth date"
              type="date"
              className="mt-4 text-black py-1 bg-blue-100  rounded-md outline-blue-500 pl-2"
            ></input>
            {errors.date && (
              <span className="pl-2 text-sm text-red-500">
                {errors.date.message}
              </span>
            )}
            <input
              {...register("phoneNumber", {
                required: "Mobile number is required",
                pattern: { value: /^[0-9]+$/, message: "Enter only numbers" },
                maxLength: {
                  value: 12,
                  message: "Max Number is 12 Number",
                },
              })}
              placeholder="Mobile number"
              className="placeholder:text-opacity-60 mt-4 placeholder:text-black  py-1 bg-blue-100  rounded-md outline-blue-500 pl-2"
            ></input>
            {errors.phoneNumber && (
              <span className="pl-2 text-sm text-red-500">
                {errors.phoneNumber.message}
              </span>
            )}
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Enter vaild email",
                },
              })}
              placeholder="email address"
              className="placeholder:text-opacity-60 mt-4 placeholder:text-black  py-1 bg-blue-100  rounded-md outline-blue-500 pl-2"
            ></input>
            {errors.email && (
              <span className="pl-2 text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
            <input
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$])/,
                  message: "password must including letter,number,and symbol",
                },
                minLength: {
                  value: 8,
                  message: "The password must more than 8 characters",
                },
              })}
              type="password"
              placeholder="Password"
              className="placeholder:text-opacity-60 mt-4 placeholder:text-black  py-1 bg-blue-100  rounded-md outline-blue-500 pl-2"
            ></input>
            {errors.password && (
              <span className="pl-2 text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
            <input
              {...register("confPassword", {
                required: "Confirm password is required",
                validate: (value) => {
                  if (value != getValues("password")) {
                    return "Confirm password not same as password";
                  }
                  return true;
                },
              })}
              type="password"
              placeholder="Confirm password"
              className="placeholder:text-opacity-60 mt-4 placeholder:text-black  py-1 bg-blue-100  rounded-md outline-blue-500 pl-2"
            ></input>
            {errors.confPassword && (
              <span className="pl-2 text-sm text-red-500">
                {errors.confPassword.message}
              </span>
            )}
            <input
              className="cursor-pointer mt-8 w-80 bg-blue-500 rounded-md py-1 text-white hover:bg-blue-600"
              type="submit"
              value={"Register"}
            ></input>
          </form>
          <div className="mt-12 mb-4">
            Alreday have an account? <Link to={"/"}>Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
