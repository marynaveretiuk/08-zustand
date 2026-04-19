"use client";

interface NoteErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function NoteError({ reset }: NoteErrorProps) {
  return (
    <main style={{ padding: "40px" }}>
      <h2>Something went wrong while loading this note.</h2>
      <button type="button" onClick={() => reset()}>
        Try again
      </button>
    </main>
  );
}
