export interface Image {
  data: Array<{
    id: number;
    attributes: {
      formats: {
        small: {
          url: string;
          width: string;
          height: string;
        };
      };
      url: string;
    };
  }>;
}

export interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
  };
}

export interface Product {
  id: number;
  attributes: {
    title: string;
    description: string;
    price: number;
    images: Image;
    categories: {
      data: Category[];
    };
    createdAt: string;
    amount: number;
  };
}

export interface Filter {
  category: string | null;
  rangeValues: number[];
}

export type GroupedItems = Record<number, Product[]>;
