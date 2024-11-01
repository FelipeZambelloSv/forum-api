import { Inject, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class QuestionsService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(createQuestionDto: CreateQuestionDto, userId: number) {
    return await this.prisma.question.create({
      data: { ...createQuestionDto, userId },
    });
  }

  async findAll() {
    return await this.prisma.question.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.question.findUnique({ where: { id } });
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return await this.prisma.question.update({
      where: { id },
      data: updateQuestionDto,
    })
  }

  remove(id: number) {
    return this.prisma.question.delete({ where: { id } });
  }
}
