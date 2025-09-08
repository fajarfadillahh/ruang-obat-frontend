export type DetailsPurchaceResponse = {
  order_id: string;
  invoice_number: string;
  status: string;
  total_amount: number;
  final_amount: number;
  paid_amount: number;
  discount_amount: number;
  discount_code: any;
  created_at: string;
  items: {
    product_id: string;
    product_name: string;
    product_price: number;
    product_type: string;
  }[];
  transactions: {
    transaction_id: string;
    status: string;
    payment_method: string;
    normalized_method: string;
    paid_amount: number;
    paid_at: string;
    expired_at: any;
    created_at: string;
  }[];
};
