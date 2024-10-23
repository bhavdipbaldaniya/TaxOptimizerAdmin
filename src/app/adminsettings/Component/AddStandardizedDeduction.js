"use client";
import Back from "@/src/Component/Back/page";
import Breadcrumb from "@/src/Component/Breadcrumb/page";
import React, { useState } from "react";
import style from "../Component/setting.module.css";
import { Label } from "@/src/Component/FormElement/Lable";
import Dropdown from "@/src/Component/FormElement/Dropdown";
import HeadingTextH1 from "@/src/Typography/text/HeadingTextH1";
import InputNum from "@/src/Component/FormElement/InputNum";
import Button from "@/src/Component/FormElement/Button";
import { useRouter } from "next/navigation";
import Heading3Fonts from "@/src/Typography/text/Heading3Fonts";
import * as Yup from "yup";
import { useFormik } from "formik";
import ErrorText from "@/src/Typography/text/ErrorText";

const AddStandardizedDeduction = () => {
  const currentYear = new Date().getFullYear();
  const router = useRouter();

  const [selectedYear, setSelectedYear] = useState(currentYear);

  const createDeductionValidationSchema = () => {
    return Yup.object({
      standardDeduction: Yup.number()
        .required("Please enter the standard deduction.")
        .min(0, "Standard deduction cannot be negative."),
      additionalSenior: Yup.number()
        .required("Please enter the additional senior deduction.")
        .min(0, "Additional senior deduction cannot be negative."),
      additionalBlind: Yup.number()
        .required("Please enter the additional blind deduction.")
        .min(0, "Additional blind deduction cannot be negative."),
    });
  };
  const StandardDeductionValidation = Yup.object({
    deductions: Yup.array().of(createDeductionValidationSchema()),
  });

  const initialDeductionFields = [
    {
      fillingStatus: "Single Filers",
      standardDeduction: "",
      additionalSenior: "",
      additionalBlind: "",
    },
    {
      fillingStatus: "Married Filing Jointly",
      standardDeduction: "",
      additionalSenior: "",
      additionalBlind: "",
    },
    {
      fillingStatus: "Married Filing Separately",
      standardDeduction: "",
      additionalSenior: "",
      additionalBlind: "",
    },
    {
      fillingStatus: "Head of Household",
      standardDeduction: "",
      additionalSenior: "",
      additionalBlind: "",
    },
  ];

  const formik = useFormik({
    initialValues: {
      deductions: initialDeductionFields,
    },
    validationSchema: StandardDeductionValidation,
    onSubmit: async (values, action) => {
      console.log("Saved JSON Data:", {
        year: selectedYear,
        deductions: values.deductions,
      });
      action.resetForm();
    },
  });

  const {
    handleBlur,
    handleReset,
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
  } = formik;
  const yearOptions = Array.from(new Array(50), (val, index) => ({
    name: (currentYear - index).toString(),
    value: currentYear - index,
  }));

  const BackClick = () => {
    router.push("/adminsettings");
  };

  return (
    <>
      <Back onClick={BackClick} text={"Add Standard Deduction Rate"} />
      <Breadcrumb
        paths={[
          { name: "Admin Settings", route: "/adminsettings" },
          { name: "Add Standard Deduction Rate" },
        ]}
      />
      <div>
        <form onSubmit={handleSubmit}>
          <div className={style.EditMainDivForHederContent}>
            <div className={style.EditMainDivForYearAndStatus}>
              <div>
                <Label className={style.EditLable}>{"Select Year"}</Label>
                <Dropdown
                  data={yearOptions}
                  value={selectedYear}
                  setValue={setSelectedYear}
                  className={style.DropDownValiue}
                  disable={false}
                />
              </div>
              <span className={style.EditLastModifyDev}>
                Last modified on 24/02/2023
              </span>
            </div>
          </div>
          <div className={style.EditMainDivTaxableIncomeRange}>
            <div className={style.HedingMainDiv}>
              <HeadingTextH1 text={"Standard Deduction Rate"} />
            </div>

            <div className={style.MainDivForEditSd}>
              {initialDeductionFields.map((field, index) => (
                <div
                  key={index}
                  className={style.ManiDivForEditInformationFildSD}
                >
                  <Heading3Fonts
                    className={style.HadingTextSD}
                    text={field.fillingStatus}
                  />
                  <div>
                    <div className={style.EditMainDivForInputAndLableSectionSD}>
                      <div className={style.EditLebulManegeDivSD}>
                        <Label for={"standardDeduction"}>
                          {"Standard Deduction"}
                        </Label>
                        <InputNum
                          placeholder={"$0.00"}
                          value={values.deductions[index]?.standardDeduction}
                          //   onChange={(e) =>
                          //     handleFieldChange(
                          //       index,
                          //       "standardDeduction",
                          //       e.target.value
                          //     )
                          //   }

                          name={`deductions[${index}].standardDeduction`}
                          disable={false}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.deductions?.[index]?.standardDeduction &&
                          errors.deductions?.[index]?.standardDeduction && (
                            <ErrorText
                              text={errors.deductions[index].standardDeduction}
                            />
                          )}
                      </div>
                      <div className={style.EditLebulManegeDivSD}>
                        <Label for={"additionalSenior"}>
                          {"Additional Deduction for Seniors (60+)"}
                        </Label>
                        <InputNum
                          placeholder={"$0.00"}
                          value={values.deductions[index]?.additionalSenior}
                          //   onChange={(e) =>
                          //     handleFieldChange(
                          //       index,
                          //       "additionalSenior",
                          //       e.target.value
                          //     )
                          //   }
                          name={`deductions[${index}].additionalSenior`}
                          disable={false}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.deductions?.[index]?.additionalSenior &&
                          errors.deductions?.[index]?.additionalSenior && (
                            <ErrorText
                              text={errors.deductions[index].additionalSenior}
                            />
                          )}
                      </div>
                      <div className={style.EditLebulManegeDivSD}>
                        <Label>{"Additional Deduction for Blind"}</Label>
                        <InputNum
                          placeholder={"$0.00"}
                          value={values.deductions[index]?.additionalBlind}
                          //   onChange={(e) =>
                          //     handleFieldChange(
                          //       index,
                          //       "additionalBlind",
                          //       e.target.value
                          //     )
                          //   }
                          name={`deductions[${index}].additionalBlind`}
                          disable={false}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.deductions?.[index]?.additionalBlind &&
                          errors.deductions?.[index]?.additionalBlind && (
                            <ErrorText
                              text={errors.deductions[index].additionalBlind}
                            />
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={style.MainDivForButtonCancelCreat}>
            <Button
              className={style.CancelButton}
              type={"button"}
              text={"Cancel"}
              onClick={handleReset}
            />
            <Button type={"submit"} text={"Save"} />
          </div>{" "}
        </form>
      </div>
    </>
  );
};

export default AddStandardizedDeduction;
