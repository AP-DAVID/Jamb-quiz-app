/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserController } from '../controller/user.controller';
import { User, UserSchema } from '../model/user.schema';
import { AdminSchema} from '../model/admin.schema';
import { Admin, AdminDocument } from '../model/admin.schema'; 
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path/posix';
import 'dotenv/config';

const secret = process.env.JWT_SECRET;

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      { name: Admin.name, schema: AdminSchema },
    ]),
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '2h' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [UserController],
  providers: [UserService, Admin],
})
export class UserModule {}