import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import puppeteer from 'puppeteer';

import { ResumesRepository } from './resumes.repository';
import { TemplatesService } from 'src/templates/templates.service';

@Injectable()
export class ResumesService {
  constructor(
    private readonly resumesRepository: ResumesRepository,
    private readonly templatesService: TemplatesService,
  ) {}

  async create(createResumeDto: Prisma.ResumeCreateInput) {
    return this.resumesRepository.create(createResumeDto);
  }

  async findAll(userId: string) {
    return this.resumesRepository.findAll(userId);
  }

  async findOne(id: string) {
    return this.resumesRepository.findOne(id);
  }

  async generatePdf(id: string) {
    const resume = await this.findOne(id);
    console.log(resume);
    const resumeHtml = await this.templatesService.generateResumeHtml(resume!);

    console.log(resumeHtml);

    const browser = await puppeteer.launch({ headless: true });

    try {
      const page = await browser.newPage();
      await page.setContent(resumeHtml);
      const pdf = await page.pdf({
        format: 'LETTER',
        printBackground: true,
        scale: 1.0,
      });

      return pdf;
    } finally {
      await browser.close();
    }
  }

  async update(id: string, updateResumeDto: Prisma.ResumeUpdateInput) {
    return this.resumesRepository.update(id, updateResumeDto);
  }

  async remove(id: string) {
    return this.resumesRepository.remove(id);
  }
}
