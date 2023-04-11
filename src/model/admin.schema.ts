/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;
@Schema()
export class Admin {
  @Prop({ required: true })
  fullname: string;
  @Prop({ default: true })
  admin: boolean;
  @Prop({ required: true, unique: true, lowercase: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ default: Date.now() })
  createdDate: Date;
}
export const AdminSchema = SchemaFactory.createForClass(Admin);
