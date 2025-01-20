import { useEffect, useRef, useState } from "react";
const optionsDefault = ["Newest", "Oldest", "3 days"];
export default function DropdownSelect({
  onChange = (elm) => { },
  options = optionsDefault,
  defaultOption,
  addtionalParentClass = "",
  style
}) {
  const selectRef = useRef();
  const [selected, setSelected] = useState("");
  const toggleDropdown = () => {
    selectRef.current.classList.toggle("open");
  };

  useEffect(() => {

    if (defaultOption) {
      const normalizedOptions = options?.map(option => option?.trim().toLowerCase());
      const normalizedDefaultOption = defaultOption?.trim().toLowerCase();

      if (normalizedOptions.includes(normalizedDefaultOption)) {
        const originalOption = options.find(
          option => option.trim().toLowerCase() === normalizedDefaultOption
        );
        setSelected(originalOption); // Update state with the original name
      } else {
        console.log(`${defaultOption} is not found in options.`);
      }
    }
  }, [options, defaultOption])
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!selectRef.current.contains(event.target)) {
        selectRef.current.classList.remove("open");
      }
    };
    // Add event listeners to each dropdown element

    // Add a global click event listener to detect outside clicks
    document.addEventListener("click", handleClickOutside);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className={`nice-select ${addtionalParentClass}`} ref={selectRef} style={style}>
        <span onClick={() => toggleDropdown()} className="current" style={{display:'flex',fontSize:'15px'}}>
          {selected || options[0]}
        </span>
        <ul className="list">
          {options?.length && options.map((elm, i) => (
            <li
              key={i}
              onClick={() => {
                setSelected(elm);
                onChange(elm);
                toggleDropdown();
              }}
              className={`option ${selected == elm ? "selected" : ""
                }  text text-1`}
            >
              {elm}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
