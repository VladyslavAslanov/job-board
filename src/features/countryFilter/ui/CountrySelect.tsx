import { useEffect, useRef, useState } from "react";
import type { CountryOption } from "@/entities/country/model/country.model";
import styles from "./CountrySelect.module.less";

interface CountrySelectProps {
  id: string;
  value: string | null;
  options: CountryOption[];
  isLoading: boolean;
  error: string | null;
  onChange: (value: string | null) => void;
}

export function CountrySelect({
  id,
  value,
  options,
  isLoading,
  error,
  onChange,
}: CountrySelectProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const selectedOption =
    options.find((option) => option.value === value) ?? null;
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (!rootRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const openDropdown = () => {
    if (isLoading || error) {
      return;
    }

    const selectedIndex = options.findIndex((option) => option.value === value);
    setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setIsOpen(true);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (isOpen) {
      closeDropdown();
      return;
    }

    openDropdown();
  };

  const handleSelect = (nextValue: string | null) => {
    onChange(nextValue);
    closeDropdown();
    buttonRef.current?.focus();
  };

  const handleButtonKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (
      event.key === "ArrowDown" ||
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      openDropdown();
    }
  };

  const handleOptionKeyDown = (
    event: React.KeyboardEvent<HTMLLIElement>,
    index: number,
    optionValue: string | null
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((prev) => Math.min(prev + 1, options.length));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelect(optionValue);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeDropdown();
      buttonRef.current?.focus();
      return;
    }

    if (event.key === "Tab") {
      closeDropdown();
      return;
    }

    if (index !== highlightedIndex) {
      setHighlightedIndex(index);
    }
  };

  const allOptions: Array<CountryOption | { value: null; label: string }> = [
    { value: null, label: "All countries" },
    ...options,
  ];

  return (
    <div className={styles.selectRoot} ref={rootRef}>
      <button
        id={id}
        ref={buttonRef}
        type="button"
        className={styles.trigger}
        onClick={toggleDropdown}
        onKeyDown={handleButtonKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${id}-listbox`}
      >
        <span className={styles.triggerText}>
          {isLoading
            ? "Loading countries..."
            : (selectedOption?.label ?? "All countries")}
        </span>

        <span className={styles.chevron} aria-hidden="true">
          ▾
        </span>
      </button>

      {error ? <p className={styles.message}>{error}</p> : null}

      {isOpen ? (
        <ul
          id={`${id}-listbox`}
          className={styles.dropdown}
          role="listbox"
          aria-label="Country options"
        >
          {allOptions.map((option, index) => {
            const isSelected = option.value === value;
            const isHighlighted = index === highlightedIndex;

            return (
              <li
                key={option.value ?? "all-countries"}
                className={styles.optionItem}
                role="option"
                aria-selected={isSelected}
                tabIndex={0}
                onClick={() => handleSelect(option.value)}
                onMouseEnter={() => setHighlightedIndex(index)}
                onKeyDown={(event) =>
                  handleOptionKeyDown(event, index, option.value)
                }
                data-selected={isSelected}
                data-highlighted={isHighlighted}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
