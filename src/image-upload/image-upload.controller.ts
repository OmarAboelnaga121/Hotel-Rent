import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImageUploadService } from './image-upload.service';

@Controller('image-upload')
export class ImageUploadController {
  constructor(private readonly imageUploadService: ImageUploadService) {}

  
}
