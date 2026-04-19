"use client";

interface FilterErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function FilterError({ reset }: FilterErrorProps) {
  return (
    <main>
      <h2>Something went wrong while loading notes.</h2>
      <button type="button" onClick={() => reset()}>
        Try again
      </button>
    </main>
  );
}
