"use client";

import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onSearch: (value: string) => void;
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  return (
    <div className={css.form}>
      <input
        className={css.input}
        type="text"
        value={value}
        onChange={(event) => onSearch(event.target.value)}
        placeholder="Search notes"
      />
    </div>
  );
}
