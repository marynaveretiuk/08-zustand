"use client";

interface NotesErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function NotesError({ reset }: NotesErrorProps) {
  return (
    <main>
      <h2>Something went wrong in notes.</h2>
      <button type="button" onClick={() => reset()}>
        Try again
      </button>
    </main>
  );
}
