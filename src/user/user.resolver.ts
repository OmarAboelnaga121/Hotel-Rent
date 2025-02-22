import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { UserProfile } from 'src/auth/decoraters/user.decorator';
import { UserDto } from './dto/user.dto';
import { GqlAuthGuard } from 'src/auth/user.gurd';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  getUserProfile(@UserProfile() profile: UserDto
) {
    return profile;
  }
}
