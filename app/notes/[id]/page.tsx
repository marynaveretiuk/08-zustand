import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchNoteById } from "@/lib/api/notes";
import NoteDetailsClient from "./NoteDetails.client";

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
      <NoteDetailsClient
        title={note.title}
        content={note.content}
        tag={note.tag}
      />
    );
  } catch {
    notFound();
  }
}
