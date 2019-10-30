import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateVal, toggleOption, addOption } from "../actions";
import Checkbox from "./Checkbox";
import "./checkbox.scss";

const s2p = state => state;
const d2p = dispatch => ({
  changeVal: val => dispatch(updateVal(val)),
  toggleOption: id => dispatch(toggleOption(id)),
  addOption: val => dispatch(addOption(val))
});

// To make sure its pure reverse
function reverseArr(input) {
  var ret = [];
  for (var i = input.length - 1; i >= 0; i--) {
    ret.push(input[i]);
  }
  return ret;
}

const Options = ({ initVal, options, addOption }) => {
  const emptyArr = new Array(options.length).fill(0);
  const maxNum = parseInt(+"1".repeat(options.length), 2);

  const [value, changeVal] = useState(initVal);
  const [checkedArr, updateCheckedArr] = useState(valToArr(value));
  const [isDisabled, toggleDisabled] = useState(false);
  const [error, changeError] = useState(null);
  const [newOption, onUpdateNewOption] = useState("");

  function valToArr(val) {
    //converts strings to num and crete array
    const valToNumArray = [...(+val).toString(2)].map(Number);
    if (val <= maxNum) {
      const emptyNumArray = new Array(
        options.length - valToNumArray.length
      ).fill(0);
      const mergedArrays = [...emptyNumArray, ...valToNumArray];
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

    const reverseNum = reverseArr(updatedArray).join("");
    const val = parseInt(reverseNum, 2);
    changeVal(val);
  };

  const submitOption = name => () => {
    if (name && name !== "") {
      onUpdateNewOption("");
      addOption(name);
    }
  };

  const updateNum = e => {
    const val = e.target.value;
    const validate = /\d+/.test(parseInt(+val, 10)) && val !== 0;
    if (validate) {
      // converts string to num
      const newVal = parseInt(+val, 10);

      const newArr = valToArr(newVal);

      if (newVal <= maxNum) {
        updateCheckedArr(newArr);
        changeError(null);
      } else {
        updateCheckedArr(emptyArr);
        changeError("Can not find any options for this");
      }
      changeVal(newVal);
    }

    // if (newArr.length <= options.length) {
    //   updateChecked(newArr);
    //   changeVal(newVal);
    // } else {
    //   changeVal(newVal);
    //   updateChecked(emptyArr);
    // }
  };

  return (
    <div className="options-wrap">
      <input type="text" value={value} onChange={updateNum} />

      {/* show error if there is some */}
      {error && <p>{error}</p>}

      {/* iterate trought the options array */}
      <div className="options">
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
      <input
        type="text"
        value={newOption}
        onChange={e => onUpdateNewOption(e.target.value)}
      />
      <button onClick={submitOption(newOption)}>Add option</button>
    </div>
  );
};

export default connect(
  s2p,
  d2p
)(Options);