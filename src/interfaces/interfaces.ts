export interface Image {
  data: SingleImage[];
}

export interface SingleImage {
  id: number;
  attributes: {
    formats: {
      thumbnail: {
        url: string;
        width: number;
        height: number;
      };
      small: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      large: {
        url: string;
        width: number;
        height: number;
      };
    };
    url: string;
  };
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

export interface AboutData {
  id: number;
  attributes: {
    title: string;
    aboutText: string;
    locale: string;
    profileImage: {
      data: SingleImage;
    };
    testimonials: Testimonials;
    valuesText: string;
    valuesTitle: string;
  };
}

export interface Testimonial {
  id: number;
  attributes: {
    description: string;
    image: {
      data: SingleImage;
    };
    locale: string;
    name: string;
    testimonial: string;
  };
}

export interface Testimonials {
  data: Testimonial[];
}
