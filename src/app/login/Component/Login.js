"use client";
import React, { useState } from "react";
import style from "../Component/login.module.css";
import Image from "next/image";
import { LoginLogo } from "@/src/Utils/images";
import HeadingTextH1 from "@/src/Typography/text/HeadingTextH1";
import Input from "@/src/Component/FormElement/Input";
import Button from "@/src/Component/FormElement/Button";
import InputPassword from "@/src/Component/FormElement/InputPassword";
import { Label } from "@/src/Component/FormElement/Lable";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useFormik } from "formik";

import ErrorText from "@/src/Typography/text/ErrorText";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const route = useRouter();
  const LoginUserValidation = Yup.object({
    password: Yup.string().required("Please enter password."),
    email: Yup.string()
      .email("Incorrect email address.")
      .required("Please enter email."),
  });

  const LoginUserValidationValue = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: LoginUserValidationValue,
    validationSchema: LoginUserValidation,
    onSubmit: async (values, action) => {
      console.log(values);

      const existingUsers = JSON.parse(localStorage.getItem("adminData")) || [];

      const user = existingUsers.find(
        (user) =>
          user.email === values.email && user.password === values.password
      );
      if (user) {
        localStorage.setItem("accessToken", "tax")
        action.resetForm();
        route.push("/dashboard");
      } else {
        setErrorMessage("Invalid email or password.");
      }
    },
  });
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    formik;
  return (
    <>
      <div className={style.Loginwithmobilenumbermain}>
        <Image
          src={LoginLogo}
          className={style.logo}
          alt="logo"
          property="true"
        />
        <div className={style.Loginwithmobilenumbercontentsubmain}>
          <HeadingTextH1 text={"Login"} />
          <form onSubmit={handleSubmit}>
            <Label className={style.LabDiv}>Email Address</Label>
            <Input
              placeholder={"Enter your email address"}
              name={"email"}
              type={"text"}
              // disable={false}
              value={values.email}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              className={style.Passwordcls}

            />

            {errors.email && touched.email && <ErrorText text={errors.email} />}

            <Label className={style.LabDiv}>Password</Label>
            <InputPassword
              placeholder={"Enter your password"}
              name={"password"}
              type={"text"}
              // disable={true}
              value={values.password}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              className={style.Passwordcls}
            />
            {errors.password && touched.password && (
              <ErrorText text={errors.email} />
            )}
            {errorMessage && <ErrorText text={errorMessage} />}
            <div className={style.forgotPasswordText}>
              Forgot your password?
            </div>
            <Button
              className={style.loginBtn}
              disabled={false}
              type={"submit"}
              text={"Login"}
            />
          </form>
        </div>
        <span className={style.outerDivText}>
          Don’t have an account?{" "}
          <span
            className={style.signUpText}
            onClick={() => route.push("/register")}
          >
            {" "}
            Sign up
          </span>
        </span>
      </div>
    </>
  );
};

export default Login;
