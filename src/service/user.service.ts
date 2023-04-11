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
import { Admin, AdminDocument } from '../model/admin.schema';
import { User, UserDocument } from '../model/user.schema';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Admin.name)
    private adminModel: Model<AdminDocument>,
  ) {}

  async getUserByEmail(email: string) {
    return this.userModel
      .findOne({
        email,
      })
      .exec();
  }

  async getAdminByEmail(email: string) {
    return this.adminModel
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

          return await res
            .cookie('token', token, {
              secure: false,
              expires: new Date('9999-12-31'),
            })
            .send({ status: 'ok' });
        }

        return res.status(500).json({ error: 'Internal Server Error' });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    } catch (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
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
      if (!user) {
        const admin = await this.getAdminByEmail(decoded.email);
        return res.json({ check: true, id: decoded.id, data: admin });
      }

      return res.json({ check: true, id: decoded.id, data: user });
    } catch (err) {
      res.json(err);
    }
  }

  async getOne(email): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }
}