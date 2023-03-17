/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFiles,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { User } from '../model/user.schema';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Controller('api/user')
export class UserController {
  constructor(
    private readonly userServe: UserService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async Signup(
    @Res() response: Response,
    @Body() createUserDto: CreateUserDto,
  ) {
    const newUSer = await this.userServe.signup(createUserDto);
    return response.status(HttpStatus.CREATED).json({
      newUSer,
    });
  }

  @Post('/signin')
  async SignIn(
    @Res() response: Response,
    @Body() createUserDto: CreateUserDto,
    @Req() request: Request,
  ) {
    try {
      const tokenn = await this.userServe.signin(
        createUserDto,
        this.jwtService,
        response,
      );
      await response
        .cookie('token', tokenn.token, {
          maxAge: 3600000 + Date.now(),
          secure: false,
        })
        .send({ status: 'ok' });

      console.log(request.cookies['token']);
    } catch (err) {
      return response.status(HttpStatus.CREATED).json(err);
    }
  }

  @Get('/loggedIn')
  async LoggedIn(@Res() response: Response, @Req() request: Request) {
    const yup = await this.userServe.loggedin(
      response,
      this.jwtService,
      request,
    );
    return yup;
  }

  @Get('/logout')
  async Logout(@Res() response: Response) {
    try {
      response
        .cookie('token', '', {
          maxAge: 0 + Date.now(),
          secure: false,
        })
        .send({ status: 'sucess' });

      return {
        message: 'successfully',
      };
    } catch (err) {
      return response.status(500).json(err);
    }
  }
}
