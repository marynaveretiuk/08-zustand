import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchNoteById } from "@/lib/api/notes";
import css from "./page.module.css";

interface NoteDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: NoteDetailsPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);

    return {
      title: `${note.title} | NoteHub`,
      description: note.content,
      openGraph: {
        title: `${note.title} | NoteHub`,
        description: note.content,
        url: `https://your-vercel-app.vercel.app/notes/${id}`,
        images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
      },
    };
  } catch {
    return {
      title: "Note not found | NoteHub",
      description: "The requested note does not exist.",
      openGraph: {
        title: "Note not found | NoteHub",
        description: "The requested note does not exist.",
        url: `https://your-vercel-app.vercel.app/notes/${id}`,
        images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
      },
    };
  }
}

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);

    return (
      <main className={css.main}>
        <div className={css.container}>
          <article className={css.card}>
            <h1 className={css.title}>{note.title}</h1>
            <p className={css.content}>{note.content}</p>
            <p className={css.tag}>{note.tag}</p>
          </article>
        </div>
      </main>
    );
  } catch {
    notFound();
  }
}
