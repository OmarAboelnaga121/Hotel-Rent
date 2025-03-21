import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType()
export class RoomDto {
  @Field(() => Int, { description: 'Id of the Room' })
  @IsInt()
  roomId: number;

  @Field(() => String, { description: 'Name of the Room' })
  @IsString()
  name: string;

  @Field(() => String, { description: 'Description of the Room' })
  @IsString()
  description: string;

  @Field(() => Int, { description: 'Capacity of the Room' })
  @IsInt()
  capacity: number;
}