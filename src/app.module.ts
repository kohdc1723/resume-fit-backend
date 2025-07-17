import { Module } from '@nestjs/common';
import { ResumesModule } from './resumes/resumes.module';
import { PrismaModule } from './prisma/prisma.module';
import { TemplatesModule } from './templates/templates.module';

@Module({
  imports: [ResumesModule, PrismaModule, TemplatesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
