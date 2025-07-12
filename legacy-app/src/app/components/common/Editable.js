import React, { useEffect, useCallback, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import useKeyPress from "../../../hooks/useKeyPress";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

const Editable = (props) => {
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(props.text);
  const [dropDownToggle, setDropDownToggle] = useState(false);

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);

  const enter = useKeyPress("Enter");
  const esc = useKeyPress("Escape");

  // check to see if the user clicked outside of this component
  useOnClickOutside(
    wrapperRef,
    useCallback(() => {
      // debugger;
      if (isInputActive && !dropDownToggle) {
        props?.onSetText(inputValue);
        setIsInputActive(false);
      }
    }, [dropDownToggle])
  );

  const onEnter = useCallback(() => {
    if (enter && !dropDownToggle) {
      props.onSetText(inputValue);
      setIsInputActive(false);
      setDropDownToggle(false);
    }
  }, [enter, inputValue, props.onSetText, dropDownToggle]);

  const onSave = () => {
    props.onSetText(inputValue);
    setIsInputActive(false);
    setDropDownToggle(false);
  };

  const onEsc = useCallback(() => {
    if (esc) {
      setInputValue(props.text);
      setIsInputActive(false);
      setDropDownToggle(false);
    }
  }, [esc, props.text]);

  const onCancel = () => {
    setInputValue(props.text);
    setIsInputActive(false);
    setDropDownToggle(false);
  };

  // focus the cursor in the input field on edit start
  useEffect(() => {
    if (isInputActive) {
      inputRef?.current?.focus();
    }
  }, [isInputActive]);

  useEffect(() => {
    if (isInputActive) {
      // if Enter is pressed, save the text and close the editor
      onEnter();
      // if Escape is pressed, revert the text and close the editor
      onEsc();
    }
  }, [onEnter, onEsc, isInputActive]); // watch the Enter and Escape key presses

  const handleInputChange = useCallback(
    (event, inputType) => {
      // sanitize the input a little
      setInputValue(event.target.value);
      if (inputType === "Dropdown") {
        setDropDownToggle(true);
      }
    },
    [setInputValue]
  );

  const handleSpanClick = useCallback(() => {
    setIsInputActive(true);
  }, []);

  return (
    <div className="flex justify-content-center" ref={wrapperRef}>
      <span
        ref={textRef}
        onClick={handleSpanClick}
        className={`inline-text_copy inline-text_copy ${
          !isInputActive ? "active" : "hidden"
        }`}
      >
        {props.text}
      </span>
      {!props.dropDown && (
        <div
          className={`p-inputgroup w-full md:w-10rem ${
            isInputActive ? "active" : "hidden"
          }`}
        >
          <InputText
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button
            icon="pi pi-check"
            className="p-button-success p-button-text"
            onClick={onSave}
          />
          <Button
            icon="pi pi-times"
            className="p-button-danger p-button-text"
            onClick={onCancel}
          />
        </div>
      )}

      {props.dropDown && (
        <div
          className={`p-inputgroup w-full md:w-13rem ${
            isInputActive ? "active" : "hidden"
          }`}
        >
          <Dropdown
            value={inputValue}
            onChange={(event) => {
              handleInputChange(event, "Dropdown");
            }}
            options={props.toggleValue}
            optionLabel={"config_value"}
            placeholder={props.text}
          />
          <Button
            icon="pi pi-check"
            className="p-button-success p-button-text"
            onClick={onSave}
          />
          <Button
            icon="pi pi-times"
            className="p-button-danger p-button-text"
            onClick={onCancel}
          />
        </div>
      )}
    </div>
  );
};

export default Editable;
