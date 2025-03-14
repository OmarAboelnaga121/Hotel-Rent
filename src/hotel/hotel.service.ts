import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from 'src/user/dto/user.dto';
import { HotelDto } from './dto/hotel.dto';

@Injectable()
export class HotelService {
  constructor(private primsaService : PrismaService){}

  // TODO: Get User Hotel Data
  async getAllHotels(userId : number) {
    const userHotel = this.primsaService.hotel.findFirst({
      where : {
        authorId : userId
      }
    })

    if(!userHotel){
      throw new BadRequestException('No hotel found for this user')
    }

    return userHotel
    }

    // TODO: Create Hotel
    async createHotel(user : UserDto, hotel : HotelDto){
      // Check User Exist
      const checkUser = await this.primsaService.user.findUnique({
        where:{
          id : user.id
        }
      })

      if(!checkUser){
        throw new BadRequestException('User not found')
      }

      // Check Hotel Exist
      const checkHotel = await this.primsaService.hotel.findUnique({
        where:{
          id : hotel.id
        }
      })

      if(!checkHotel){
        throw new BadRequestException('Hotel not found')
      }

      // Check User's Hotel
      if(checkHotel.authorId === user.id){
        throw new BadRequestException('User already have a hotel')
      }

      // Create Hotel
      const newHotel = await this.primsaService.hotel.create({
        data:{
          name : hotel.name,
          description : hotel.description,
          location : hotel.location,
          address : hotel.address,
          phone : hotel.phone,
          amenities : hotel.amenities,
          images : hotel.images,
          authorId : user.id
        }
      })

      // Change User Role
      await this.primsaService.user.update({
        where:{
          id : user.id
        },
        data:{
          role : 'SELLER'
        }
      })

      // Return Hotel
      return newHotel
    }
  }

