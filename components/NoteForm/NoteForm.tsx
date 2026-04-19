"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createNote } from "@/lib/api/notes";
import { initialDraft, useNoteStore } from "@/lib/store/noteStore";
import type { NewNoteData } from "@/types/note";

import css from "./NoteForm.module.css";

const tagOptions: NewNoteData["tag"][] = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
];

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const clearDraft = useNoteStore((state) => state.clearDraft);

  const [formData, setFormData] = useState<NewNoteData>(initialDraft);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setFormData(draft);
    setIsHydrated(true);
  }, [draft]);

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      clearDraft();
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.push("/notes/filter/all");
      router.refresh();
    },
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    const nextData = {
      ...formData,
      [name]: value,
    } as NewNoteData;

    setFormData(nextData);
    setDraft({ [name]: value } as Partial<NewNoteData>);
  };

  const handleSubmit = async (formDataFromForm: FormData) => {
    const title = String(formDataFromForm.get("title") ?? "").trim();
    const content = String(formDataFromForm.get("content") ?? "").trim();
    const tag = String(
      formDataFromForm.get("tag") ?? "Todo",
    ) as NewNoteData["tag"];

    if (!title || !content) {
      return;
    }

    mutation.mutate({ title, content, tag });
  };

  const handleCancel = () => {
    router.back();
  };

  if (!isHydrated) {
    return null;
  }

  return (
    <form className={css.form} action={handleSubmit}>
      <label className={css.label}>
        Title
        <input
          className={css.input}
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter note title"
          required
        />
      </label>

      <label className={css.label}>
        Content
        <textarea
          className={css.textarea}
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Enter note content"
          rows={8}
          required
        />
      </label>

      <label className={css.label}>
        Tag
        <select
          className={css.select}
          name="tag"
          value={formData.tag}
          onChange={handleChange}
        >
          {tagOptions.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </label>

      <div className={css.actions}>
        <button
          className={css.submitButton}
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create"}
        </button>

        <button
          className={css.cancelButton}
          type="button"
          onClick={handleCancel}
          disabled={mutation.isPending}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
