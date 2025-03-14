import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HotelService } from './hotel.service';
import { Hotel } from './entities/hotel.entity';
import { User } from 'src/user/entities/user.entity';
import { UserProfile } from 'src/auth/decoraters/user.decorator';
import { UserDto } from 'src/user/dto/user.dto';
import { GqlAuthGuard } from 'src/auth/user.gurd';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { HotelDto } from './dto/hotel.dto';


@UseGuards(GqlAuthGuard)
@Resolver(() => Hotel)
export class HotelResolver {
  constructor(private readonly hotelService: HotelService) {}

  // TODO: Get User Hotel Data
  @Query(() => [Hotel])
  async getUserHotel(@UserProfile() profile: UserDto){
    const hotels = await this.hotelService.getAllHotels(profile.id);
    if (!hotels) {
      throw new BadRequestException('No hotels found for the user');
    }
    return hotels;
  }

  // @Mutation(() => Hotel)
  // async createHotel(
  //   @UserProfile() user: UserDto,
  //   @Args('hotelInput') hotel: HotelDto
  // ): Promise<Hotel> {
  //   return this.hotelService.createHotel(user, hotel);
  // }
}
