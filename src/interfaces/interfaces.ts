export interface Image {
  data: Array<{
    id: number;
    attributes: {
      formats: {
        thumbnail: {
          url: string;
          width: string;
          height: string;
        };
        small: {
          url: string;
          width: string;
          height: string;
        };
        medium: {
          url: string;
          width: string;
          height: string;
        };
        large: {
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
    singleName: string;
    slug: string;
    locale: string;
  };
}

export interface Product {
  id: number;
  attributes: {
    uuid: string;
    localizations: {
      data: Product[];
    };
    title: string;
    description: string;
    price: number;
    locale: string;
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

export interface ProductPropsImageGallery {
  product: Product;
}

export interface ZoomPosition {
  x: number;
  y: number;
}
