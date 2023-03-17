import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';
import { UserModule } from './module/user.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URL), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
