import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(
      private prismaService: PrismaService,
    ) {}

  findById(id: number) {
    const user = this.prismaService.user.findUnique({
      where: { id: id }
    })

    if (!user) {
      throw new UnauthorizedException('User Not Found');
    }

    return user;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }
}
