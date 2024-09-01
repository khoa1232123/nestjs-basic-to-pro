import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { AuthService } from 'src/auth/auth.service';
import { LoginDTO } from './dto/login.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userDTO: CreateUserDTO): Promise<User> {
    const salt = await bcrypt.genSalt();
    userDTO.password = await bcrypt.hash(userDTO.password, salt);
    const user = await this.userRepository.save({
      ...userDTO,
      apiKey: uuidv4(),
    });
    delete user.password;
    return user;
  }

  async findOne(loginDTO: LoginDTO): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: loginDTO.email });
    if (!user) {
      throw new UnauthorizedException('Could not find user');
    }
    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  async updateSecretKey(id: number, secretKey: string): Promise<UpdateResult> {
    return this.userRepository.update(id, {
      twoFASecket: secretKey,
      enable2FA: true,
    });
  }

  async disable2FA(id: number): Promise<UpdateResult> {
    return this.userRepository.update(id, {
      enable2FA: false,
      twoFASecket: null,
    });
  }

  async findByApiKey(apiKey: string): Promise<User> {
    return this.userRepository.findOneBy({ apiKey });
  }
}
