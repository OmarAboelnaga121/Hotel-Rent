import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { CommonService } from 'src/common/common.service';
import { UserRole } from '@prisma/client';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private primsaService : PrismaService, private commonService : CommonService) {}

  async registration(userDto: RegisterDto) {
    const checkUser = await this.primsaService.user.findUnique({
      where: {
        email: userDto.email
      }
    })

    if(checkUser) {
      throw new BadRequestException('User with this email already exists')
    }

    let imageUrl = 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png';
    // if (file) {
    //   const uploadResult = await this.commonService.uploadFile(file);
    //   imageUrl = uploadResult.url;
    // }

    const hashPassword = await argon.hash(userDto.password);

    const newUser = await this.primsaService.user.create({
      data: {
        email: userDto.email,
        firstName: userDto.firstName,
        lastName: userDto.lastName,
        phoneNumber: userDto.phoneNumber,
        image: imageUrl,
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
