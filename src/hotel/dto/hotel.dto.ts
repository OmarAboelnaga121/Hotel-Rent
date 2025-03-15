import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsInt, IsDate, IsArray, IsOptional } from 'class-validator';
import { ReviewDto } from './review.dto';
import { RoomDto } from './room.dto';

@InputType()
export class HotelDto {
  @Field(() => Int)
  @IsInt()
  id: number;

  @Field()
  @IsInt()
  authorId: number;

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

  @Field(() => [RoomDto], { nullable: true })
  @IsArray()
  @IsOptional()
  rooms?: RoomDto[];

  @Field(() => [ReviewDto], { nullable: true })
  @IsArray()
  @IsOptional()
  reviews?: ReviewDto[];

  @Field()
  @IsDate()
  createdAt: Date;

  @Field()
  @IsDate()
  updatedAt: Date;
}