const Input = ({
  label,
  id,
  name,
  type,
  value,
  placeholder,
  onchange,
  classname,
}) => {
  return (
    <div className={classname}>
      {label ? (
        <label style={{ display: "block" }} htmlFor={id}>
          {label}
        </label>
      ) : (
        <></>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onchange}
      />
    </div>
  );
};

export default Input;
