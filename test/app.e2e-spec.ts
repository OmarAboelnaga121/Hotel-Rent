// The tests includes 
// 1-check the funcinalty of the 
// 2-check the if condtions of the function

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as pactum from 'pactum';
import { PrismaService } from './../src/prisma/prisma.service';
import * as path from 'path';
import * as fs from 'fs';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let userId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
    }));
    await app.init();
    await app.listen(3453);

    pactum.request.setBaseUrl(`http://localhost:3453`);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
  });

  afterAll(async () => {
    await app.close();
  });

  // TODO: Test Of the auth module
  describe('Auth Module', () => {
    // Test User Register with status 200
    it('should register a user with status 200', async () => {
      const response = await pactum.spec()
        .post('/graphql')
        .withJson({
          query: `
            mutation Register{
              register(userDto: {
                firstName: "Omar"
                lastName: "WOW"
                phoneNumber: "01205812263"
                email: "omaraboelnaga121@gmail.com"
                password: "StrongP@ssword1"
                role: "ADMIN"
              }) {
                id
                firstName
              }
            }
          `
        })
        .expectStatus(200)
        .returns('data.register');

      userId = response.id;
      console.log(userId);
    });

    // Test User Register with status 400
    it("shouldn't register user due to it is already on db", async () => {
      await pactum.spec()
        .post('/graphql')
        .withJson({
          query: `
            mutation Register{
              register(userDto: {
                firstName: "Omar"
                lastName: "WOW"
                phoneNumber: "01205812263"
                email: "omaraboelnaga121@gmail.com"
                password: "StrongP@ssword1"
                role: "ADMIN"
              }) {
                firstName
              }
            }
          `
        })
        .expectStatus(200)
        .expectJsonLike({
          errors: [{
            extensions: {
              originalError: {
                statusCode: 400
              }
            }
          }]
        });
    });

    // TODO: Login User with status 200
    it('should login a user with status 200', async () => {
      await pactum.spec()
        .post('/graphql')
        .withJson({
          query: `
            mutation Login{
              login(loginDto: {
                email: "omaraboelnaga121@gmail.com"
                password: "StrongP@ssword1"
              }){
                access_token
              }
            }
          `
        })
        .expectStatus(200);
    });

    // TODO: Failed To login User due to invalid data 401
    it('should not login a user with status 401', async () => {
      await pactum.spec()
        .post('/graphql')
        .withJson({
          query: `
            mutation Login{
              login(loginDto: {
                email: "anymail@gmail.com"
                password: "StrongP@ssword1"
              }){
                access_token
              }
            }
          `
        })
        .expectStatus(200)
        .expectJsonLike({
          errors: [{
            extensions: {
              originalError: {
                statusCode: 401
              }
            }
          }]
        });
    });

    // TODO: Failed To login User due to invalid password 400
    it('should not login a user with status 401 due to invalid password', async () => {
      const res = await pactum.spec()
        .post('/graphql')
        .withJson({
          query: `
            mutation Login{
              login(loginDto: {
                email: "omaraboelnaga121@gmail.com"
                password: "anyPass"
              }){
                access_token
              }
            }
          `
        })
        .expectStatus(200)
        .expectJsonLike({
          errors: [{
            extensions: {
              originalError: {
                statusCode: 401
              }
            }
          }]
        });
        console.log(res);
        
    });

    // TODO: Change user's image status 200
    it("change user's image with status 200", async () => {
      const filePath = path.resolve(__dirname, 'test-image.png');
      const fileBuffer = fs.readFileSync(filePath);

      await pactum.spec()
        .put(`/image-upload/upload/${userId}`)
        .withFile('file', filePath)
        .expectStatus(200);
    });

    // TODO: Change user's image but with fake id status 400
    it("don't change user's image with status 400", async () => {
      const filePath = path.resolve(__dirname, 'test-image.png');
      const fileBuffer = fs.readFileSync(filePath);

      await pactum.spec()
        .put(`/image-upload/upload/1`)
        .withFile('file', filePath)
        .expectStatus(400);
    });
  });
});
