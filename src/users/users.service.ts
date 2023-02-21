import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportLocalModel } from 'passport-local';
import { User, Address } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: PassportLocalModel<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async update(id: string, user: User): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id);
  }

  async addAddress(id: string, address: Address): Promise<User> {
    const user = await this.userModel.findById(id);
    user.addressBook.push(address);
    return user.save();
  }

  async updateAddress(id: string, addressId: string, address: Address): Promise<User> {
    const user = await this.userModel.findById(id);
    const addressIndex = user.addressBook.findIndex(a => a._id == addressId);
    user.addressBook[addressIndex] = address;
    return user.save();
  }

  async deleteAddress(id: string, addressId: string): Promise<User> {
    const user = await this.userModel.findById(id);
    const addressIndex = user.addressBook.findIndex(a => a._id == addressId);
    user.addressBook.splice(addressIndex, 1);
    return user.save();
  }
}
