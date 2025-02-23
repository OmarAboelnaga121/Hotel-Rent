import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(
      private prismaService: PrismaService,
    ) {}
    
    // TODO: Update Users's Data Using The Token 
    async updateUserProfile(userId: number, updateUserDto: UpdateUserDto) {
        // Check if user exists and matches the token user ID
        const existingUser = await this.prismaService.user.findUnique({
            where: { id: userId }
        });

        if (!existingUser) {
            throw new NotFoundException(`User not found`);
        }

        // If email is being updated, check if it's not already taken
        if (updateUserDto.email) {
            const emailExists = await this.prismaService.user.findFirst({
                where: {
                    email: updateUserDto.email,
                    id: { not: userId }
                }
            });

            if (emailExists) {
                throw new UnauthorizedException('Email already exists');
            }
        }

        // Update user data
        const updateData = Object.fromEntries(
            Object.entries(updateUserDto).filter(([_, value]) => value !== undefined)
        );

        const updatedUser = await this.prismaService.user.update({
            where: { id: userId },
            data: updateData,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phoneNumber: true,
                image: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        });

        return updatedUser;
    }

    // TODO: Get All Users For Admins And Customer Support
    async getAllUsers(user : UserDto) {
        if(user.role !== UserRole.ADMIN && user.role !== UserRole.CUSTOMERSUPPORT) {
            throw new BadRequestException('Only admins and customer support can get all users');
        }

        const users = await this.prismaService.user.findMany({
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phoneNumber: true,
                image: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        })

        console.log(users)

        return users;
    }
}
