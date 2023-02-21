import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { User, Address } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Request() req): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDto: User): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: User): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    return this.usersService.delete(id);
  }

  @Post(':id/address')
  async addAddress(@Param('id') id: string, @Body() address: Address): Promise<User> {
    return this.usersService.addAddress(id, address);
  }

  @Put(':id/address/:addressId')
  async updateAddress(
    @Param('id') id: string,
    @Param('addressId') addressId: string,
    @Body() address: Address,
  ): Promise<User> {
    return this.usersService.updateAddress(id, addressId, address);
  }

  @Delete(':id/address/:addressId')
  async deleteAddress(@Param('id') id: string, @Param('addressId') addressId: string): Promise<User> {
    return this.usersService.deleteAddress(id, addressId);
  }
}

