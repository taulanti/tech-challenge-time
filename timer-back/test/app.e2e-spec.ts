import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthCredentialsDto } from 'src/user/dto/auth-credentials.dto';
import { HttpStatus } from '@nestjs/common';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';

let app = 'http://localhost:4000';
describe('User and Task endpoints', () => {

  let username: string;
  let password: string;
  let token: string;
  it('should register', () => {
    const user: AuthCredentialsDto = {
      username: 'username' + Math.floor((Math.random() * (1 - 1000) + 1))+'',
      password: 'password'
    };
    console.log(user);
    username = user.username;
    password = user.password;
    return request(app)
      .post('/auth/signup')
      .set('Accept', 'application/json')
      .send(user)
      .expect(HttpStatus.CREATED);
  });

  it('should get status 409(conflict) because user exists', () => {
    const user: AuthCredentialsDto = {
      username: username,
      password: password
    };
    return request(app)
      .post('/auth/signup')
      .set('Accept', 'application/json')
      .send(user)
      .expect(HttpStatus.CONFLICT);
  });



  it('shouldn\'t register because of empty input', () => {
    const user: AuthCredentialsDto = {
      username: '',
      password: ''
    };
    return request(app)
      .post('/auth/signup')
      .set('Accept', 'application/json')
      .send(user)
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('should login', () => {
    const user: AuthCredentialsDto = {
      username: username,
      password: password
    };
    return request(app)
      .post('/auth/signin')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({body})=>{
        token = body.token;
        expect(body.token).toBeDefined();
      })
      .expect(HttpStatus.OK);
  });

  it('should create a task', () => {
    const task: CreateTaskDto = {
      title: 'test Task',
      project: 'test project',
      duration: '2 hours'
    };
    return request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send(task)
      .expect(HttpStatus.CREATED);
  });

  it('should get the task created today', () => {
    return request(app)
      .get('/tasks/day')
      .set('Authorization', `Bearer ${token}`)
      .expect(HttpStatus.OK);
  });
});
