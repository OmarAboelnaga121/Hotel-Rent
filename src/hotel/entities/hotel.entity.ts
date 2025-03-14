import { ObjectType, Field, Int } from '@nestjs/graphql';
import { RoomDto } from '../dto/room.dto';
import { ReviewDto } from '../dto/review.dto';

@ObjectType()
export class Hotel {
  @Field(() => Int, { description: 'Id of the Hotel' })
  id: number;

  @Field(() => String, { description: 'Name of the Hotel' })
  name: string;

  @Field(() => String, { description: 'Description of the Hotel' })
  description: string;

  @Field(() => String, { description: 'Location of the Hotel' })
  location: string;

  @Field(() => String, { description: 'Address of the Hotel' })
  address: string;

  @Field(() => String, { description: 'Phone number of the Hotel' })
  phone: string;

  @Field(() => String, { description: 'Amenities provided by the Hotel' })
  amenities: string;

  @Field(() => String, { description: 'Images of the Hotel' })
  images: string;

  @Field(() => [RoomDto], { description: 'Rooms available in the Hotel' })
  rooms: RoomDto[];

  @Field(() => [ReviewDto], { description: 'Reviews of the Hotel' })
  reviews: ReviewDto[];

  @Field(() => Date, { description: 'The date when the Hotel was created' })
  createdAt: Date;

  @Field(() => Date, { description: 'The date when the Hotel was last updated' })
  updatedAt: Date;
}
