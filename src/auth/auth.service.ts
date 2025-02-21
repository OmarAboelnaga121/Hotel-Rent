import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { UserRole } from '@prisma/client';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService
  ) {}

  // TODO: Register User
  async registration(userDto: RegisterDto): Promise<Auth> {
    // Check If User Email is In Db Or Not
    const checkUser = await this.prismaService.user.findUnique({
      where: {
        email: userDto.email
      }
    });

    if (checkUser) {
      throw new BadRequestException('User with this email already exists');
    }

    let imageUrl = 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png';

    // Hash The Password
    const hashPassword = await argon.hash(userDto.password);

    // Create User
    const newUser = await this.prismaService.user.create({
      data: {
        email: userDto.email,
        firstName: userDto.firstName,
        lastName: userDto.lastName,
        phoneNumber: userDto.phoneNumber,
        image: imageUrl,
        password: hashPassword,
        role: userDto.role as UserRole
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        image: true,
        role: true
      }
    });

    // Return User Data With access token
    return {
      ...newUser,
      access_token: this.jwtService.sign({ sub: newUser.id, email: newUser.email })
    };
  }

  // TODO: Login User
  async login(loginData: LoginDto): Promise<Auth> {
    // Check Email
    const user = await this.prismaService.user.findUnique({
      where: { email: loginData.email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        image: true,
        role: true,
        password: true
      }
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check Password
    const passwordMatches = await argon.verify(user.password, loginData.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Create Token
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    // Return User with Token
    const { password, ...result } = user;
    return {
      ...result,
      access_token: token,
    };
  }

  // TODO: Make The JWT Token
  async token(payload: any) {
    return this.jwtService.sign(payload);
  }



}
