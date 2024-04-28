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
