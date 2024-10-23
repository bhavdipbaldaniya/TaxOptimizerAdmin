"use client";
import React, { useState } from "react";
import style from "../../login/Component/login.module.css";
import Image from "next/image";
import { LoginLogo } from "@/src/Utils/images";
import HeadingTextH1 from "@/src/Typography/text/HeadingTextH1";
import Lable from "@/src/Typography/text/Lable";
import Input from "@/src/Component/FormElement/Input";
import Button from "@/src/Component/FormElement/Button";
import InputPassword from "@/src/Component/FormElement/InputPassword";
import { Label } from "@/src/Component/FormElement/Lable";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useFormik } from "formik";
import ErrorText from "@/src/Typography/text/ErrorText";

const Register = () => {
  const route = useRouter();
  const [emailError, setEmailError] = useState("");
  const RegisterUserValidationValue = {
    name: "",
    email: "",
    password: "",
    cnf_password: "",
  };

  const RegisterUserProfileValidation = Yup.object({
    name: Yup.string().required("Please enter full name."),
    email: Yup.string()
      .email("Please enter valid email.")
      .required("Please enter email."),
    password: Yup.string().required("Please enter password."),
    cnf_password: Yup.string()
      .required("Please confirm your password.")
      .oneOf([Yup.ref("password"), null], "Passwords must match."),
  });

  const formik = useFormik({
    initialValues: RegisterUserValidationValue,
    validationSchema: RegisterUserProfileValidation,
    onSubmit: async (values, action) => {
      const existingUsers = JSON.parse(localStorage.getItem("adminData")) || [];

      const emailExists = existingUsers.some(
        (user) => user.email === values.email
      );

      if (emailExists) {
        setEmailError("Email is already registered.");
        return;
      } else {
        setEmailError("");
      }

      // Add new user data
      existingUsers.push(values);
      localStorage.setItem("adminData", JSON.stringify(existingUsers));

      action.resetForm();
      route.push("/login");
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
          <HeadingTextH1 text={"Sign up"} />
          <form onSubmit={handleSubmit}>
            <Label className={style.LabDiv}>Full Name</Label>
            <Input
              placeholder={"Enter your full name"}
              name={"name"}
              type={"text"}
              // disable={true}
              value={values.name}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              className={style.Passwordcls}
            />
            {errors.name && touched.name && <ErrorText text={errors.name} />}

            <Label className={style.LabDiv}>Email Address</Label>
            <Input
              placeholder={"Enter your email address"}
              name={"email"}
              type={"text"}
              // disable={true}
              value={values.email}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              className={style.Passwordcls}

            />
            {errors.email && touched.email && <ErrorText text={errors.email} />}
            {emailError && <ErrorText text={emailError} />}

            <Label className={style.LabDiv}>Password</Label>
            <InputPassword
              placeholder={"Create a strong password"}
              name={"password"}
              type={"text"}
              // disable={true}
              value={values.password}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              className={style.Passwordcls}

            />
            {errors.password && touched.password && (
              <ErrorText text={errors.password} />
            )}
            <Label className={style.LabDiv}>Confirm Password</Label>
            <InputPassword
              placeholder={"Re-enter your password"}
              name={"cnf_password"}
              type={"text"}
              // disable={true}
              value={values.cnf_password}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              className={style.Passwordcls}

            />
            {errors.cnf_password && touched.cnf_password && (
              <ErrorText text={errors.cnf_password} />
            )}
            <Button
              className={style.loginBtn}
              disabled={false}
              type={"submit"}
              text={"Sign up"}
            />
          </form>
        </div>
        <span className={style.outerDivText}>
          Already have an account?
          <span
            className={style.signUpText}
            onClick={() => route.push("/login")}
          >
            {" "}
            Sign in
          </span>
        </span>
      </div>
    </>
  );
};

export default Register;
