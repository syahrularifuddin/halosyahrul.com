import cn from '@/designs/utils/cn';
import BlogCard from '@/modules/Blog/components/Card';
import { ContentMeta } from '@/modules/Content/services/content-parser';

interface Props {
  contents: ContentMeta[]
  className?: string;
  isFeatured?: boolean;
}

function BlogCardList({ contents, className, isFeatured }: Props) {
  return (
    <section
      className={cn([
        'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3',
        className
      ])}
    >
      {contents.map((_blog) => (
        <BlogCard
          key={_blog.slugOriginal}
          blog={_blog}
          isFeatured={_blog.isFeatured || isFeatured}
        />
      ))}
    </section>
  );
}

export default BlogCardList;
