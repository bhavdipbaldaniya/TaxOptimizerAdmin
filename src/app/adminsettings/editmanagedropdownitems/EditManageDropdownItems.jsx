"use client";
import Back from "@/src/Component/Back/page";
import Breadcrumb from "@/src/Component/Breadcrumb/page";
import React, { useState } from "react";
import style from "../Component/setting.module.css";
import { Label } from "@/src/Component/FormElement/Lable";
import HeadingTextH1 from "@/src/Typography/text/HeadingTextH1";
import Button from "@/src/Component/FormElement/Button";
import { useRouter } from "next/navigation";
import Input from "@/src/Component/FormElement/Input";
import { ic_Delete } from "@/src/Utils/svg";
import * as Yup from "yup";
import { useFormik } from "formik";
import ErrorText from "@/src/Typography/text/ErrorText";

const EditManageDropdownItems = () => {
  const router = useRouter();
  const [fields, setFields] = useState([{ incomeType: "" }]);
  const [addFieldError, setAddFieldError] = useState("");

  const handleInputChange = (index, event) => {
    const values = [...fields];
    values[index].incomeType = event.target.value;
    setFields(values);
    setFieldValue(`fields[${index}].incomeType`, event.target.value);
    setAddFieldError("");
  };

  const handleAddField = () => {
    if (fields[fields.length - 1].incomeType.trim() !== "") {
      setFields([...fields, { incomeType: "" }]);
      setFieldValue(`fields[${fields.length}]`, { incomeType: "" });
      setAddFieldError("");
    } else {
      setAddFieldError(
        "Please fill the current field before adding a new one."
      );
    }
  };

  const handleDeleteField = (index) => {
    const values = [...fields];
    values.splice(index, 1);
    setFields(values);
    setFieldValue("fields", values);
    setAddFieldError(""); 
  };

  const BackClick = () => {
    router.push("/adminsettings");
  };

  const incomeTypeValidationSchema = Yup.object({
    fields: Yup.array()
      .of(
        Yup.object({
          incomeType: Yup.string().required("Income type is required."),
        })
      )
      .min(1, "At least one income type is required."),
  });

  const formik = useFormik({
    initialValues: { fields: fields },
    validationSchema: incomeTypeValidationSchema,
    onSubmit: (values, action) => {
      const jsonData = { fields: values.fields };
      console.log("Saved JSON Data:", jsonData);
      action.resetForm();
      setFields([{ incomeType: "" }]);
      setAddFieldError("");
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
  } = formik;

  return (
    <>
      <Back onClick={BackClick} text={"Edit Income type"} />
      <Breadcrumb
        paths={[
          { name: "Admin Settings", route: "/adminsettings" },
          { name: "Edit Income type" },
        ]}
      />
      <div>
        <form onSubmit={handleSubmit}>
          <div className={style.EditMainDivTaxableIncomeRange}>
            <div className={style.HedingMainDiv}>
              <HeadingTextH1 text={"Income options"} />
            </div>
            <div className={style.MainDivForEditSd}>
              <div className={style.ManiDivForEditInformationFildSD}>
                {fields.map((field, index) => (
                  <div
                    key={index}
                    className={style.EditMainDivForInputAndLableSectionDI}
                  >
                    <div className={style.EditLebulManegeDivSD}>
                      <Label>{"Income Type"}</Label>
                      <Input
                        placeholder={"Enter Income Type"}
                        value={values.fields[index]?.incomeType || ""}
                        name={`fields[${index}].incomeType`}
                        onChange={(e) => handleInputChange(index, e)}
                        onBlur={handleBlur}
                      />
                      {touched.fields?.[index]?.incomeType &&
                        errors.fields?.[index]?.incomeType && (
                          <ErrorText text={errors.fields[index].incomeType} />
                        )}
                    </div>
                    {fields.length > 1 && (
                      <div
                        className={style.DeleteButton}
                        onClick={() => handleDeleteField(index)}
                      >
                        {ic_Delete.icon()}
                      </div>
                    )}
                  </div>
                ))}
                <Button
                  className={style.AddIncomeBtmDI}
                  type="button"
                  text="+ Add more"
                  onClick={handleAddField}
                />
                {addFieldError && <ErrorText text={addFieldError} />}
              </div>
            </div>
          </div>
          <div className={style.MainDivForButtonCancelCreat}>
            <Button type="submit" text="Save" />
          </div>
        </form>
      </div>
    </>
  );
};

export default EditManageDropdownItems;
