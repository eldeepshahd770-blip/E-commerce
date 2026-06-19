export interface Cartdetails {
  _id: string;
  cartOwner: string;
  products: ProductElement[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}
export interface ProductElement {
  count: number;
  _id: string;
  product: Productproduct;
  price: number;
}
export interface Productproduct {
  subcategory: Subcategory[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
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
