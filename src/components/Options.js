import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addOption } from "../actions";
import Checkbox from "./Checkbox";
import "./checkbox.scss";

const s2p = state => state;
const d2p = dispatch => ({
  addOption: val => dispatch(addOption(val))
});

// To make sure its pure reverse array
function reverseArr(input) {
  var ret = [];
  for (var i = input.length - 1; i >= 0; i--) {
    ret.push(input[i]);
  }
  return ret;
}

/// Here we get the props from Store
const Options = ({
  initVal,
  options,
  addOption,
  question,
  error: { number: errorBigNumber }
}) => {
  const emptyArr = new Array(options.length).fill(0); // Create the empty array to map the checkboxes
  const maxNum = parseInt(+"1".repeat(options.length), 2); /// if the value is higher then this - there is no answer

  const [value, changeVal] = useState(initVal);
  const [checkedArr, updateCheckedArr] = useState(valToArr(value));
  const [isDisabled, toggleDisabled] = useState(false);
  const [error, changeError] = useState(null);
  const [newOption, onUpdateNewOption] = useState("");

  /// The function that converts the number to an Array for our checkboxes
  function valToArr(val) {
    const valToNumArray = [...(+val).toString(2)].map(Number); //converts strings to num and create array

    if (val <= maxNum) {
      /// No answer
      const emptyNumArray = new Array(
        options.length - valToNumArray.length
      ).fill(0);
      const mergedArrays = [...emptyNumArray, ...valToNumArray]; // merge 2 arrays to create the full one to map the checkboxes
      return reverseArr(mergedArrays);
    } else {
      return checkedArr;
    }
  }

  useEffect(() => {
    /// If options is updated we should update the array of checkboxes
    updateCheckedArr(valToArr(value));
  }, [options]);

  const toggle = index => () => {
    // disable all options if clicked on the last checkbox
    if (index === -1) {
      changeVal(0);
      updateCheckedArr(emptyArr);
      toggleDisabled(!isDisabled);
      return;
    }

    const newVal = +!checkedArr[index];

    const updatedArray = checkedArr.map((item, i) => {
      return i === index ? newVal : item;
    });

    updateCheckedArr(updatedArray);

    const reverseNum = reverseArr(updatedArray).join(""); //reverse is optional here just to make it more handy
    const val = parseInt(reverseNum, 2);
    changeVal(val);
  };

  const submitOption = name => () => {
    // Create new option with checkbox
    if (name && name !== "") {
      onUpdateNewOption("");
      addOption(name);
    }
  };

  const updateNum = e => {
    const val = e.target.value;
    const validate = /\d+/.test(parseInt(+val, 10)) && val !== 0; // that will prevent the input from typing letters ot zeros
    if (validate) {
      // converts string to num
      const newVal = parseInt(+val, 10); // converts String to Number

      const newArr = valToArr(newVal);

      if (newVal <= maxNum) {
        updateCheckedArr(newArr);
        changeError(null);
      } else {
        updateCheckedArr(emptyArr);
        changeError(errorBigNumber);
      }
      changeVal(newVal);
    }
  };

  return (
    <div className="options-wrap row mg-3-v">
      <div className="col-lg-8 pd-2">
        <div className="options">
          <h2>{question}</h2>
          {/* iterate trough the options array */}
          {options.map((item, index) => (
            <Checkbox
              key={item.id}
              label={item.name}
              onChange={toggle(index)}
              checked={checkedArr[index]}
              disabled={isDisabled}
            />
          ))}

          {/* {We pass -1 just to make sure its out of array'sindex } */}
          <Checkbox label="Животные отсустуют" onChange={toggle(-1)} />
        </div>
        <div className="new-option">
          <input
            type="text"
            value={newOption}
            onChange={e => onUpdateNewOption(e.target.value)}
          />
          <button
            onClick={submitOption(newOption)}
            className="primary"
            disabled={!newOption.length}
          >
            Add option
          </button>
        </div>
      </div>
      <div className="col-lg-4 pd-2">
        <p className="note">
          You can change the number to specify your answer, or you can use
          checkboxes to see how the number will change.
        </p>
        <input
          type="text"
          value={value}
          onChange={updateNum}
          className="the-number"
        />

        {/* show error if there is some */}
        {value > maxNum && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

// Connects the Component to the Store and map State to Props and Dispatch functions to state
export default connect(
  s2p,
  d2p
)(Options);
