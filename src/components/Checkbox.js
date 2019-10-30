import React from "react";

const Checkbox = ({
  onChange,
  label,
  checked,
  className,
  indeterminate,
  disabled
}) => (
  <label className={`input-checkbox ${className ? className : ""}`}>
    <input
      type="checkbox"
      checked={checked}
      ref={elem => elem && (elem.indeterminate = indeterminate || false)}
      onChange={e => onChange(e.target.checked)}
      disabled={disabled}
    />
    <i />
    <div className="caption">{label}</div>
  </label>
);

export default Checkbox;
