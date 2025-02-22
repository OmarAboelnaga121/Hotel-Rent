import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
    constructor(
      private prismaService: PrismaService,
    ) {}
    
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
}
