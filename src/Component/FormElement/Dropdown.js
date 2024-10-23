"us client";
import { useState, useRef, useEffect } from "react";
import Style from "./form.module.css";
import { ic_DropDown } from "@/src/Utils/svg";

const Dropdown = ({ data, value, onChange, className, disable, searchable, setValue }) => {
  const [isOpenSelectMain, setIsOpenSelectMain] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const selectRef = useRef(null);

  const handleClickOpenSelectMain = () => {
    if (!disable) {
      setIsOpenSelectMain(!isOpenSelectMain);
    }
  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpenSelectMain(false);
    }
  };

  const handleOptionSelect = (option) => {
    // onChange(option.value);  // Replace setValue with onChange
    setValue(option.value);
    setIsOpenSelectMain(false);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredData = data?.filter(
    (option) =>
      option.name
        ?.toString()
        .toLowerCase()
        .includes(searchValue.toLowerCase()) ||
      option.value?.toString().toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={selectRef}
      className={`${Style.SelectMain} ${className} ${disable && Style.disable}`}
    >
      <div className={Style.SelectSubMain} onClick={handleClickOpenSelectMain}>
        <span
          className={`${Style.Select} ${className} ${value ? Style.selectedText : ""
            }`}
        >
          {value
            ? data?.find((option) => option.value === value)?.name
            : "Select"}
        </span>
        {disable && <span>{ic_DropDown.icon()}</span>}
        {!disable && <span>{ic_DropDown.icon()}</span>}
      </div>

      {isOpenSelectMain && (
        <div
          className={Style.OpenSelectMain}
          onClick={(e) => e.stopPropagation()}
        >
          {searchable && (
            <input
              className={Style.search}
              type="search"
              placeholder={"Search"}
              value={searchValue}
              onChange={handleSearchChange}
            />
          )}
          <div>
            {filteredData?.map((option) => (
              <div
                key={option.value}
                className={`${Style.MainForOptionSelected} ${value === option.value ? Style.SelectedValue : ""
                  }`}
                onClick={() => handleOptionSelect(option)}
              >
                <div>{option.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
