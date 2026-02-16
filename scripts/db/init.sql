-- Database Initialization Script

-- User & Role Management
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
create index if not exists "idx_user_roleid" on "User" ("roleId");

-- Academic Structure
create table if not exists "Grade" (
  "id" uuid primary key default gen_random_uuid(),
  "name" varchar(50) not null,
  "category" varchar(50),
  "active" boolean not null default true,
  "createdAt" timestamptz default current_timestamp,
  "updatedAt" timestamptz default current_timestamp
);

-- School Management
create table if not exists "School" (
  "id" uuid primary key default gen_random_uuid(),
  "name" varchar(200) unique not null,
  "document" varchar(14) unique not null,
  "active" boolean not null default true,
  "createdAt" timestamptz default current_timestamp,
  "updatedAt" timestamptz default current_timestamp
);

-- Class Management
create table if not exists "Class" (
  "id" uuid primary key default gen_random_uuid(),
  "name" varchar(50) not null,
  "year" integer not null,
  "active" boolean not null default true,
  "createdAt" timestamptz default current_timestamp,
  "updatedAt" timestamptz default current_timestamp,
  "schoolId" uuid not null references "School"("id") on delete restrict,
  "gradeId" uuid not null references "Grade"("id") on delete restrict
);
create index if not exists "idx_class_schoolid" on "Class" ("schoolId");
create index if not exists "idx_class_gradeid" on "Class" ("gradeId");

-- Junction Management
create table if not exists "ClassUser" (
  "id" uuid primary key default gen_random_uuid(),
  "startDate" date not null,
  "endDate" date,
  "active" boolean not null default true,
  "createdAt" timestamptz default current_timestamp,
  "updatedAt" timestamptz default current_timestamp,
  "classId" uuid not null references "Class"("id") on delete cascade,
  "userId" uuid not null references "User"("id") on delete cascade,
  constraint "unq_class_user" unique ("classId", "userId")
);
create index if not exists "idx_classuser_class" on "ClassUser" ("classId");
create index if not exists "idx_classuser_user" on "ClassUser" ("userId");

-- Feedback System
create table if not exists "Feedback" (
  "id" uuid primary key default gen_random_uuid(),
  "title" varchar(200) not null,
  "active" boolean not null default true,
  "createdAt" timestamptz default current_timestamp,
  "updatedAt" timestamptz default current_timestamp,
  "classId" uuid not null references "Class"("id") on delete cascade,
  "userId" uuid not null references "User"("id") on delete restrict
);
create index if not exists "idx_feedback_classid" on "Feedback" ("classId");
create index if not exists "idx_feedback_userid" on "Feedback" ("userId");

create table if not exists "Question" (
  "id" uuid primary key default gen_random_uuid(),
  "title" varchar(200) not null,
  "description" text,
  "order" integer not null,
  "active" boolean not null default true,
  "createdAt" timestamptz default current_timestamp,
  "updatedAt" timestamptz default current_timestamp,
  "feedbackId" uuid not null references "Feedback"("id") on delete cascade
);
create index if not exists "idx_question_feedbackid" on "Question" ("feedbackId");

create table if not exists "Answer" (
  "id" uuid primary key default gen_random_uuid(),
  "outcome" integer not null,
  "active" boolean not null default true,
  "createdAt" timestamptz default current_timestamp,
  "updatedAt" timestamptz default current_timestamp,
  "questionId" uuid not null references "Question"("id") on delete cascade,
  "userId" uuid not null references "User"("id") on delete restrict
);
create index if not exists "idx_answer_questionid" on "Answer" ("questionId");
create index if not exists "idx_answer_userid" on "Answer" ("userId");

-- Authentication
create table if not exists "RefreshToken" (
  "id" uuid primary key default gen_random_uuid(),
  "token" text unique not null,
  "expiresAt" timestamptz not null,
  "createdAt" timestamptz default current_timestamp,
  "userId" uuid not null references "User"("id") on delete cascade
);
create index if not exists "idx_refreshtoken_userid" on "RefreshToken" ("userId");
