import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ImageUploadModule } from './image-upload/image-upload.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ImageUploadModule,
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env.development',
    }),
    UserModule,

  ],
  controllers: [],
  providers: [],
})

export class AppModule {}