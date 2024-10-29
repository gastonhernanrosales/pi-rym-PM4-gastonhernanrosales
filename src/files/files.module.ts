import { Module } from '@nestjs/common';
import { FilesController } from 'src/files.controller';
import { FilesService } from './files.service';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
