export const MySwitch = ({
  isOn,
  handleToggle,
  id,
  colorOne,
  colorTwo,
}: any) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="switch-checkbox"
        id={`${id}`}
        type="checkbox"
      />
      <label
        style={{ background: isOn ? colorOne : colorTwo }}
        className="switch-label"
        htmlFor={`${id}`}
      >
        <span className={`switch-button`} />
      </label>
    </>
  );
};
