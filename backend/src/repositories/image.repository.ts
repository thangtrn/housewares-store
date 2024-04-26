import Image from '~/models/image.model';

class ImageRepository {
   async createImage({ imageUrl, publicId }) {
      const image = await Image.create({ imageUrl, publicId });
      return image;
   }
}

export default ImageRepository;
