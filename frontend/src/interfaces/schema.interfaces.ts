export interface IImage {
   _id: string;
   imageUrl: string;
   publicId?: string;
   default?: boolean;
   createdAt: string;
   updatedAt: string;
}

export interface ICategory {
   _id: string;
   name: string;
   image?: IImage;
   createdAt: string;
   updatedAt: string;
}

export interface IProduct {
   _id: string;
   name: string;
   slug: string;
   category: ICategory;
   images: IImage[];
   price: number;
   detail?: {
      size: String;
      color: String;
      brand: String;
      origin: String;
   };
   quantity: number;
   createdAt: string;
   updatedAt: string;
}
