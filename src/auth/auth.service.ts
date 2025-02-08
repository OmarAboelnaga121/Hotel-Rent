import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { CommonService } from 'src/common/common.service';
import { UserRole } from '@prisma/client';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private primsaService : PrismaService, private commonService : CommonService) {}

  async registration(userDto: RegisterDto, file: Express.Multer.File) {
    const checkUser = await this.primsaService.user.findUnique({
      where: {
        email: userDto.email
      }
    })

    if(checkUser) {
      throw new BadRequestException('User with this email already exists')
    }

    const uploadResult = await this.commonService.uploadFile(file);
    userDto.image = uploadResult.url;

    const hashPassword = await argon.hash(userDto.password);

    const newUser = await this.primsaService.user.create({
      data: {
        email: userDto.email,
        firstName: userDto.first_name,
        lastName: userDto.last_name,
        phoneNumber: userDto.phone_number,
        image: userDto.image,
        password: hashPassword,
        role: userDto.role as UserRole
      },
      select:{
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        image: true,
        role: true
      }
    })
    
    return newUser;
  }
}
