import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class RoomDto {
  @Field()
  name: string;

  @Field()
  capacity: number;
}