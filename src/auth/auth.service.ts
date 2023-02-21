import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportLocalModel } from 'passport-local';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: PassportLocalModel<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findOneByUsername(username: string): Promise<User> {
  return this.userModel.findOne({ username });
   }


}
