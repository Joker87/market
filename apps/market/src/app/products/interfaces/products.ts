export interface Type {
  uid: string;
  name: string;
}

export interface Country {
  name: string;
  codeA2: string;
}

export interface Product {
  uid: string;
  title: string;
  description: string;
  pictureName: string;
  price: number;
  rating: number;
  type: Type;
  country: Country;
  year: string;
}

export interface ProductFilters {
  type: string;
  country: string;
}
