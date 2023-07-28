const FormRow = ({
  type,
  userRef,
  name,
  value,
  check,
  handleChange,
  labelText,
  handleOnFocus,
  handleOnBlur,
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
        placeholder={name}
        name={name}
        checked={check}
        value={value}
        onChange={handleChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        className="form-input"
      />
    </div>
  );
};
export default FormRow;
