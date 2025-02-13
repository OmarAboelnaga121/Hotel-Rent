import { Module } from '@nestjs/common';
import { ImageUploadService } from './image-upload.service';
import { ImageUploadController } from './image-upload.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CloudinaryProvider } from './cloudinary/cloudinary.provider';
@Module({
  imports: [PrismaModule],
  controllers: [ImageUploadController],
  providers: [CloudinaryProvider, ImageUploadService],
  exports: [CloudinaryProvider, ImageUploadService],
})
export class ImageUploadModule {}
