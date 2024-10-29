import { Controller, Post, Param, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';  // Asegúrate de que la ruta sea correcta
import { FilesService } from './files.service';  // Importa el servicio que manejará la lógica de carga
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('uploadImage')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post(':productId')  // Endpoint para subir imagen
  @UseGuards(AuthGuard)  // Protegiendo la ruta
  @UseInterceptors(FileInterceptor('file'))  // Asegúrate de que el archivo esté en el cuerpo de la solicitud
  async uploadImage(@Param('productId') productId: string, @UploadedFile() file: Express.Multer.File) {
    return this.filesService.uploadImage(productId, file);
  }
}
