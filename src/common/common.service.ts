import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary/cloudinary-response';
const streamifier = require('streamifier');


@Injectable()
export class CommonService {
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          if (result) {
            resolve(result as CloudinaryResponse);
          } else {
            reject(new Error('Upload failed, result is undefined'));
          }
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
