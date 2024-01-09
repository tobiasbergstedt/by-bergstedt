import { type RefObject, type MutableRefObject } from 'react';

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

export interface Material {
  attributes: {
    name: string;
    slug: string;
  };
}

export interface Texture {
  data: SingleImage;
}

export interface CuttingBoardProps {
  width: number | string | null;
  depth: number | string | null;
  height: number | string | null;
  edgeStyle: string | null;
  edgeSize: number | string | null;
  handleIndent: number;
  pattern: string;
  materials: Material[];
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  honeypot: string;
}

export interface ContactRefsProps {
  name: MutableRefObject<null>;
  email: MutableRefObject<null>;
  message: MutableRefObject<null>;
  honeypot: MutableRefObject<null>;
}

export interface ShoppingCartItem {
  id: string;
  name: {
    sv: string;
    en: string;
  };
  amount: number;
  image: string;
  price: number;
}

export interface InputProps {
  inputRef: RefObject<HTMLInputElement>;
  inputValue: number | string | null;
  propertyName: string;
  placeholder: string;
}

export interface OrderDetailsRefs {
  surname: MutableRefObject<null>;
  lastName: MutableRefObject<null>;
  companyName: MutableRefObject<null>;
  streetName: MutableRefObject<null>;
  areaCode: MutableRefObject<null>;
  cityName: MutableRefObject<null>;
  phoneNumber: MutableRefObject<null>;
  email: MutableRefObject<null>;
  message: MutableRefObject<null>;
}

export interface OrderDetails {
  surname: string;
  lastName: string;
  companyName: string;
  streetName: string;
  areaCode: string;
  cityName: string;
  phoneNumber: string;
  email: string;
  message: string;
}
