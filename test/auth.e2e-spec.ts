import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';
import { USER_NOT_FOUND, WRONG_PASSWORD } from '../src/auth/auth.const';

const user: AuthDto = {
  login: 'sdf@dd.ru',
  password: '1',
};

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login/:loginData (POST) - success', (done) => {
    request(app.getHttpServer())
      .post('/auth/login')
      .send(user)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.access_token).toBeDefined();
        done();
      });
  });
  it('/auth/login/:loginData (POST) - fail(password)', () => {
    jest.setTimeout(10000);
    request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...user, password: '2' })
      .expect(401, {
        statusCode: 401,
        message: WRONG_PASSWORD,
        error: 'Unauthorized',
      });
  });
  it('/auth/login/:loginData (POST) - fail(email)', () => {
    jest.setTimeout(10000);
    request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...user, email: '2sdf@sdf.ee' })
      .expect(401, {
        statusCode: 401,
        message: USER_NOT_FOUND,
        error: 'Unauthorized',
      });
  });

  afterAll(() => {
    disconnect();
  });
});
