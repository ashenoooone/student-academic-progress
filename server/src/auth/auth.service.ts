import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { UserAlreadyExist } from './error/user-already-exist';
import { UserNotFound } from './error/user-not-found';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
    const candidate = await this.db.student.findUnique({
      where: { login: dto.login },
    });

    if (candidate) {
      throw new UserAlreadyExist();
    }

    const password = await this._hashPassword(dto.password);

    const user = await this.db.student.create({
      data: {
        ...dto,
        passwordHash: password,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _hashPassword, ...restUser } = user;

    return restUser;
  }

  private async _hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  private async _checkPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async signin(dto: AuthUserDto) {
    const { login, password } = dto;

    const user = await this.db.student.findUnique({
      where: { login },
    });

    if (!user) {
      throw new UserNotFound();
    }

    const isMatch = await this._checkPassword(password, user.passwordHash);

    if (!isMatch) {
      throw new UserNotFound();
    }

    const { passwordHash: _hashPassword, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token: this.jwtService.sign(userWithoutPassword),
    };
  }

  async check(userId: number) {
    const user = await this.db.student.findFirst({
      where: {
        id: userId,
      },
    });

    return user;
  }
}
