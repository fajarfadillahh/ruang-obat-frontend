import { Article } from "@/types/article.type";
import { formatDateWithoutTime } from "@/utils/formatDate";
import { CalendarDots } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/router";

interface CardArticleProps {
  article: Article;
}

export default function CardArticle({ article }: CardArticleProps) {
  const router = useRouter();

  return (
    <article
      onClick={() =>
        router.push(`/artikel/${encodeURIComponent(article.slug)}`)
      }
      className="group relative isolate grid overflow-hidden rounded-xl border-2 border-purple/10 hover:cursor-pointer hover:border-purple hover:bg-purple/10"
    >
      <div className="aspect-video overflow-hidden">
        <Image
          src={article.img_url}
          alt={article.title}
          width={500}
          height={500}
          className="size-full object-cover object-center transition-all group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="grid gap-2 rounded-b-xl p-4">
        <p className="line-clamp-1 text-xs font-semibold text-purple">
          {article.topic.name}
        </p>

        <div>
          <h3 className="mb-0.5 line-clamp-2 text-lg font-extrabold text-black">
            {article.title}
          </h3>

          <p
            dangerouslySetInnerHTML={{
              __html: article.description,
            }}
            className="line-clamp-2 text-sm font-medium leading-[170%] text-gray"
          />
        </div>

        <div className="mt-4 inline-flex items-center gap-1 text-gray">
          <CalendarDots weight="duotone" size={16} />

          <p className="text-xs font-medium">
            {formatDateWithoutTime(article.created_at)}
          </p>
        </div>
      </div>
    </article>
  );
}
