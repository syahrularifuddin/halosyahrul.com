'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import useBlogContentLanguages from '@/modules/Blog/hooks/useBlogContentLanguages';

import { ISLAND_BUTTON } from './Menu';

export default function BackButton() {
  const router = useRouter();

  const { languagesCount } = useBlogContentLanguages();

  if (languagesCount < 1) return null;

  return (
    <button
      type="button"
      onClick={router.back}
      className={ISLAND_BUTTON}
      aria-label="Back"
    >
      <ChevronLeft className="h-[18px] w-[18px]" />
    </button>
  );
}
