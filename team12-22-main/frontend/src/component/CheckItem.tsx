import React from "react";
import "../css/CheckItem.css";

interface CheckItemProps {
  id: string;
  text: string;
  isChecked: boolean;
  onToggle: () => void;
  theme: "black" | "nn";
}

export default function CheckItem(props: CheckItemProps) {
  const { id, text, isChecked, onToggle, theme } = props;

  return (
    <div className={`check-item${theme === "nn" ? " nn-theme" : ""}`} tabIndex="0" onKeyPress={() => document.getElementById(id).click()}>
      <li>
        <input type="checkbox" id={id} checked={isChecked} onChange={onToggle} tabIndex="-1"/>
          <label htmlFor={id}>
            <div className="title">{id}</div>
            <div className="text">{text}</div>
            <span
              className={`checkmark${isChecked ? " checkmark-ticked" : ""}`}
            >
              {isChecked ? "✔" : "Check"}
            </span>
          </label>
      </li>
    </div>
  );  
}
