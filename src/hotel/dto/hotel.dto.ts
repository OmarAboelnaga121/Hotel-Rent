import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsString, IsInt, IsDate, IsArray } from 'class-validator';
import { Review, Room } from '@prisma/client';
import { ReviewDto } from './review.dto';
import { RoomDto } from './room.dto';


@ObjectType()
export class HotelDto {
  @Field(() => Int)
  @IsInt()
  id: number;

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  description: string;

  @Field()
  @IsString()
  location: string;

  @Field()
  @IsString()
  address: string;

  @Field()
  @IsString()
  phone: string;

  @Field()
  @IsString()
  amenities: string;

  @Field()
  @IsString()
  images: string;

  @Field(() => [RoomDto])
  @IsArray()
  rooms: Room[];

  @Field(() => [ReviewDto])
  @IsArray()
  reviews: Review[];

  @Field()
  @IsDate()
  createdAt: Date;

  @Field()
  @IsDate()
  updatedAt: Date;
}