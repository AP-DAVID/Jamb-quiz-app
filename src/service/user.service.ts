/* eslint-disable prettier/prettier */
import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '../model/user.schema';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUserByEmail(email: string) {
    return this.userModel
      .findOne({
        email,
      })
      .exec();
  }

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const createUser = new this.userModel(createUserDto);
    const user = await this.getUserByEmail(createUser.email);
    if (user) {
      throw new BadRequestException();
    }
    const salt = await bcrypt.genSalt();
    createUser.password = await bcrypt.hash(createUser.password, salt);

    return createUser.save();
  }

  async signin(
    createUserDto: CreateUserDto,
    jwt: JwtService,
    @Res() res: Response,
  ): Promise<any> {
    console.log(createUserDto);
    try {
      const foundUser = await this.userModel.findOne({
        email: createUserDto.email,
      });

      const secret = process.env.JWT_SECRET;
      if (foundUser) {
        const { password } = foundUser;
        if (bcrypt.compare(createUserDto.password, password)) {
          const payload = await { email: foundUser.email, id: foundUser._id };

          const token = await jwt.signAsync(payload);

          return {
            token,
          };
        }

        return new HttpException(
          'Incorrect username or password',
          HttpStatus.UNAUTHORIZED,
        );
      }
      return new HttpException(
        'Incorrect username or password',
        HttpStatus.UNAUTHORIZED,
      );
    } catch (err) {
      return new HttpException(err, HttpStatus.UNAUTHORIZED);
    }
  }

  async loggedin(
    @Res() res: Response,
    jwt: JwtService,
    @Req() req: Request,
  ): Promise<any> {
    try {
      const token = await req.cookies?.['token'];

      if (!token) return res.json(false);
      const secret = await process.env.JWT_SECRET;

      const decoded = await jwt.verifyAsync(token);

      const user = await this.getUserByEmail(decoded.email);

      return res.json({ check: true, id: decoded.id, data: user });
    } catch (err) {
      res.json(err);
    }
  }

  async getOne(email): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }
}
