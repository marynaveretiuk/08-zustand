import type { Metadata } from 'next';
import NotesClient from './Notes.client';
import type { NoteTag } from '@/types/note';

interface NotesPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

function normalizeTag(rawTag: string): NoteTag {
  const normalized = rawTag.toLowerCase();

  switch (normalized) {
    case 'all':
      return 'All';
    case 'todo':
      return 'Todo';
    case 'work':
      return 'Work';
    case 'personal':
      return 'Personal';
    case 'meeting':
      return 'Meeting';
    case 'shopping':
      return 'Shopping';
    default:
      return 'All';
  }
}

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const rawTag = resolvedParams.slug?.[0] ?? 'all';
  const tag = normalizeTag(rawTag);

  return {
    title: `${tag} Notes | NoteHub`,
    description: `Browse ${tag.toLowerCase()} notes in NoteHub.`,
    openGraph: {
      title: `${tag} Notes | NoteHub`,
      description: `Browse ${tag.toLowerCase()} notes in NoteHub.`,
      url: `https://your-vercel-app.vercel.app/notes/filter/${rawTag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const resolvedParams = await params;
  const rawTag = resolvedParams.slug?.[0] ?? 'all';
  const tag = normalizeTag(rawTag);

  return <NotesClient initialTag={tag} />;
}
