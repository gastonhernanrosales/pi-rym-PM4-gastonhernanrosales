import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class FilesService {
  async uploadImage(productId: string, file: Express.Multer.File): Promise<string> {
    // Aquí va la lógica para cargar la imagen a Cloudinary
    const result = await cloudinary.uploader.upload(file.path);  // Asegúrate de que la ruta sea correcta
    // Guardar la URL de la imagen en la base de datos
    // Aquí podrías llamar a un método del ProductsService para actualizar el producto con la nueva URL
    return result.secure_url; // Retorna la URL de la imagen
  }
}
