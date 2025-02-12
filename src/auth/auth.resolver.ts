import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  hello() {
    return 'Hello World!';
  }

  // TODO: Register User End Point
  @Mutation(() => Auth)
  async register(
    @Args('userDto') userDto: RegisterDto,
  ) : Promise<Auth>{
    return this.authService.registration(userDto);
  }

  // TODO: Login User End Point
  @Mutation(() => Auth)
  async login(
    @Args('loginDto') userDto: LoginDto,
  ){
    return this.authService.login(userDto);
  }
}
