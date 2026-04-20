"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { fetchNotes } from "@/lib/api/notes";
import type { NoteTag } from "@/types/note";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

import css from "@/components/NotesClient/NotesClient.module.css";

interface NotesClientProps {
  initialTag: NoteTag;
}

export default function NotesClient({ initialTag }: NotesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? "1");
  const searchFromUrl = searchParams.get("search") ?? "";

  const [searchValue, setSearchValue] = useState(searchFromUrl);
  const [debouncedSearch, setDebouncedSearch] = useState(searchFromUrl);

  useEffect(() => {
    setSearchValue(searchFromUrl);
    setDebouncedSearch(searchFromUrl);
  }, [searchFromUrl]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    const nextUrl = `/notes/filter/${initialTag}?${params.toString()}`;
    const currentUrl = `/notes/filter/${initialTag}?${searchParams.toString()}`;

    if (nextUrl !== currentUrl) {
      router.push(nextUrl);
    }
  }, [debouncedSearch, initialTag, router, searchParams]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", initialTag, page, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        page,
        search: debouncedSearch,
        tag: initialTag,
      }),
  });

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handlePageChange = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));

    router.push(`/notes/filter/${initialTag}?${params.toString()}`);
  };

  if (isLoading) return <Loader />;

  if (isError || !data) {
    return <ErrorMessage message="Failed to load notes." />;
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.toolbar}>
          <SearchBox value={searchValue} onSearch={handleSearchChange} />

          <Link className={css.createButton} href="/notes/action/create">
            Create note +
          </Link>
        </div>

        <NoteList notes={data.notes} />

        <Pagination
          page={page}
          totalPages={data.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
}
