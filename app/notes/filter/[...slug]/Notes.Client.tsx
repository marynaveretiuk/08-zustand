"use client";

import NotesClient from "@/components/NotesClient/NotesClient";
import type { NoteTag } from "@/types/note";

interface NotesClientWrapperProps {
  initialTag: NoteTag;
}

export default function NotesClientWrapper({
  initialTag,
}: NotesClientWrapperProps) {
  return <NotesClient initialTag={initialTag} />;
}
