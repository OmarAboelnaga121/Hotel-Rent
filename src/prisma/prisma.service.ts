import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient{
    constructor(private config : ConfigService){
        super({
            datasources:{
                db:{
                    url: process.env.DATABASE_URL
                }
        }})
    }

    // TODO: Clean The DB
    async cleanDb() {
        await this.$transaction([
            this.review.deleteMany(),
            this.payment.deleteMany(),
            this.booking.deleteMany(),
            this.room.deleteMany(),
            this.hotel.deleteMany(),
            this.user.deleteMany(),
            this.notification.deleteMany(),
        ]);
    }
}
