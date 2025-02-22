import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class UserDto {
  @Field(() => Number, { description: 'Id Of User' })
  id: number;

  @Field(() => String, { description: 'First Name' })
  firstName: string;
  
  @Field(() => String, { description: 'Last Name' })
  lastName: string;

  @Field(() => String, { description: 'Phone Number' })
  phoneNumber: string;

  @Field(() => String, { description: 'Email' })
  email: string;

  // @Field(() => String, { description: "User's Password" })
  // hashedPassword: string;

  @Field(() => String, { description: "Role's User" })
  role: string;

  @Field(() => [String], { description: "Array of user's Booking" })
  bookings?: string[];

  @Field(() => String, { description: "Array of user's Booking" })
  image?: string;

  @Field(() => Date, { description: "The date of the created user" })
  createdAt?: Date;

  @Field(() => Date, { description: 'The last date when user updated user' })
  updatedAt?: Date;
}
