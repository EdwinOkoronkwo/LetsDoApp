import { useReducer, useEffect } from "react";
import { validate } from "../../utils/validator"; // Assuming you have a custom validate function

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    case "RESET":
      return {
        value: "",
        isTouched: false,
        isValid: false,
      };
    default:
      return state;
  }
};

export const useInput = (
  initialValue = "",
  validators = [],
  resetOnModalOpen = false
) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue,
    isTouched: false,
    isValid: false,
  });

  // Reset validation state when modal is opened
  useEffect(() => {
    if (resetOnModalOpen) {
      dispatch({ type: "RESET" });
    }
  }, [resetOnModalOpen]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: validators,
    });
  };

  const touchHandler = () => {
    dispatch({ type: "TOUCH" });
  };

  const reset = () => dispatch({ type: "RESET" });

  return {
    value: inputState.value,
    isValid: inputState.isValid,
    isTouched: inputState.isTouched,
    changeHandler,
    touchHandler,
    reset, // Explicit reset function
  };
};
