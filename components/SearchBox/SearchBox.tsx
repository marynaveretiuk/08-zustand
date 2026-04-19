"use client";

import { useState } from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  initialValue?: string;
  onSearch: (value: string) => void;
}

export default function SearchBox({
  initialValue = "",
  onSearch,
}: SearchBoxProps) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search notes"
      />
      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  );
}
