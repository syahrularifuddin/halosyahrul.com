import { getBlogList } from '@/modules/Content/services/content-parser';
import { I18nLocales } from '@/packages/libs/I18n/interface';

import withHomeLocales from '../Home.locales';
import PostCard from './PostCard';
import SectionHead from './SectionHead';

const POSTS_ON_HOME = 4;

interface Props {
  lang: I18nLocales;
}

/** The newest posts by date, straight from the content directory */
async function LatestWriting({ lang }: Props) {
  const content = withHomeLocales(lang);
  const { contents } = await getBlogList(lang, { limit: POSTS_ON_HOME });

  return (
    <section>
      <SectionHead
        title={content.writingTitle}
        description={content.writingDesc}
        linkLabel={content.allPosts}
        linkHref="/blog"
      />
      {/* one card, one row per post */}
      <div className="divide-y divide-line overflow-hidden rounded-[28px] bg-card shadow-soft">
        {contents.map((post) => (
          <PostCard key={post.slugOriginal} post={post} />
        ))}
      </div>
    </section>
  );
}

export default LatestWriting;
