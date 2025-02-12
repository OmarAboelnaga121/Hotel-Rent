import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginDto {
    @Field(() => String, { description: 'Email' })
      @IsString()
      @IsNotEmpty()
      email: string;
    
      @Field(() => String, { description: "User's Password" })
      @IsString()
      @IsNotEmpty()
      password: string;
}