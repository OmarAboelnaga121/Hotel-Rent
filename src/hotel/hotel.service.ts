import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from 'src/user/dto/user.dto';
import { HotelDto } from './dto/hotel.dto';
import { createHotelDto } from './dto/createHotel.dto';

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
    async createHotel(user : UserDto, hotel : createHotelDto){
      // Check User Exist
      const checkUser = await this.primsaService.user.findUnique({
        where:{
          id : user.id
        }
      })

      if(!checkUser){
        throw new BadRequestException('User not found')
      }

      const checkHotel = await this.primsaService.hotel.findFirst({
        where:{authorId: user.id}
      })

      if(checkHotel){
        throw new BadRequestException('Hotel already exist for this user')
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
          images : '',
          authorId : user.id,
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

