import { Prisma } from '@prisma/client';

export type ResumeWithAllRelations = Prisma.ResumeGetPayload<{
  include: {
    sections: {
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
    };
  };
}>;
