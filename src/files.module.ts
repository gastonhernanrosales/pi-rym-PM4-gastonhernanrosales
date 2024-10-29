import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryConfig } from './cloudinary.config';

import { FilesController } from './files.controller';
@Module({
  imports: [ConfigModule],
  providers: [CloudinaryService, CloudinaryConfig],
  controllers: [FilesController],
})
export class FilesModule {}
