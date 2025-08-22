export type Article = {
  article_id: string;
  title: string;
  slug: string;
  img_url: string;
  description: string;
  created_at: string;
  created_by: string;
  views: number;
  topic: {
    name: string;
    first_letter: string;
  };
};

export type ArticleDetails = {
  article_id: string;
  title: string;
  slug: string;
  img_url: string;
  content: string;
  description: string;
  created_at: string;
  created_by: string;
  topic: string;
  views: number;
  ads: ArticleAd[];
};

export type ArticleAd = {
  ad_id: string;
  type: string;
  link: string;
  img_url: string;
  title: string;
};
