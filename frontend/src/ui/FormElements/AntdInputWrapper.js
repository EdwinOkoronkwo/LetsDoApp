import React from "react";
import { Form } from "antd";
import Input from "./Input";
import { validate } from "../../../shared/util/validator";

const AntdInputWrapper = ({
  name,
  label,
  validators,
  errorText,
  ...restProps
}) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          validator: (_, value) => {
            const isValid = validate(value, validators);
            return isValid
              ? Promise.resolve()
              : Promise.reject(new Error(errorText));
          },
        },
      ]}
      validateTrigger="onBlur"
    >
      <Input {...restProps} validators={validators} errorText={errorText} />
    </Form.Item>
  );
};

export default AntdInputWrapper;
