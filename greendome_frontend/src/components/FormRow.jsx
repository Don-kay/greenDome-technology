const FormRow = ({
  type,
  userRef,
  name,
  value,
  accept,
  multiple,
  check,
  handleChange,
  labelText,
  handleOnFocus,
  handleOnBlur,
  pattern,
  maxLength,
}) => {
  return (
    <div className="formrow">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        ref={userRef}
        id={name}
        type={type}
        accept={accept}
        placeholder={name}
        name={name}
        checked={check}
        value={value}
        onChange={handleChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        className="form-input"
        multiple={multiple}
        pattern={pattern}
        maxLength={maxLength}
      />
    </div>
  );
};
export default FormRow;
