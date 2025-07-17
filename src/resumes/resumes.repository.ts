import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { ResumeWithAllRelations } from 'src/types/resume';

@Injectable()
export class ResumesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createResumeDto: Prisma.ResumeCreateInput) {
    return this.prismaService.resume.create({
      data: createResumeDto,
    });
  }

  async findAll(userId: string) {
    return this.prismaService.resume.findMany({
      where: { userId },
    });
  }

  async findOne(id: string): Promise<ResumeWithAllRelations | null> {
    return this.prismaService.resume.findUnique({
      where: { id },
      include: {
        sections: {
          include: {
            contact: true,
            educations: {
              orderBy: {
                index: 'asc',
              },
            },
            workExperiences: {
              include: {
                positions: {
                  orderBy: {
                    index: 'asc',
                  },
                },
              },
              orderBy: {
                index: 'asc',
              },
            },
            skills: {
              orderBy: {
                index: 'asc',
              },
            },
            projects: {
              orderBy: {
                index: 'asc',
              },
            },
          },
          orderBy: {
            index: 'asc',
          },
        },
      },
    });
  }

  async update(id: string, updateResumeDto: Prisma.ResumeUpdateInput) {
    return this.prismaService.resume.update({
      where: { id },
      data: updateResumeDto,
    });
  }

  async remove(id: string) {
    return this.prismaService.resume.delete({
      where: { id },
    });
  }
}
