import {
  PrismaClient,
  SectionType,
  WorkMode,
  EmploymentType,
} from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  await prisma.resume.create({
    data: {
      title: 'Elon Musk Resume',
      userId: 'user_2wnO3Y6GwAnrrxrsT6y04cBJUeA',
      sections: {
        create: [
          {
            type: SectionType.CONTACT,
            contact: {
              create: {
                fullName: 'Elon Musk',
                location: 'Vancouver, Canada',
                phone: '(444) 444-4444',
                email: 'elon@musk.com',
                links: [
                  'https://www.linkedin.com/in/elonmusk',
                  'https://github.com/elonmusk',
                ],
                userId: 'user_2wnO3Y6GwAnrrxrsT6y04cBJUeA',
              },
            },
          },
          {
            type: SectionType.EDUCATION,
            educations: {
              create: [
                {
                  school: 'University of British Columbia',
                  location: 'Vancouver, BC',
                  degree: 'Bachelor of Science',
                  field: 'Computer Science',
                  gpa: 3.9,
                  startDate: new Date('2011-01'),
                  endDate: new Date('2016-05'),
                  isPresent: false,
                  bullets: [
                    'Received scholarship for outstanding academic performance during undergraduate studies',
                    'First startup during school',
                    'Presented research paper at Computer Science Society',
                  ],
                  userId: 'user_2wnO3Y6GwAnrrxrsT6y04cBJUeA',
                  index: 0,
                },
                {
                  school: 'British Columbia Institute of Technology',
                  location: 'Burnaby, BC',
                  degree: 'Diploma',
                  field: 'Computer Systems Technology',
                  startDate: new Date('2008-01'),
                  endDate: new Date('2010-05'),
                  isPresent: false,
                  bullets: [
                    'Graduated with honors in computer systems technology program',
                    'Focused on entrepreneurial ventures instead of academic pursuits',
                    'Identified business opportunities during the early internet revolution',
                  ],
                  userId: 'user_2wnO3Y6GwAnrrxrsT6y04cBJUeA',
                  index: 1,
                },
              ],
            },
          },
          {
            type: SectionType.WORK_EXPERIENCE,
            workExperiences: {
              create: [
                {
                  company: 'Microsoft',
                  location: 'Vancouver, BC',
                  positions: {
                    create: [
                      {
                        title: 'Senior Software Engineer',
                        workMode: WorkMode.ON_SITE,
                        employmentType: EmploymentType.PERMANENT_FULL_TIME,
                        startDate: new Date('2022-01'),
                        isPresent: true,
                        bullets: [
                          'Developed and maintained cloud-based applications',
                          'Collaborated with cross-functional teams on product development',
                          'Implemented CI/CD pipelines for automated testing and deployment',
                        ],
                        userId: 'user_2wnO3Y6GwAnrrxrsT6y04cBJUeA',
                        index: 0,
                      },
                      {
                        title: 'Software Engineer',
                        workMode: WorkMode.ON_SITE,
                        employmentType: EmploymentType.PERMANENT_FULL_TIME,
                        startDate: new Date('2020-01'),
                        endDate: new Date('2022-01'),
                        bullets: [],
                        userId: 'user_2wnO3Y6GwAnrrxrsT6y04cBJUeA',
                        index: 1,
                      },
                    ],
                  },
                  userId: 'user_2wnO3Y6GwAnrrxrsT6y04cBJUeA',
                  index: 0,
                },
                {
                  company: 'Apple',
                  location: 'Vancouver, BC',
                  positions: {
                    create: [
                      {
                        title: 'Frontend Developer',
                        workMode: WorkMode.ON_SITE,
                        employmentType: EmploymentType.PERMANENT_FULL_TIME,
                        startDate: new Date('2017-01'),
                        endDate: new Date('2020-01'),
                        bullets: [
                          'Developed and maintained cloud-based applications',
                          'Collaborated with cross-functional teams on product development',
                          'Implemented CI/CD pipelines for automated testing and deployment',
                        ],
                        index: 0,
                        userId: 'user_2wnO3Y6GwAnrrxrsT6y04cBJUeA',
                      },
                      {
                        title: 'Frontend Developer',
                        workMode: WorkMode.HYBRID,
                        employmentType: EmploymentType.INTERNSHIP,
                        startDate: new Date('2016-05'),
                        endDate: new Date('2017-01'),
                        bullets: [
                          'Developed responsive user interfaces using React and TypeScript',
                          'Collaborated with design team to implement pixel-perfect UI components',
                          'Optimized application performance by reducing load times by 30%',
                        ],
                        index: 1,
                        userId: 'user_2wnO3Y6GwAnrrxrsT6y04cBJUeA',
                      },
                    ],
                  },
                  userId: 'user_2wnO3Y6GwAnrrxrsT6y04cBJUeA',
                  index: 1,
                },
              ],
            },
          },
          {
            type: SectionType.SKILLS,
            skills: {
              create: [
                {
                  category: 'Programming Languages',
                  skills: [
                    'JavaScript',
                    'TypeScript',
                    'Java',
                    'C#',
                    'C++',
                    'C',
                  ],
                  userId: 'user_2wnO3Y6GwAnrrxrsT6y04cBJUeA',
                  index: 0,
                },
                {
                  category: 'Frontend',
                  skills: [
                    'React',
                    'TypeScript',
                    'JavaScript',
                    'Tailwind CSS',
                    'Next.js',
                  ],
                  userId: 'user_2wnO3Y6GwAnrrxrsT6y04cBJUeA',
                  index: 1,
                },
                {
                  category: 'Backend',
                  skills: [
                    'Node.js',
                    'Express.js',
                    'Nest.js',
                    'Spring Boot',
                    'ASP.NET Core',
                  ],
                  userId: 'user_2wnO3Y6GwAnrrxrsT6y04cBJUeA',
                  index: 2,
                },
              ],
            },
          },
          {
            type: SectionType.PROJECTS,
            projects: {
              create: [
                {
                  title: 'Personal Website',
                  startDate: new Date('2020-01'),
                  endDate: new Date('2021-01'),
                  bullets: [
                    'Developed a personal website using Next.js and Tailwind CSS',
                    'Implemented a blog section with Markdown support',
                    'Added a contact form for user inquiries',
                  ],
                  userId: 'user_2wnO3Y6GwAnrrxrsT6y04cBJUeA',
                  index: 0,
                },
                {
                  title: 'Hackathon Project',
                  startDate: new Date('2016-01'),
                  endDate: new Date('2016-05'),
                  bullets: [
                    'Developed a web application for a hackathon',
                    'Implemented a chatbot using RAG technology',
                    'Added a contact form for user inquiries',
                  ],
                  userId: 'user_2wnO3Y6GwAnrrxrsT6y04cBJUeA',
                  index: 1,
                },
              ],
            },
          },
        ],
      },
    },
  });
}

main()
  .then(() => {
    console.log('Database seeded successfully');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
