import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ReviewDto {
  @Field(() => Int)
  id: number;

  @Field()
  comment: string;

  @Field(() => Int)
  rating: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}