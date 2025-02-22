import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
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

  @Field(() => String, { description: "User's Role" })
  role: string;

  @Field(() => [String], { description: "User's Bookings", nullable: true })
  bookings?: string[];

  @Field(() => String, { description: "User's Profile Image", nullable: true })
  image?: string;

  @Field(() => Date, { description: "The date when the user was created" })
  createdAt: Date;

  @Field(() => Date, { description: "The date when the user was last updated" })
  updatedAt: Date;
}
