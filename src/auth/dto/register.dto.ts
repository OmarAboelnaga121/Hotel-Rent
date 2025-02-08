import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, IsStrongPassword } from 'class-validator';

@InputType()
export class RegisterDto {
  @Field(() => String, { description: 'First Name' })
  @IsString()
  first_name: string;
  
  @Field(() => String, { description: 'Last Name' })
  @IsString()
  last_name: string;

  @Field(() => String, { description: 'Phone Number' })
  @IsString()
  phone_number: string;

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

  @Field(() => String, { description: "Array of user's Booking" })
  @IsString()
  @IsOptional()
  bookings?: string;

  @Field(() => String, { description: "Array of user's Booking" })
  @IsString()
  @IsOptional()
  image?: string;

  @Field(() => Date, { description: "The date of the created user" })
  createdAt: Date;

  @Field(() => Date, { description: 'The last date when user updated user' })
  updatedAt: Date;
}
