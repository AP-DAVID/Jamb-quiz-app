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
import { Admin } from '../model/admin.schema';
import { AdminService } from '../service/admin.service';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Controller('api/admin')
export class AdminController {
  constructor(
    private readonly userServe: AdminService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async Signup(
    @Res() response: Response,
    @Body() createAdminDto: CreateAdminDto,
  ) {
    const newUSer = await this.userServe.signup(createAdminDto);
    return response.status(HttpStatus.CREATED).json({
      newUSer,
    });
  }

  @Post('/signin')
  async SignIn(
    @Res() response: Response,
    @Body() createAdminDto: CreateAdminDto,
    @Req() request: Request,
  ) {
    try {
      const tokenn = await this.userServe.signin(
        createAdminDto,
        this.jwtService,
        response,
      );
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
