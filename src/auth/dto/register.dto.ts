import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, IsStrongPassword } from 'class-validator';

@InputType()
export class RegisterDto {
  @Field(() => String, { description: 'First Name' })
  @IsString()
  firstName: string;
  
  @Field(() => String, { description: 'Last Name' })
  @IsString()
  lastName: string;

  @Field(() => String, { description: 'Phone Number' })
  @IsString()
  phoneNumber: string;

  @Field(() => String, { description: 'Email' })
  @IsString()
  @IsEmail()
  email: string;

  @Field(() => String, { description: "User's Password" })
  @IsString()
  @IsStrongPassword()
  password: string;

  @Field(() => String, { description: "Role's User" })
  @IsString()
  role: string;

  // @Field(() => String, { description: "Array of user's Booking" })
  // @IsString()
  // @IsOptional()
  // bookings?: string;

  // @Field(() => String, { description: "Array of user's Booking" })
  // @IsString()
  // @IsOptional()
  // image?: string;

  // @Field(() => Date, { description: "The date of the created user" })
  // @IsOptional()
  // createdAt?: Date;

  // @Field(() => Date, { description: 'The last date when user updated user' })
  // @IsOptional()
  // updatedAt?: Date;
}
