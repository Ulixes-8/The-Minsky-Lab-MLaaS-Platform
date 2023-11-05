import React from "react";
import "../css/RadioItem.css";

interface CheckItemProps {
  id: string;
  text: string;
  name: string;
  isChecked: boolean;
  onToggle: () => void;
  theme: "black" | "nn";
}

export default function RadioItem(props: CheckItemProps) {
  const { id, text, isChecked, onToggle, theme, name } = props;

  return (
    <div className="radioitem">
    <div className={`check-item${theme === "nn" ? " nn-theme" : ""}`} tabIndex="0" onKeyPress={() => document.getElementById(id).click()}>
      <li>
        <input type="radio" id={id} checked={isChecked} onChange={onToggle} name={name} tabIndex="-1"/>
        <label htmlFor={id}>
          <div className="title">{id}</div>
          <div className="text">{text}</div>
          <span
            className={`checkmark${isChecked ? " checkmark-ticked" : ""}`}
          >
            {isChecked ? "✔" : "Select"}
          </span>
        </label>
      </li>
    </div>
    </div>
  );  
}
