import { AuthResponse } from './interfaces/auth-response.interface';
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { User } from '@prisma/client';
import { UserResponseDto } from 'src/user/dtos/user-response.dto';
import { MailerService } from '../mailer/mailer.service';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async register(dto: RegisterDto): Promise<{ accessToken: string }> {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        phone: dto.phone,
        password: hashedPassword,
        role: 'CUSTOMER',
      },
    });

    await this.mailerService.sendWelcomeEmail(user.email, user.name);

    return this.generateToken(user);
  }

  async login(dto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user);
  }

  async sendResetCode(email: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const code = randomBytes(3).toString('hex').toUpperCase();

    try {
      await this.prisma.user.update({
        where: { email },
        data: {
          resetCode: code,
          resetCodeExpiresAt: new Date(Date.now() + 15 * 60 * 1000), 
        },
      });

      await this.mailerService.sendVerificationCodeEmail(user.email, code, user.name);
    } catch (error) {
      throw new BadRequestException('Failed to send reset code');
    }
  }

  async resetPassword(email: string, code: string, newPassword: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ 
      where: { email },
      select: {
        id: true,
        email: true,
        resetCode: true,
        resetCodeExpiresAt: true,
      }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.resetCode || user.resetCode !== code) {
      throw new UnauthorizedException('Invalid reset code');
    }

    if (user.resetCodeExpiresAt && user.resetCodeExpiresAt < new Date()) {
      throw new UnauthorizedException('Reset code has expired');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    try {
      await this.prisma.user.update({
        where: { email },
        data: {
          password: hashedPassword,
          resetCode: null,
          resetCodeExpiresAt: null,
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to reset password');
    }
  }

  private async generateToken(user: User): Promise<AuthResponse> {
    const payload = { sub: user.id, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload);
    const userDto = new UserResponseDto(user);

    return { accessToken, user: userDto };
  }
}