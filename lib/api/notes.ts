import { api } from "./client";
import type {
  FetchNotesResponse,
  NewNoteData,
  Note,
  NoteTag,
} from "@/types/note";

interface FetchNotesParams {
  page?: number;
  search?: string;
  tag?: NoteTag;
}

export async function fetchNotes({
  page = 1,
  search = "",
  tag = "All",
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = {
    page,
    perPage: 12,
  };

  if (search.trim() !== "") {
    params.search = search.trim();
  }

  if (tag !== "All") {
    params.tag = tag;
  }

  const { data } = await api.get<FetchNotesResponse>("/notes", { params });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(noteData: NewNoteData): Promise<Note> {
  const { data } = await api.post<Note>("/notes", noteData);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}
