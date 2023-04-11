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
import * as bcrypt from 'bcrypt';
import 'dotenv/config';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}

  async getUserByEmail(email: string) {
    return this.adminModel
      .findOne({
        email,
      })
      .exec();
  }

  async signup(createAdminDto: CreateAdminDto): Promise<Admin> {
    const createUser = new this.adminModel(createAdminDto);
    const user = await this.getUserByEmail(createUser.email);
    if (user) {
      throw new BadRequestException();
    }
    const salt = await bcrypt.genSalt();
    createUser.password = await bcrypt.hash(createUser.password, salt);

    return createUser.save();
  }

  async signin(
    createAdminDto: CreateAdminDto,
    jwt: JwtService,
    @Res() res: Response,
  ): Promise<any> {
    console.log(createAdminDto);
    try {
      const foundUser = await this.adminModel.findOne({
        email: createAdminDto.email,
      });

      const secret = process.env.JWT_SECRET;
      if (foundUser) {
        const { password } = foundUser;
        if (bcrypt.compare(createAdminDto.password, password)) {
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

      return res.json({ check: true, id: decoded.id, data: user });
    } catch (err) {
      res.json(err);
    }
  }

  async getOne(email): Promise<Admin> {
    return await this.adminModel.findOne({ email }).exec();
  }
}
