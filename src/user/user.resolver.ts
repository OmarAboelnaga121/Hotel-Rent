import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { UserProfile } from 'src/auth/decoraters/user.decorator';
import { UserDto } from './dto/user.dto';
import { GqlAuthGuard } from 'src/auth/user.gurd';
import { UpdateUserDto } from './dto/updateUser.dto';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // Get User Profile Data
  @Query(() => User)
  getUserProfile(@UserProfile() profile: UserDto) {
    return profile;
  }

  // Update User Data
  @Mutation(() => User)
  updateUserProfile(
    @UserProfile() profile: UserDto,
    @Args('updateUserInput', { type: () => UpdateUserDto }) updateUserDto: UpdateUserDto
  ) {
    return this.userService.updateUserProfile(profile.id, updateUserDto);
  }
}
