const TextARea = ({
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
  className,
}) => {
  return (
    <div className=" relative left-0 flex justify-start items-center flex-row">
      <label htmlFor={name} className=" px-5 font-medium">
        {labelText || name}
      </label>
      <textarea
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
        className={className}
        multiple={multiple}
        pattern={pattern}
        maxLength={maxLength}
      />
    </div>
  );
};
export default TextARea;
