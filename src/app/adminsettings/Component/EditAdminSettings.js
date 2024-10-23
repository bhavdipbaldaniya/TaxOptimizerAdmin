"use client";
import Back from "@/src/Component/Back/page";
import Breadcrumb from "@/src/Component/Breadcrumb/page";
import React, { useState } from "react";
import style from "./setting.module.css";
import { Label } from "@/src/Component/FormElement/Lable";
import Dropdown from "@/src/Component/FormElement/Dropdown";
import HeadingTextH1 from "@/src/Typography/text/HeadingTextH1";
import InputNum from "@/src/Component/FormElement/InputNum";
import Button from "@/src/Component/FormElement/Button";
import { ic_Delete } from "@/src/Utils/svg";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useFormik } from "formik";
import ErrorText from "@/src/Typography/text/ErrorText";
import InputNumLimit from "@/src/Component/FormElement/InputNumLimit";

const EditAdminSettings = () => {
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const [errMsg, setErrMsg] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);

  const initialTaxFields = [
    { from: "", to: "", taxRate: "", noUpperLimit: false },
  ];
  const editAdminValidation = Yup.object({
    taxFields: Yup.array().of(
      Yup.object().shape({
        from: Yup.string().required("Please enter the starting value."),
        to: Yup.string().required("Please enter the ending value."),
        taxRate: Yup.string().required("Please enter the tax rate."),
      })
    ),
  });
  const editAdminInitialValue = {
    selectedYear: currentYear,
    activeStatus: "MarriedFilingJointly",
    taxFields: initialTaxFields,
  };

  const formik = useFormik({
    initialValues: editAdminInitialValue,
    validationSchema: editAdminValidation,
    onSubmit: (values, action) => {
      const updatedTaxFields = values.taxFields.map((field) => ({
        ...field,
        to: field.noUpperLimit ? -1 : field.to,
      }));
      const jsonData = {
        selectedYear: values.selectedYear,
        activeStatus: values.activeStatus,
        taxFields: updatedTaxFields,
      };
      console.log(JSON.stringify(jsonData, null, 2));
      action.resetForm();
    },
  });

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
    setFieldError,
  } = formik;

  const handleAddField = () => {
    const lastField = values.taxFields[values.taxFields.length - 1];

    if (lastField.from && lastField.to && lastField.taxRate) {
      const newFields = [
        ...values.taxFields,
        { from: "", to: "", taxRate: "", noUpperLimit: false },
      ];
      setFieldValue("taxFields", newFields);
    } else {
      setShowErr(true);
      setErrMsg("Please fill out the current fields before adding new ones.");
    }
  };

  const handleDeleteField = (index) => {
    const updatedFields = values.taxFields.filter((_, i) => i !== index);
    setFieldValue("taxFields", updatedFields);
  };

  const handleCheckboxChange = (index) => {
    setShowDeleteBtn(!showDeleteBtn);
    const updatedFields = [...values.taxFields];
    updatedFields[index].noUpperLimit = !updatedFields[index].noUpperLimit;
    setFieldValue("taxFields", updatedFields);
  };

  const isAnyCheckboxChecked = values.taxFields.some(
    (field) => field.noUpperLimit
  );

  const yearOptions = Array.from(new Array(50), (val, index) => ({
    name: (currentYear - index).toString(),
    value: currentYear - index,
  }));

  const Status = [
    { value: "MarriedFilingJointly", name: "Married Filing Jointly" },
    { value: "Single", name: "Single" },
    { value: "MarriedFilingSeprately", name: "Married Filing Seprately" },
    { value: "HeadOfHousehold", name: "Head Of Household" },
  ];

  return (
    <>
      <Back
        onClick={() => router.push("/adminsettings")}
        text={"Edit Federal Tax Bracket"}
      />
      <Breadcrumb
        paths={[
          { name: "Admin Settings", route: "/adminsettings" },
          { name: "Edit Federal Tax" },
        ]}
      />
      <div>
        <form onSubmit={handleSubmit}>
          <div className={style.EditMainDivForHederContent}>
            <div className={style.EditMainDivForYearAndStatus}>
              <div>
                <Label className={style.selectedYearLabel}>{"Select Year"}</Label>
                <Dropdown
                  data={yearOptions}
                  value={values.selectedYear}
                  setValue={(val) => setFieldValue("selectedYear", val)}
                  className={style.DropDownValiue}
                />
              </div>
              <div>
                <Label className={style.EditLable}>{"Status"}</Label>
                <Dropdown
                  data={Status}
                  value={values.activeStatus}
                  setValue={(val) => setFieldValue("activeStatus", val)}
                  className={style.DropDownValiueStatus}
                />
              </div>
              <span className={style.EditLastModifyDev}>
                Last modified on 24/02/2023
              </span>
            </div>
          </div>

          <div className={style.EditMainDivTaxableIncomeRange}>
            <div className={style.HedingMainDiv}>
              <HeadingTextH1 text={"Plan Information"} />
            </div>

            <div className={style.ManiDivForEditInformationFild}>
              {values.taxFields.map((field, index) => (
                <div key={index}>
                  <div className={style.EditMainDivForInputAndLableSection}>
                    <div className={style.EditLebulManegeDiv}>
                      <Label>{"From"}</Label>
                      <InputNum
                        value={field.from}
                        name={`taxFields[${index}].from`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={"$0.00"}
                      />
                      {errors.taxFields?.[index]?.from &&
                        touched.taxFields?.[index]?.from && (
                          <ErrorText text={errors.taxFields[index].from} />
                        )}
                    </div>

                    <div className={style.EditLebulManegeDiv}>
                      <Label>{"To"}</Label>
                      <InputNum
                        value={field.noUpperLimit ? -1 : field.to}
                        name={`taxFields[${index}].to`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={"$11,600"}
                        disable={field.noUpperLimit}
                      />
                      {errors.taxFields?.[index]?.to &&
                        touched.taxFields?.[index]?.to && (
                          <ErrorText text={errors.taxFields[index].to} />
                        )}
                    </div>

                    <div className={style.EditLebulManegeDivSecond}>
                      <Label>{"Tax Rate"}</Label>
                      <InputNumLimit
                        value={field.taxRate}
                        name={`taxFields[${index}].taxRate`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={"10%"}
                        maxValue={100}
                      />
                      {errors.taxFields?.[index]?.taxRate &&
                        touched.taxFields?.[index]?.taxRate && (
                          <ErrorText text={errors.taxFields[index].taxRate} />
                        )}
                    </div>

                    {values.taxFields.length > 1 && !showDeleteBtn && (
                      <div
                        className={style.DeleteButton}
                        onClick={() => handleDeleteField(index)}
                      >
                        {ic_Delete.icon()}
                      </div>
                    )}
                  </div>

                  {index === values.taxFields.length - 1 && (
                    <div className={style.EditMainDivForCheckboxManage}>
                      <input
                        type="checkbox"
                        checked={field.noUpperLimit}
                        onChange={() => handleCheckboxChange(index)}
                      />
                      <Label>{"No Upper Limit"}</Label>
                    </div>
                  )}
                </div>
              ))}
              {showErr && errMsg && <ErrorText text={errMsg} />}
              {!isAnyCheckboxChecked && (
                <Button
                  className={style.AddIncomeBtm}
                  type={"button"}
                  text={"+ Add more"}
                  onClick={handleAddField}
                />
              )}
            </div>
          </div>

          <div className={style.MainDivForButtonCancelCreat}>
            <Button
              className={style.CancelButton}
              type={"button"}
              text={"Cancel"}
              onClick={formik.handleReset}
            />
            <Button type={"submit"} text={"Save"} />
          </div>
        </form>
      </div>
    </>
  );
};

export default EditAdminSettings;
