import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType()
export class ReviewDto {
  @Field(() => Int, { description: 'Id of the Review' })
  @IsInt()
  id: number;

  @Field(() => String, { description: 'Comment of the Review' })
  @IsString()
  comment: string;

  @Field(() => Int, { description: 'Rating of the Review' })
  @IsInt()
  rating: number;
}