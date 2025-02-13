import { BadRequestException, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary/cloudinary-response';
import * as streamifier from 'streamifier';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ImageUploadService {
  constructor(private readonly prismaService: PrismaService) {}

  async uploadFile(file: Express.Multer.File, userId: number): Promise<CloudinaryResponse> {
    const findUser = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
  
    if (!findUser) {
      throw new BadRequestException('User not found');
    }
  
    console.log('Request time:', new Date().toISOString());
  
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        async (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(new BadRequestException('Cloudinary upload failed'));
            return;
          }
  
          if (!result) {
            reject(new BadRequestException('Upload failed, no result from Cloudinary'));
            return;
          }
  
          try {
            await this.prismaService.user.update({
              where: { id: userId },
              data: { image: result.secure_url },
            });
  
            resolve(result);
          } catch (dbError) {
            console.error('Database update error:', dbError);
            reject(new BadRequestException('Database update failed'));
          }
        }
      );
  
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
  
}
