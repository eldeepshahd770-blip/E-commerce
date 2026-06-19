export interface Order {
  _id: string;
  id: number;

  shippingAddress: ShippingAddress;
  user: User;

  cartItems: CartItem[];

  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;

  paymentMethodType: 'cash' | 'card';

  isPaid: boolean;
  isDelivered: boolean;

  paidAt?: string;

  createdAt: string;
  updatedAt: string;

  __v: number;
}
export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: Product;
}
export interface Product {
  _id: string;
  id: string;

  title: string;
  imageCover: string;

  ratingsAverage: number;
  ratingsQuantity: number;

  category: Category;
  brand: Brand;

  subcategory: SubCategory[];
}
export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}
