"use client";
import React, { useState } from "react";
import Back from "@/src/Component/Back/page";
import HeadingTextH1 from "@/src/Typography/text/HeadingTextH1";
import { Label } from "@/src/Component/FormElement/Lable";
import Input from "@/src/Component/FormElement/Input";
import InputNum from "@/src/Component/FormElement/InputNum";
import Dropdown from "@/src/Component/FormElement/Dropdown";
import ToggleOption from "@/src/Component/FormElement/ToggleOption";
import style from "./editplan.module.css";
import Button from "@/src/Component/FormElement/Button";
import { ic_Delete } from "@/src/Utils/svg";
import Breadcrumb from "@/src/Component/Breadcrumb/page";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useFormik } from "formik";
import ErrorText from "@/src/Typography/text/ErrorText";

const Editplan = () => {
  const router = useRouter();
  const options = [
    { label: "Monthly", value: "Monthly" },
    { label: "Yearly", value: "Yearly" },
  ];
  const [planTitle, setPlanTitle] = useState("");
  const [planAmount, setPlanAmount] = useState("");
  const [planDescription, setPlanDescription] = useState("");
  const [planType, setPlanType] = useState(options[0].value);
  const [features, setFeatures] = useState([
    { label: "Feature 1", placeholder: "Basic Tax Optimization", value: "" },
  ]);
  const [errMsg, setErrMsg] = useState("");
  const [showErr, setShowErr] = useState(false);
  const PlanFeaturesValidation = Yup.object({
    planTitle: Yup.string().required("Please enter the plan title."),
    planAmount: Yup.string().required("Please enter the plan amount."),
    planDescription: Yup.string().required("Plan description is required."),
    planType: Yup.string().required("Please select the plan type."),
    features: Yup.array()
      .of(
        Yup.string().required(
          "Please fill out the current feature before adding a new one."
        )
      )
      .min(1, "At least one feature must be added."),
  });

  const PlanFeaturesInitialValue = {
    planTitle: "",
    planAmount: "",
    planDescription: "",
    planDuration: "",
    planType: options[0].value,
    features: [""],
  };
  const formik = useFormik({
    initialValues: PlanFeaturesInitialValue,
    validationSchema: PlanFeaturesValidation,
    onSubmit: async (values, action) => {
      console.log(values);
      action.resetForm();
    },
  });

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
    handleReset,
  } = formik;

  const handleDeleteFeature = (indexToDelete) => {
    if (values.features.length > 1) {
      const updatedFeatures = values.features.filter(
        (_, index) => index !== indexToDelete
      );
      formik.setFieldValue("features", updatedFeatures);
    }
  };

  const handleAddFeature = () => {
    if (values.features[values.features.length - 1]?.trim() === "") {
      setErrMsg("");
      setFieldValue(`features[${values.features.length - 1}]`, "");
      formik.setTouched({
        ...touched,
        [`features[${values.features.length - 1}]`]: true,
      });
      setShowErr(true);
      setErrMsg("Please fill out the current feature before adding a new one.");
    } else {
      setFieldValue("features", [...values.features, ""]);
      setErrMsg("");
    }
  };

  const BackClick = () => {
    router.push("/manageplans");
  };

  return (
    <>
      <Back text={"Edit Plans"} onClick={() => BackClick()} />
      <Breadcrumb
        paths={[
          { name: "Manage Plans", route: "/manageplans" },
          { name: "Edit Plan" },
        ]}
      />
      <div>
        <form onSubmit={handleSubmit}>
          <div className={style.MainDivForPlanInformation}>
            <div className={style.HedingMainDiv}>
              <HeadingTextH1 text={"Plan Information"} />
            </div>
            <div className={style.ManiDivForPlanInformationFild}>
              <div className={style.MainDivForPlanTitle}>
                <div className={style.ManageWidthPlanTitle}>
                  <Label for={"planTitle"}>{"Plan Title"}</Label>
                  <Input
                    placeholder={"Eg: Premium"}
                    name={"planTitle"}
                    // value={planTitle}
                    // onChange={(e) => setPlanTitle(e.target.value)}
                    value={values.planTitle}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.planTitle && touched.planTitle && (
                    <ErrorText text={errors.planTitle} />
                  )}
                </div>
                <div className={style.ManageWidthPlanTitle}>
                  <Label>{"Plan Amount"}</Label>
                  <InputNum
                    placeholder={"Eg: $24K"}
                    name={"planAmount"}
                    // value={planAmount}
                    // onChange={(e) => setPlanAmount(e.target.value)}
                    value={values.planAmount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.planAmount && touched.planAmount && (
                    <ErrorText text={errors.planAmount} />
                  )}
                </div>
              </div>
              <div className={style.MainDivForDescriptionPlan}>
                <Label>{"Plan Description"}</Label>
                <Input
                  placeholder={"Eg. This is the best plan for professional CA"}
                  name={"planDescription"}
                  //   value={planDescription}
                  //   onChange={(e) => setPlanDescription(e.target.value)}

                  value={values.planDescription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.planDescription && touched.planDescription && (
                  <ErrorText text={errors.planDescription} />
                )}
              </div>
              <div className={style.MainDivForPlanType}>
                <div>
                  <Label>{"Plan Type"}</Label>
                  <ToggleOption
                    options={options}
                    // value={planType}
                    // onChange={setPlanType}
                    defaultOption={values.planType}
                    value={values.planType}
                    name="planType"
                    onChange={(val) => setFieldValue("planType", val)}
                  />
                  {errors.planType && touched.planType && (
                    <ErrorText text={errors.planType} />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={style.MainDivForPlanFeatures}>
            <div className={style.HedingMainDiv}>
              <HeadingTextH1 text={"Plan Features"} />
            </div>
            <div className={style.ManiDivForPlanInformationFild}>
              {values.features.map((feature, index) => (
                <div key={index} className={style.MainDivForfeatureAndDelete}>
                  <div className={style.MainDivForFeturshOption}>
                    {/* <Label>{feature.label}</Label> */}
                    <Label>{`Feature ${index + 1}`}</Label>
                    <Input
                      placeholder={"Basic Tax Optimization"}
                      //   value={feature.value}
                      //   onChange={(e) => handleInputChange(index, e.target.value)}
                      name={`features[${index}]`}
                      value={values.features[index] || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    {showErr &&
                      index === values.features.length - 1 &&
                      errMsg &&
                      values.features[index] === "" && (
                        <ErrorText text={errMsg} />
                      )}
                    {!showErr &&
                      errors.features &&
                      touched.features &&
                      touched.features[index] &&
                      errors.features[index] && (
                        <ErrorText text={errors.features[index]} />
                      )}
                  </div>
                  {values.features.length > 1 && (
                    <div
                      className={style.DeleteButton}
                      onClick={() => handleDeleteFeature(index)}
                    >
                      {ic_Delete.icon()}
                    </div>
                  )}
                </div>
              ))}
              <Button
                className={style.AddIncomeBtm}
                type={"button"}
                text={"+ Add more"}
                onClick={handleAddFeature}
              />
            </div>
          </div>

          <div className={style.MainDivForButtonCancelCreat}>
            <Button
              className={style.CancelButton}
              type={"reset"}
              text={"Cancel"}
              onClick={handleReset}
            />
            <Button type={"submit"} text={"Create Plan"} />
          </div>
        </form>
      </div>
    </>
  );
};

export default Editplan;
