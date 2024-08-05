export interface IProduct {
  productId: string | number | undefined;
  _id?: number | string;
  name: string;
  feature_image?: string[];
  category?: string;
  quantity?: number;
  regular_price: number;
  description: string;
  discount: number;
  gallery?: string[];
  featured: boolean;
  quality: number;
  countIn_stock: number;
}
