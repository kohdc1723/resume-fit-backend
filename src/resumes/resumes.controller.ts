import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { ResumesService } from './resumes.service';

@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @Post()
  create(@Body() createResumeDto: Prisma.ResumeCreateInput) {
    return this.resumesService.create(createResumeDto);
  }

  @Get()
  findAll(@Query('userId') userId: string) {
    return this.resumesService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resumesService.findOne(id);
  }

  @Get(':id/pdf')
  async getPdf(@Param('id') id: string, @Res() res: Response) {
    try {
      const pdf = await this.resumesService.generatePdf(id);

      // PDF가 제대로 생성되었는지 확인
      if (!pdf || pdf.length === 0) {
        throw new Error('PDF 생성 실패');
      }

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="resume-${id}.pdf"`,
        'Content-Length': pdf.length,
      });

      res.send(Buffer.from(pdf));
    } catch (error) {
      console.error('PDF 생성 오류:', error);
      res.status(500).json({ message: 'PDF 생성 중 오류가 발생했습니다.' });
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResumeDto: Prisma.ResumeUpdateInput,
  ) {
    return this.resumesService.update(id, updateResumeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resumesService.remove(id);
  }
}
