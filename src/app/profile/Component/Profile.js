"use client";
import React, { useState } from "react";
import style from "./Profile.module.css";
import { ic_Edit_Profile } from "@/src/Utils/svg";
import Back from "@/src/Component/Back/page";
import { ProfileImage } from "@/src/Utils/images";
import Image from "next/image";
import { Label } from "@/src/Component/FormElement/Lable";
import Input from "@/src/Component/FormElement/Input";
import InputPassword from "@/src/Component/FormElement/InputPassword";
import TextArea from "@/src/Component/FormElement/TextArea";
import Button from "@/src/Component/FormElement/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import ErrorText from "@/src/Typography/text/ErrorText";

const Profile = () => {
  const route = useRouter();
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState(ProfileImage);

  const ProfileInitialValues = {
    first_name: "",
    password: "",
    NewPassword: "",
    ConfirmPassword: "",
  };

  const ProfileValidation = Yup.object({
    first_name: Yup.string().required("Please enter first name."),
    password: Yup.string().required("Please enter password."),
    NewPassword: Yup.string()
      .required("Please enter new password.")
      .min(8, "Password must be at least 8 characters."),
    ConfirmPassword: Yup.string()
      .required("Please confirm your password.")
      .oneOf([Yup.ref("NewPassword"), null], "Passwords must match."),
  });

  const formik = useFormik({
    initialValues: ProfileInitialValues,
    validationSchema: ProfileValidation,
    onSubmit: async (values, action) => {
      console.log(values);
      action.resetForm();
      // route.push("/");
    },
  });

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    formik;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    formik.setFieldValue("photo", file);

    if (file) {
      const fileURL = URL.createObjectURL(file);
      setPhotoURL(fileURL);
    }
  };

  const BackClick = () => {
    route.push("/dashboard");
  };
  return (
    <>
      <Back onClick={() => BackClick()} text={"Edit Profile"} />
      <div className={style.ProfilePicMainDiv}>
        <form onSubmit={handleSubmit}>
          <div className={style.MainDivForBtn}>
            <div className={style.ProfilePicSubDiv}>
              <Image
                src={photoURL}
                className={style.profilephoto}
                alt="profilepic"
                property="true"
                width={100}
                height={100}
              />
              <label htmlFor="fileUplod">
                <input
                  type="file"
                  id="fileUplod"
                  className="d-none"
                  onChange={handleFileUpload}
                />
                <div className={style.EditIcon}>{ic_Edit_Profile.icon()}</div>
              </label>
            </div>
          </div>

          <div className={style.InputMainDiv}>
            <div className={style.MainDivForInput}>
              <div className={style.SubDivForInput}>
                <Label for={"first_name"}>First name</Label>
                <Input
                  placeholder={"Enter first name"}
                  name={"first_name"}
                  disable={false}
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.first_name && touched.first_name && (
                  <ErrorText text={errors.first_name} />
                )}
              </div>

              <div className={style.SubDivForInput}>
                <Label for={"password"}>Old Password</Label>
                <InputPassword
                  placeholder={"Enter old password"}
                  name={"password"}
                  type={"password"}
                  disable={false}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password && (
                  <ErrorText text={errors.password} />
                )}
              </div>
            </div>

            <div className={style.MainDivForInput}>
              <div className={style.SubDivForInput}>
                <Label for={"NewPassword"}>New Password</Label>
                <InputPassword
                  placeholder={"Enter new password"}
                  name={"NewPassword"}
                  type={"password"}
                  disable={false}
                  value={values.NewPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.NewPassword && touched.NewPassword && (
                  <ErrorText text={errors.NewPassword} />
                )}
              </div>

              <div className={style.SubDivForInput}>
                <Label for={"ConfirmPassword "}>Confirm Password</Label>
                <InputPassword
                  placeholder={"Enter confirm password"}
                  name={"ConfirmPassword"}
                  type={"password"}
                  disable={false}
                  value={values.ConfirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.ConfirmPassword && touched.ConfirmPassword && (
                  <ErrorText text={errors.ConfirmPassword} />
                )}
              </div>
            </div>
            <div className={style.SaveBtn}>
              <Button className={style.saveBtnInner} type={"submit"} text={"Save"} />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
