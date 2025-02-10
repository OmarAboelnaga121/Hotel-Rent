import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as pactum from 'pactum';
import { PrismaService } from './../src/prisma/prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

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

  // TODOS: Test Of the auth module
  describe('Auth Module', () => {
    // Test User Register with statsus 200
    it('should register a user with statsus 200', async () => {
      await pactum.spec()
        .post('/graphql')
        .withJson({
          query: `
            mutation {
              createAuth(userDto: {
                firstName: "Omar"
                lastName: "WOW"
                phoneNumber: "01205812263"
                email: "omaraboelnaga121@gmail.com"
                password: "StrongP@ssword1"
                role: "ADMIN"
              }) {
                firstName
                lastName
                phoneNumber
                email
                role
              }
            }
          `
        })
        .expectStatus(200)
        .expectBody({
          data: {
            createAuth: {
              firstName: "Omar",
              lastName: "WOW",
              phoneNumber: "01205812263",
              email: "omaraboelnaga121@gmail.com",
              role: "ADMIN"
            }
          }
        });
      });

      // Test User Register with statsus 400
      it("shouldn't register user due to it is already on db", async () => {
        await pactum.spec()
          .post('/graphql')
          .withJson({
            query: `
              mutation {
                createAuth(userDto: {
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
          .expectStatus(400)
        });
  });
  });
