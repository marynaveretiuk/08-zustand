import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NewNoteData } from "@/types/note";

export const initialDraft: NewNoteData = {
  title: "",
  content: "",
  tag: "Todo",
};

interface NoteStore {
  draft: NewNoteData;
  setDraft: (note: Partial<NewNoteData>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({
          draft: {
            ...state.draft,
            ...note,
          },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft-storage",
    },
  ),
);
