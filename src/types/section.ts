import { Prisma } from '@prisma/client';

export type SectionWithAllRelations = Prisma.SectionGetPayload<{
  include: {
    contact: true;
    educations: true;
    workExperiences: {
      include: {
        positions: true;
      };
    };
    projects: true;
    skills: true;
  };
}>;
