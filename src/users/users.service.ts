import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { ConfigService } from 'src/common/config/config.service';
import { LoginDto } from './dto/login.dto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { Orders } from 'src/orders/orders.model';
import { Cart } from 'src/cart/cart.model';
import { Reviews } from 'src/reviews/reviews.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

    const user = await this.userModel.create({ ...createUserDto } as User);
    return user;
  }

  createMany(createUserDto: CreateUserDto[]) {
    return this.userModel.bulkCreate(createUserDto);
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ where: { email } });

    if (user == null || !(await bcrypt.compare(password, user.password)))
      throw new NotFoundException({ message: 'User not found', status: 404 });

    const accessToken = this.generateAccessToken({
      id: user.id,
      role: user.role,
    });

    return { accessToken, user, status: 200 };
  }

  async findAll() {
    return this.userModel.findAll({
      include: [{ model: Orders }, { model: Cart }, { model: Reviews }],
    });
  }

  async getMe(userId: number) {
    const user = await this.userModel.findOne({
      where: { id: userId },
      include: [{ model: Orders }, { model: Cart }, { model: Reviews }],
    });

    return user;
  }

  findOne(id: number) {
    return this.userModel.findByPk(id, { include: { model: Orders } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const [updated] = await this.userModel.update(updateUserDto, {
      where: { id },
    });
    if (updated) {
      return this.userModel.findByPk(id);
    }
    return null;
  }

  async remove(id: number) {
    const deleted = await this.userModel.destroy({ where: { id } });
    return deleted === 1;
  }

  private generateAccessToken(data) {
    return jwt.sign({ data }, this.configService.get('JWT_ACCESS_SECRET'), {
      expiresIn: '100h',
    });
  }
}
