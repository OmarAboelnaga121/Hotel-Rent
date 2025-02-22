import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsEmail, IsString } from 'class-validator';

@InputType()
export class UpdateUserDto {
  @Field(() => String, { description: 'First Name', nullable: true })
  @IsOptional()
  @IsString()
  firstName?: string;
  
  @Field(() => String, { description: 'Last Name', nullable: true })
  @IsOptional()
  @IsString()
  lastName?: string;

  @Field(() => String, { description: 'Phone Number', nullable: true })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @Field(() => String, { description: 'Email', nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;
}
