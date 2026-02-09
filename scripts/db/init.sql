-- Database Initialization Script

-- User Management Tables
create table if not exists "Role" (
  "id" uuid primary key default gen_random_uuid(),
  "name" varchar(50) unique not null,
  "description" text,
  "active" boolean not null default true,
  "createdAt" timestamptz default current_timestamp,
  "updatedAt" timestamptz default current_timestamp
);

create table if not exists "User" (
  "id" uuid primary key default gen_random_uuid(),
  "email" varchar(150) unique not null,
  "password" varchar(255) not null,
  "name" varchar(100) not null,
  "document" varchar(11) unique not null,
  "active" boolean not null default true,
  "createdAt" timestamptz default current_timestamp,
  "updatedAt" timestamptz default current_timestamp,

  "roleId" uuid not null references "Role"("id") on delete restrict
);
create index "idx_user_roleid" on "User" ("roleId");

-- Academic Management Tables
create table if not exists "Grade" (
  "id" uuid primary key default gen_random_uuid(),
  "name" varchar(20) unique not null,
  "category" varchar(20),
  "active" boolean not null default true,
	"createdAt" timestamptz default current_timestamp,
	"updatedAt" timestamptz default current_timestamp
);

-- School Management Tables
create table if not exists "School" (
  "id" uuid primary key default gen_random_uuid(),
  "name" varchar(200) unique not null,
  "document" varchar(14) unique not null,
  "active" boolean not null default true,
	"createdAt" timestamptz default current_timestamp,
	"updatedAt" timestamptz default current_timestamp
);

create table if not exists "SchoolUser" (
  "id" uuid primary key default gen_random_uuid(),
  "startDate" date not null,
  "endDate" date,
  "status" varchar(20) not null check ("status" in ('TEACHER', 'STUDENT')),
  "active" boolean not null default true,
  "createdAt" timestamptz default current_timestamp,
  "updatedAt" timestamptz default current_timestamp,

  "schoolId" uuid not null references "School"("id") on delete cascade,
  "userId" uuid not null references "User"("id") on delete cascade,
  constraint "unq_school_user" unique ("schoolId", "userId")
);

-- Class Management Tables
create table if not exists "Class" (
  "id" uuid primary key default gen_random_uuid(),
  "name" varchar(20) not null,
  "year" integer not null,
  "active" boolean not null default true,
  "createdAt" timestamptz default current_timestamp,
  "updatedAt" timestamptz default current_timestamp,

  "schoolId" uuid not null references "School"("id") on delete restrict,
  "gradeId" uuid not null references "Grade"("id") on delete restrict
);

create table if not exists "ClassUser" (
  "id" uuid primary key default gen_random_uuid(),
  "startDate" date not null,
  "endDate" date,
  "status" varchar(20) not null check ("status" in ('TEACHER', 'STUDENT')),
  "active" boolean not null default true,
  "createdAt" timestamptz default current_timestamp,
  "updatedAt" timestamptz default current_timestamp,

  "classId" uuid not null references "Class"("id") on delete restrict,
  "userId" uuid not null references "User"("id") on delete restrict,
  constraint "unq_class_user" unique ("classId", "userId")
);

create table if not exists "ClassGrade" (
  "id" uuid primary key default gen_random_uuid(),
  "startDate" date not null,
  "endDate" date,
  "status" varchar(20) not null check ("status" in ('TEACHER', 'STUDENT')),
  "active" boolean not null default true,
  "createdAt" timestamptz default current_timestamp,
  "updatedAt" timestamptz default current_timestamp,

  "classId" uuid not null references "Class"("id") on delete restrict,
  "gradeId" uuid not null references "Grade"("id") on delete restrict,
  constraint "unq_class_grade" unique ("classId", "gradeId")
);

-- Feedback Management Tables
create table if not exists "Feedback" (
  "id" uuid primary key default gen_random_uuid(),
  "title" varchar(200) not null,
  "active" boolean not null default true,
  "createdAt" timestamptz default current_timestamp,
  "updatedAt" timestamptz default current_timestamp,

  "classId" uuid not null references "Class"("id") on delete restrict,
  "userId" uuid not null references "User"("id") on delete restrict
);

create table if not exists "FeedbackUser" (
  "id" uuid primary key default gen_random_uuid(),
  "status" varchar(20) not null,
  "active" boolean not null default true,
  "createdAt" timestamptz default current_timestamp,
  "updatedAt" timestamptz default current_timestamp,

  "feedbackId" uuid not null references "Feedback"("id") on delete restrict,
  "userId" uuid not null references "User"("id") on delete restrict,
  constraint "unq_feedback_user" unique ("feedbackId", "userId")
);

create table if not exists "Question" (
  "id" uuid primary key default gen_random_uuid(),
  "title" varchar(200) not null,
  "description" text,
  "order" integer not null,
  "active" boolean not null default true,
  "createdAt" timestamptz default current_timestamp,
  "updatedAt" timestamptz default current_timestamp,

  "feedbackId" uuid not null references "Feedback"("id") on delete restrict
);

create table if not exists "Answer" (
  "id" uuid primary key default gen_random_uuid(),
  "outcome" text not null,
  "active" boolean not null default true,
  "createdAt" timestamptz default current_timestamp,
  "updatedAt" timestamptz default current_timestamp,

  "questionId" uuid not null references "Question"("id") on delete cascade,
  "userId" uuid not null references "User"("id") on delete restrict
);
create index "idx_answer_userid" on "Answer"("userId");

-- Authentication Management Tables
create table if not exists "RefreshToken" (
  "id" uuid primary key default gen_random_uuid(),
  "token" text unique not null,
  "expiresAt" timestamptz not null,
  "createdAt" timestamptz default current_timestamp,
  "updatedAt" timestamptz default current_timestamp,

  "userId" uuid not null references "User"("id") on delete cascade
);
create index "idx_refresh_tokens_token" on "RefreshToken" ("token");
