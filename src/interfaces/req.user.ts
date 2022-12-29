import { Request } from 'express';
import { User } from '../database/entities/user.entity';

export interface ReqestUser extends Request {
  time: Date;
  user?: User;
}
