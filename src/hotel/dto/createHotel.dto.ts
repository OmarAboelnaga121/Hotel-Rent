import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsInt, IsDate, IsArray, IsOptional } from 'class-validator';

@InputType()
export class createHotelDto {
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
}