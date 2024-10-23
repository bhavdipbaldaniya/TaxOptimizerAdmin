// import React from "react";
// import style from "./form.module.css";
// import { ic_CrossBtn } from "@/src/Utils/svg";
// import HeadingTextH1 from "@/src/Typography/text/HeadingTextH1";
// import Input from "./Input";
// import Lable from "@/src/Typography/text/Lable";
// import Button from "./Button";

// const DraftModal = () => {
//   return (
//     <>
//       <div className={style.ModalMainDiv}>
//         <div className={style.DraftModelContain}>
//           <div className={style.CrossSvg}>{ic_CrossBtn.icon()}</div>
//           <div className={style.ModalHaed}>
//             <div className={style.Modelheader}>
//               <HeadingTextH1 text={"Save Your Draft"} />
//             </div>
//             <div className={style.ModelText}>
//               Please name your draft. You can create up to 3 drafts. If you
//               reach the limit, you will need to delete an existing draft before
//               saving a new one.
//             </div>
//           </div>
//           <Lable text={"Draft"} />
//           <Input placeholder={"Enter draft name"} />
//           <div className={style.DraftModalSaveBtn}>
//             <Button className={style.CancellBtn} text={"Cancel"} />
//             <Button text={"Save"} type={"submit"} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DraftModal;
import React, { useState } from "react";
import style from "./form.module.css";
import { ic_CrossBtn } from "@/src/Utils/svg";
import HeadingTextH1 from "@/src/Typography/text/HeadingTextH1";
import Input from "./Input";
import Lable from "@/src/Typography/text/Lable";
import Button from "./Button";

const DraftModal = ({ isOpen, onClose, onSave }) => {
  const [draftName, setDraftName] = useState("");

  const handleSave = () => {
    if (draftName) {
      onSave(draftName); // Call the onSave function passed as a prop
      setDraftName("");   // Clear the input after saving
      onClose();          // Close the modal
    } else {
      alert("Please enter a draft name."); // Optional: Alert for empty input
    }
  };

  if (!isOpen) return null; // Don't render if modal is not open

  return (
    <div className={style.ModalMainDiv}>
      <div className={style.DraftModelContain}>
        <div className={style.CancellBtn} onClick={onClose}>
          {ic_CrossBtn.icon()}
        </div>
        <div className={style.ModalHaed}>
          <div className={style.Modelheader}>
            <HeadingTextH1 text={"Save Your Draft"} />
          </div>
          <div className={style.ModelText}>
            Please name your draft. You can create up to 3 drafts. If you
            reach the limit, you will need to delete an existing draft before
            saving a new one.
          </div>
        </div>
        <Lable text={"Draft"} />
        <Input 
          placeholder={"Enter draft name"} 
          value={draftName} 
          onChange={(e) => setDraftName(e.target.value)} 
        />
        <div className={style.DraftModalSaveBtn}>
          <Button className={style.CancellBtn} text={"Cancel"} onClick={onClose} />
          <Button text={"Save"} onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default DraftModal;
