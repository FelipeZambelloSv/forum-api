import { Inject, Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AnswersService {
  @Inject()
  private readonly prisma: PrismaService

  create(createAnswerDto: CreateAnswerDto, userId: number, questionId: number) {
    const newAnswer = {
      body: createAnswerDto.body,
      user: {
        connect: { id: userId },
      },
      question: {
        connect: { id: questionId },
      },
    };
    return this.prisma.answer.create({
      data: newAnswer,
    });
  }

  findAll() {
    return this.prisma.answer.findMany();
  }

  findOne(id: number) {
    return this.prisma.answer.findUnique({ where: { id } });
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return this.prisma.answer.update({ where: { id }, data: updateAnswerDto });
  }

  remove(id: number) {
    return this.prisma.answer.delete({ where: { id } });
  }
}
