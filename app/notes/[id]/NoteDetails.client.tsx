"use client";

interface NoteDetailsClientProps {
  title: string;
  content: string;
  tag: string;
}

export default function NoteDetailsClient({
  title,
  content,
  tag,
}: NoteDetailsClientProps) {
  return (
    <article>
      <h1>{title}</h1>
      <p>{content}</p>
      <p>{tag}</p>
    </article>
  );
}
