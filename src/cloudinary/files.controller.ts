import { Controller, Param, Post, UploadedFile, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { ProductsService } from '../products/products.service';

@Controller('files')
export class FilesController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly productsService: ProductsService,
  ) {}

  @Post('uploadImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('id') productId: number,
    @UploadedFile() file: Express.Multer.File
  ) {
    try {
      const uploadResult = await this.cloudinaryService.uploadImage(file);

      // Si la carga es exitosa, actualizamos el producto
      await this.productsService.updateProductImage(productId, uploadResult.secure_url);

      return {
        message: 'Imagen subida correctamente',
        imageUrl: uploadResult.secure_url,
      };
    } catch (error) {
      throw new HttpException('Error al subir la imagen', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
