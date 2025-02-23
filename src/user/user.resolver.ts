import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UseGuards, UnauthorizedException } from '@nestjs/common';
import { UserProfile } from '../auth/decoraters/user.decorator';
import { UserDto } from './dto/user.dto';
import { GqlAuthGuard } from '../auth/user.gurd';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserRole } from '@prisma/client';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // TODO: Get User Profile Data
  @Query(() => User)
  getUserProfile(@UserProfile() profile: UserDto) {
    return profile;
  }

  // TODO: Update User Data
  @Mutation(() => User)
  updateUserProfile(
    @UserProfile() profile: UserDto,
    @Args('updateUserInput', { type: () => UpdateUserDto }) updateUserDto: UpdateUserDto
  ) {
    return this.userService.updateUserProfile(profile.id, updateUserDto);
  }

  // Get all users (Admin only)
  @Query(() => [User])
  getUsersForAdmins(@UserProfile() profile: UserDto) {
    if (profile.role !== UserRole.ADMIN) {
      throw new UnauthorizedException('Only admins can access this resource');
    }
    return this.userService.getAllUsers(profile);
  }
}
