import React, { useEffect, useState } from "react";
import style from "./form.module.css";
import { Label } from "./Lable";
import Input from "./Input";
import Button from "./Button";

const Modal = ({ Heading, Caption, onClose, onClick }) => {
  return (
    <>
      <div className={style.ModalMainDiv}>
        <div className={style.ModelContain}>
          <div className={style.ModalHaed}>
            <div className={style.Modelheader}>
              <div>{Heading}</div>
            </div>
            <div className={style.ModelText}>{Caption}</div>
          </div>
          <div>
            <Label for={"first name"}>First name</Label>
            <Input
              className={style.ModalInput}
              placeholder={"input text hear..."}
              name={"x"}
              type={"text"}
            // disable={true}
            //   value={"Harshal bhoi"}
            // setValue={e.target.value}
            />
          </div>
          <div className={style.ModalButtons}>
            <Button
              onClick={onClose}
              className={style.ModalCancelButton}
              text={"Cancel"}
            />
            <Button onClick={onClick} className={style.ModalDeleteButton} text={"Delete"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
