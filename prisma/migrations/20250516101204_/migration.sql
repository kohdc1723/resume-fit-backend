-- CreateEnum
CREATE TYPE "SectionType" AS ENUM ('CONTACT', 'EDUCATION', 'WORK_EXPERIENCE', 'SKILLS', 'PROJECTS');

-- CreateEnum
CREATE TYPE "WorkMode" AS ENUM ('ON_SITE', 'REMOTE', 'HYBRID');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('PERMANENT_FULL_TIME', 'PERMANENT_PART_TIME', 'CONTRACT_FULL_TIME', 'CONTRACT_PART_TIME', 'FREELANCE', 'INTERNSHIP', 'CO_OP', 'SEASONAL', 'APPRENTICESHIP', 'SELF_EMPLOYED', 'CASUAL', 'ON_CALL');

-- CreateTable
CREATE TABLE "resume" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "created_date_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date_time" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "resume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "section" (
    "id" TEXT NOT NULL,
    "type" "SectionType" NOT NULL,
    "index" INTEGER NOT NULL DEFAULT 0,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "resume_id" TEXT NOT NULL,

    CONSTRAINT "section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact" (
    "id" TEXT NOT NULL,
    "full_name" TEXT,
    "location" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "links" TEXT[],
    "user_id" TEXT NOT NULL,
    "section_id" TEXT NOT NULL,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "education" (
    "id" TEXT NOT NULL,
    "school" TEXT,
    "location" TEXT,
    "degree" TEXT,
    "field" TEXT,
    "gpa" REAL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "isPresent" BOOLEAN,
    "bullets" TEXT[],
    "index" INTEGER NOT NULL DEFAULT 0,
    "user_id" TEXT NOT NULL,
    "section_id" TEXT NOT NULL,

    CONSTRAINT "education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_experience" (
    "id" TEXT NOT NULL,
    "company" TEXT,
    "location" TEXT,
    "index" INTEGER NOT NULL DEFAULT 0,
    "user_id" TEXT NOT NULL,
    "section_id" TEXT NOT NULL,

    CONSTRAINT "work_experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "position" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "work_mode" "WorkMode",
    "employment_type" "EmploymentType",
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "is_present" BOOLEAN DEFAULT false,
    "bullets" TEXT[],
    "index" INTEGER NOT NULL DEFAULT 0,
    "user_id" TEXT NOT NULL,
    "work_experience_id" TEXT NOT NULL,

    CONSTRAINT "position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skill" (
    "id" TEXT NOT NULL,
    "category" TEXT,
    "skills" TEXT[],
    "index" INTEGER NOT NULL DEFAULT 0,
    "user_id" TEXT NOT NULL,
    "section_id" TEXT NOT NULL,

    CONSTRAINT "skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "is_present" BOOLEAN DEFAULT false,
    "bullets" TEXT[],
    "index" INTEGER NOT NULL DEFAULT 0,
    "user_id" TEXT NOT NULL,
    "section_id" TEXT NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "section_resume_id_type_key" ON "section"("resume_id", "type");

-- CreateIndex
CREATE UNIQUE INDEX "contact_section_id_key" ON "contact"("section_id");

-- AddForeignKey
ALTER TABLE "section" ADD CONSTRAINT "section_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education" ADD CONSTRAINT "education_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_experience" ADD CONSTRAINT "work_experience_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "position" ADD CONSTRAINT "position_work_experience_id_fkey" FOREIGN KEY ("work_experience_id") REFERENCES "work_experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill" ADD CONSTRAINT "skill_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "section"("id") ON DELETE CASCADE ON UPDATE CASCADE;
