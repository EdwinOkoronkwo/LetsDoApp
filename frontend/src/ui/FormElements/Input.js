import React from "react";
import { Input as AntdInput, Form } from "antd"; // Import Antd Input and Form
import { useInput } from "../hooks/useInput"; // Import custom hook
import "./Input.css";

const Input = ({
  id,
  label,
  placeholder,
  errorText,
  validators,
  resetOnModalOpen,
  element,
  rows,
}) => {
  const { value, isValid, isTouched, changeHandler, touchHandler } = useInput(
    "",
    validators,
    resetOnModalOpen
  );

  return (
    <Form.Item
      label={label}
      htmlFor={id}
      validateStatus={isTouched && !isValid ? "error" : ""}
      help={isTouched && !isValid ? errorText : ""}
    >
      {element === "textarea" ? (
        <AntdInput.TextArea
          id={id}
          rows={rows || 3}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={value}
          placeholder={placeholder}
        />
      ) : (
        <AntdInput
          id={id}
          type="text"
          onChange={changeHandler}
          onBlur={touchHandler}
          value={value}
          placeholder={placeholder}
        />
      )}
    </Form.Item>
  );
};

export default Input;
