'use client';
/* eslint-disable react-hooks/set-state-in-effect */

import { ArrowLeftIcon, ArrowRightIcon, ChevronLeft, ChevronRight, Search, Star, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

import cn from '@/designs/utils/cn';
import BlogCardList from '@/modules/Blog/components/CardList';
import FeaturedHero from '@/modules/Blog/components/FeaturedHero';
import { matchesPostQuery } from '@/modules/Blog/utils/search';
import type { ContentMeta } from '@/modules/Content/services/content-parser';
import PageHead from '@/packages/components/layouts/PageHead';
import range from '@/packages/utils/helpers/range';

interface Props {
  blogs: ContentMeta[];
  initialPage?: number;
  lang: string;
  localeDesc: {
    desc: string;
    searchPlaceholder: string;
    allTags: string;
    emptyState: string;
    clearSearch: string;
    readFeatured: string;
  };
}

const ITEMS_PER_PAGE = 10;

function BlogSearchFilter({ blogs, initialPage = 1, localeDesc }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isMounted, setIsMounted] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Sync state from URL query parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('q') || '';
      const tag = params.get('tag') || '';

      if (q) setSearchQuery(q);
      if (tag) setSelectedTag(tag);
      setIsMounted(true);
    }
  }, []);

  // Update URL query parameters on state changes
  const updateUrl = (q: string, tag: string | null) => {
    if (typeof window !== 'undefined' && isMounted) {
      const params = new URLSearchParams();
      if (q) params.set('q', q);
      if (tag) params.set('tag', tag);

      const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
      window.history.replaceState(null, '', newUrl);
    }
  };

  // Get all unique tags from all blogs
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    blogs.forEach((blog) => {
      if (blog.tags) {
        blog.tags.forEach((tag) => {
          if (tag.toLowerCase() !== 'featured') {
            tagsSet.add(tag);
          }
        });
      }
    });
    return Array.from(tagsSet).sort();
  }, [blogs]);

  // Latest featured post (blogs arrive sorted by date desc). Shown as the hero
  // only on the unfiltered list, and removed from the grid so it is not listed twice.
  const heroBlog = useMemo(() => blogs.find((blog) => blog.isFeatured), [blogs]);
  const isUnfiltered = !searchQuery && !selectedTag;

  // Handle filtering logic
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      if (isUnfiltered && heroBlog && blog.slugOriginal === heroBlog.slugOriginal) {
        return false;
      }

      const matchesSearch = matchesPostQuery(blog, searchQuery);

      const matchesTag =
        !selectedTag ||
        (selectedTag === 'featured'
          ? !!blog.isFeatured
          : blog.tags && blog.tags.includes(selectedTag));

      return matchesSearch && matchesTag;
    });
  }, [blogs, searchQuery, selectedTag, isUnfiltered, heroBlog]);

  // Reset pagination when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTag]);

  // Compute pagination bounds
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE) || 1;
  const activePage = Math.min(currentPage, totalPages);
  const pagedBlogs = useMemo(() => {
    const offset = (activePage - 1) * ITEMS_PER_PAGE;
    return filteredBlogs.slice(offset, offset + ITEMS_PER_PAGE);
  }, [filteredBlogs, activePage]);
  const showHero = isUnfiltered && activePage === 1 && !!heroBlog;

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    updateUrl(val, selectedTag);
  };

  const handleTagClick = (tag: string | null) => {
    setSelectedTag(tag);
    updateUrl(searchQuery, tag);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    updateUrl('', selectedTag);
  };

  const handleResetAll = () => {
    setSearchQuery('');
    setSelectedTag(null);
    updateUrl('', null);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 300, behavior: 'smooth' });
      }
    }
  };

  // Handle tags scroll navigation
  const handleScroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollOffset,
        behavior: 'smooth'
      });
    }
  };

  // Custom Pagination implementation for client states
  const renderPagination = () => {
    const pagesToDisplay = 5;
    let minPages = 1;
    let maxPages = totalPages;

    if (totalPages > pagesToDisplay) {
      if (currentPage >= pagesToDisplay) {
        const pagesToAdd = Math.floor(pagesToDisplay / 2);
        const newMaxPage = pagesToAdd + currentPage;
        if (newMaxPage > totalPages) {
          minPages = totalPages - pagesToDisplay + 1;
          maxPages = totalPages;
        } else {
          minPages = currentPage - pagesToAdd;
          maxPages = newMaxPage;
        }
      } else {
        minPages = 1;
        maxPages = pagesToDisplay;
      }
    }

    const pages = range(minPages, maxPages);

    return (
      <ul className="flex items-center justify-center select-none mt-4">
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Prev page"
            className={cn([
              'w-9 h-9 flex items-center justify-center text-base rounded-xl transition-all duration-300 border border-transparent',
              currentPage === 1
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:outline outline-primary dark:outline-accent cursor-pointer'
            ])}
          >
            <ArrowLeftIcon width={16} height={16} />
          </button>
        </li>
        {pages.map((page) => (
          <li key={page}>
            <button
              onClick={() => handlePageChange(page)}
              aria-label={`Go to page ${page}`}
              className={cn([
                'w-9 h-9 flex items-center justify-center text-base rounded-xl transition-all duration-300 mx-1 border border-transparent font-medium',
                currentPage === page
                  ? 'bg-base-content text-base-100 pointer-events-none'
                  : 'hover:outline outline-primary dark:outline-accent cursor-pointer text-base-content/85'
              ])}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className={cn([
              'w-9 h-9 flex items-center justify-center text-base rounded-xl transition-all duration-300 border border-transparent',
              currentPage === totalPages
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:outline outline-primary dark:outline-accent cursor-pointer'
            ])}
          >
            <ArrowRightIcon width={16} height={16} />
          </button>
        </li>
      </ul>
    );
  };

  const tagClassName = (isSelected: boolean) => cn([
    'flex shrink-0 cursor-pointer items-center gap-1 rounded-xl border px-3.5 py-1.5 font-mono text-xs font-medium transition-colors duration-200 md:text-sm',
    isSelected
      ? 'border-hero-content bg-hero-content text-hero'
      : 'border-hero-content/30 hover:bg-hero-content/10'
  ]);
  const arrowClassName = 'absolute z-10 grid h-8 w-8 cursor-pointer place-items-center rounded-xl bg-hero-content/10 transition-colors duration-200 hover:bg-hero-content/20';

  return (
    <div className="flex w-full flex-col">
      {/* the panel holds the search field and the tags; the posts sit on its bottom edge */}
      <PageHead overlap title="Blog" description={localeDesc.desc}>
        <div className="mt-7 flex max-w-xl items-center rounded-2xl bg-hero-content text-hero focus-within:ring-2 focus-within:ring-hero-note">
          <Search aria-hidden className="ml-4 h-5 w-5 shrink-0 opacity-60" />
          <input
            type="text"
            placeholder={localeDesc.searchPlaceholder}
            aria-label={localeDesc.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="h-12 w-full min-w-0 bg-transparent px-3 text-base outline-none placeholder:text-hero/60"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="mr-2 grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-xl hover:bg-hero/10"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="relative mt-4 flex max-w-2xl items-center px-10">
          <button type="button" onClick={() => handleScroll(-180)} className={`${arrowClassName} left-0`} aria-label="Scroll tags left">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div
            ref={scrollContainerRef}
            className="flex w-full flex-nowrap gap-2 overflow-x-auto scroll-smooth py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <button onClick={() => handleTagClick(null)} className={tagClassName(!selectedTag)}>
              {localeDesc.allTags}
            </button>
            <button onClick={() => handleTagClick('featured')} className={tagClassName(selectedTag === 'featured')}>
              <Star className="h-3 w-3 fill-current" />
              Featured
            </button>
            {allTags.map((tag) => (
              <button key={tag} onClick={() => handleTagClick(tag)} className={tagClassName(selectedTag === tag)}>
                #{tag}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => handleScroll(180)} className={`${arrowClassName} right-0`} aria-label="Scroll tags right">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </PageHead>

      <div className="wide-container">
        <div className="on-panel-edge flex flex-col gap-6">
          {filteredBlogs.length > 0 ? (
            <>
              {showHero && heroBlog && <FeaturedHero blog={heroBlog} readLabel={localeDesc.readFeatured} />}
              <BlogCardList contents={pagedBlogs} />
              {totalPages > 1 && (
                <div className="mb-4 mt-2 text-center">
                  <h4 className="mb-3 text-sm text-muted">
                    Page {currentPage} of {totalPages}
                  </h4>
                  {renderPagination()}
                </div>
              )}
            </>
          ) : (
            <div className="mx-auto w-full max-w-md rounded-[28px] bg-card p-8 text-center shadow-soft">
              <p className="font-medium">{localeDesc.emptyState}</p>
              <button
                onClick={handleResetAll}
                className="mt-5 cursor-pointer rounded-2xl bg-base-content px-5 py-2.5 text-sm font-semibold text-base-100"
              >
                {localeDesc.clearSearch}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogSearchFilter;
