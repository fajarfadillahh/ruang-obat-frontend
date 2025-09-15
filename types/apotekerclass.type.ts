export type ApotekerClassResponse = {
  categories: {
    category_id: string;
    name: string;
    slug: string;
    img_url: string;
  }[];
  universities: {
    univ_id: string;
    slug: string;
    title: string;
    thumbnail_url: string;
    total_tests: number;
  }[];
  subscriptions: {
    package_id: string;
    name: string;
    price: number;
    discount_amount: number;
    duration: number;
    type: string;
    link_order: string;
    benefits: {
      benefit_id: string;
      description: string;
    }[];
  }[];
  is_login: boolean;
  has_subscription: boolean;
};
