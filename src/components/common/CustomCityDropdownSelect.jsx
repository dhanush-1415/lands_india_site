import { useEffect, useMemo, useRef, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function CustomCityDropdownSelect({
  options = [],
  placeholder = "Location",
  style,
  addtionalParentClass = "",
  onChange = () => {},
  onSearchChange = () => {},
  searchable = true,
  defaultOption,
  isLoading = false,
}) {
  const selectRef = useRef();
  const inputRef = useRef();
  const listRef = useRef();
  const [query, setQuery] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [selected, setSelected] = useState(defaultOption || "");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (newState) {
      selectRef.current?.classList.add("open");
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      selectRef.current?.classList.remove("open");
      setQuery(""); // Clear query when closing
      setHighlightIndex(-1);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
        selectRef.current?.classList.remove("open");
        setQuery(""); // Clear query when closing dropdown
        setHighlightIndex(-1);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Debounce query for API calls - only when user types
  useEffect(() => {
    if (!searchable || !isOpen) return;
    
    // Only make API call if query has at least 2 characters or is empty (for initial load)
    const trimmedQuery = query.trim();
    if (trimmedQuery.length === 0) return; // Don't call API for empty query
    
    const id = setTimeout(() => {
      if (trimmedQuery.length >= 1) {
        onSearchChange(trimmedQuery);
      }
    }, 300); // Increased debounce to 300ms
    
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, searchable, isOpen]); // Removed onSearchChange from deps to prevent re-triggers

  const visibleOptions = useMemo(() => {
    if (!searchable) return options;
    if (!query) return options;
    const q = query.toLowerCase();
    return options.filter((o) => String(o).toLowerCase().includes(q));
  }, [options, query, searchable]);

  const handleSelect = (value) => {
    setSelected(value);
    setQuery(""); // Clear query when item is selected
    onChange(value);
    toggleDropdown(); // Close dropdown
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.min(prev + 1, visibleOptions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0 && highlightIndex < visibleOptions.length) {
        handleSelect(visibleOptions[highlightIndex]);
      }
    } else if (e.key === "Escape") {
      toggleDropdown();
      setHighlightIndex(-1);
    }
  };

  useEffect(() => {
    if (!listRef.current) return;
    if (highlightIndex < 0) return;
    const el = listRef.current.children[highlightIndex];
    if (el && el.scrollIntoView) el.scrollIntoView({ block: "nearest" });
  }, [highlightIndex]);

  return (
    <>
      <div className={`nice-select ${addtionalParentClass}`} ref={selectRef} style={style}>
        <style>
          {`
            .custom-current{
              display: flex !important;
              padding-left: 7px !important;
            }
            .nice-select.open,
            .nice-select:focus,
            .nice-select:focus-within {
              border: none !important;
              outline: none !important;
              box-shadow: none !important;
            }
            .city-input-wrapper {
              width: 100%;
            }
            .city-input {
              width: 100%;
              border: none !important;
              outline: none !important;
              background: transparent;
              padding: 0;
              font-size: inherit;
              color: inherit;
              font-family: inherit;
              box-shadow: none !important;
            }
            .city-input:focus {
              border: none !important;
              outline: none !important;
              box-shadow: none !important;
            }
            .city-input::placeholder {
              color: #9aa4aa;
            }
            .list {
              max-height: 260px;
              overflow-y: auto;
            }
            .option.highlight {
              background: #f1f6ff;
              color: #008ff7;
            }
            .city-loader {
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 12px;
            }
          `}
        </style>
        <span onClick={toggleDropdown} className="custom-current">
          {isOpen && searchable ? (
            <div className="city-input-wrapper">
              <input
                ref={inputRef}
                className="city-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onClick={(e) => e.stopPropagation()}
                placeholder={placeholder}
                autoFocus
              />
            </div>
          ) : (
            selected || placeholder || (options[0] && options[0] !== "Location" ? options[0] : placeholder)
          )}
        </span>
        <ul className="list" ref={listRef}>
          {isLoading ? (
            <li className="option city-loader">
              <CircularProgress size={18} sx={{ color: '#008ff7' }} />
            </li>
          ) : visibleOptions?.length ? (
            visibleOptions.map((elm, i) => (
              <li
                key={`${elm}-${i}`}
                onMouseEnter={() => setHighlightIndex(i)}
                onMouseLeave={() => setHighlightIndex(-1)}
                onClick={() => handleSelect(elm)}
                className={`option ${
                  selected == elm ? "selected" : ""
                } ${highlightIndex === i ? "highlight" : ""} text text-1`}
              >
                {elm}
              </li>
            ))
          ) : (
            <li className="option text text-1" style={{ color: '#94a3b8' }}>No results</li>
          )}
        </ul>
      </div>
    </>
  );
}
