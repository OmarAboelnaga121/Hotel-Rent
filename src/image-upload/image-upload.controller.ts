import { Controller, Put, UseInterceptors, UploadedFile, BadRequestException, Param } from '@nestjs/common';
import { ImageUploadService } from './image-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('image-upload')
export class ImageUploadController {
  constructor(private readonly imageUploadService: ImageUploadService) {}

  @Put('upload/:userId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Param('userId') userId: string) {
    const userIdNumber = parseInt(userId, 10);
    if (isNaN(userIdNumber)) {
      throw new BadRequestException('Invalid userId');
    }

    if (!file) {
      throw new BadRequestException('File is required');
    }

    return this.imageUploadService.uploadFile(file, userIdNumber);
  }
}
