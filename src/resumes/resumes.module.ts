import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { ResumesController } from './resumes.controller';
import { ResumesService } from './resumes.service';
import { ResumesRepository } from './resumes.repository';
import { TemplatesModule } from 'src/templates/templates.module';

@Module({
  imports: [PrismaModule, TemplatesModule],
  controllers: [ResumesController],
  providers: [ResumesService, ResumesRepository],
  exports: [ResumesService],
})
export class ResumesModule {}
