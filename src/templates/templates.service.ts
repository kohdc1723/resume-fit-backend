import * as path from 'path';
import * as fs from 'fs/promises';
import Handlebars from 'handlebars';
import * as dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';

import { ResumeWithAllRelations } from 'src/types/resume';
import { Contact } from '@prisma/client';

@Injectable()
export class TemplatesService {
  private resumeTemplateDir: string;
  private resumePartialsPromise: Promise<void>;

  constructor() {
    this.resumeTemplateDir = path.join(__dirname, 'resumes');
    this.registerHandlebarsHelpers();
    this.resumePartialsPromise = this.registerHandlebarsPartials();
  }

  async generateResumeHtml(resume: ResumeWithAllRelations) {
    await this.resumePartialsPromise;

    const resumeTemplatePath = path.join(this.resumeTemplateDir, 'default.hbs');
    const resumeContent = await fs.readFile(resumeTemplatePath, 'utf-8');
    const compiledResumeTemplate = Handlebars.compile(resumeContent);

    return compiledResumeTemplate({ resume });
  }

  private registerHandlebarsHelpers() {
    Handlebars.registerHelper('formatDate', this.formatDate);
    Handlebars.registerHelper(
      'formatEmploymentType',
      this.formatEmploymentType,
    );
    Handlebars.registerHelper('formatWorkMode', this.formatWorkMode);
    Handlebars.registerHelper('formatContacts', this.formatContacts);
    Handlebars.registerHelper('eq', this.equals);
  }

  private async registerHandlebarsPartials() {
    const partialFiles = [
      'contact.hbs',
      'work-experience.hbs',
      'education.hbs',
      'skills.hbs',
      'projects.hbs',
    ];

    for (const partialFile of partialFiles) {
      const partialPath = path.join(
        this.resumeTemplateDir,
        'partials',
        partialFile,
      );
      const partialName = path.basename(partialFile, '.hbs');
      const partialContent = await fs.readFile(partialPath, 'utf-8');
      const compiledPartial = Handlebars.compile(partialContent);
      Handlebars.registerPartial(partialName, compiledPartial);
    }
  }

  private formatDate = (date: string) => {
    return dayjs(date).format('YYYY-MM');
  };

  private formatEmploymentType = (employmentType: string) => {
    switch (employmentType) {
      case 'PERMANENT_FULL_TIME':
        return 'Permanent Full-time';
      case 'PERMANENT_PART_TIME':
        return 'Permanent Part-time';
      case 'CONTRACT_FULL_TIME':
        return 'Contract Full-time';
      case 'CONTRACT_PART_TIME':
        return 'Contract Part-time';
      case 'FREELANCE':
        return 'Freelance';
      case 'INTERNSHIP':
        return 'Internship';
      case 'CO_OP':
        return 'Co-op';
      case 'SEASONAL':
        return 'Seasonal';
      case 'APPRENTICESHIP':
        return 'Apprenticeship';
      case 'SELF_EMPLOYED':
        return 'Self-employed';
      case 'CASUAL':
        return 'Casual';
      case 'ON_CALL':
        return 'On-call';
      default:
        return null;
    }
  };

  private formatWorkMode = (workMode: string) => {
    switch (workMode) {
      case 'ON_SITE':
        return 'On-site';
      case 'REMOTE':
        return 'Remote';
      case 'HYBRID':
        return 'Hybrid';
      default:
        return null;
    }
  };

  private formatContacts = (contact: Contact) => {
    const { location, email, phone, links } = contact;

    const allContacts = [location, email, phone, ...links];
    const filteredContacts = allContacts.filter((contact) => !!contact);

    const formattedContactsArray: string[] = [];
    for (let i = 0; i < filteredContacts.length; ++i) {
      formattedContactsArray.push(filteredContacts[i] as string);
      if (i < filteredContacts.length - 1) {
        formattedContactsArray.push('•');
      }
    }

    return formattedContactsArray;
  };

  private equals = (a: string, b: string) => {
    return a === b;
  };
}
