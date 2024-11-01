import { Inject, Injectable } from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  @Inject()
  private readonly prisma: PrismaService;

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<Users | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async createUser(data: Prisma.UserCreateInput) {
    const hashPassowrd = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({ data: { ...data, password: hashPassowrd } });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<Users> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<Users> {
    return this.prisma.user.delete({
      where,
    });
  }
}



