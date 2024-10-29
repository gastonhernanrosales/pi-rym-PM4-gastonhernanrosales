import { Module } from '@nestjs/common';
import { CloudinaryConfig } from 'src/cloudinary.config';
import { CloudinaryProvider } from 'src/config/cloudinary.config';
@Module({
  providers: [CloudinaryProvider],
  exports: [CloudinaryProvider],
})
export class CloudinaryModule {}
