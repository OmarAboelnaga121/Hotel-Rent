import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { RegisterDto } from './dto/register.dto';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  hello() {
    return 'Hello World!';
  }

  @Mutation(() => Auth)
  async createAuth(
    @Args('userDto') userDto: RegisterDto,
    // !@Args({ name: 'file', type: () => GraphQLUpload, nullable: true }) file: FileUpload,
  ) {
    return this.authService.registration(userDto);
  }
}
