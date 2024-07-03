BEGIN;


CREATE TABLE IF NOT EXISTS public."Answer"
(
    id serial NOT NULL,
    "assignmentId" integer NOT NULL,
    student text COLLATE pg_catalog."default" NOT NULL,
    point double precision NOT NULL,
    CONSTRAINT "Answer_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Assignment"
(
    id serial NOT NULL,
    question text COLLATE pg_catalog."default" NOT NULL,
    due timestamp(3) without time zone,
    "inClass" integer NOT NULL,
    CONSTRAINT "Assignment_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Class"
(
    id serial NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    images text COLLATE pg_catalog."default",
    "hostId" integer,
    CONSTRAINT "Class_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Collection"
(
    id serial NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    summary text COLLATE pg_catalog."default",
    belongto integer,
    author integer,
    CONSTRAINT "Collection_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Flashcard"
(
    front_text text COLLATE pg_catalog."default" NOT NULL,
    front_img text COLLATE pg_catalog."default",
    back_text text COLLATE pg_catalog."default" NOT NULL,
    back_img text COLLATE pg_catalog."default",
    "collectionId" integer NOT NULL,
    id serial NOT NULL,
    CONSTRAINT "Flashcard_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Post"
(
    id text COLLATE pg_catalog."default" NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    content text COLLATE pg_catalog."default" NOT NULL,
    "inClass" integer NOT NULL,
    CONSTRAINT "Post_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."StudyAt"
(
    "classId" integer NOT NULL,
    "studentId" integer NOT NULL,
    CONSTRAINT "StudyAt_pkey" PRIMARY KEY ("classId", "studentId")
);

CREATE TABLE IF NOT EXISTS public."User"
(
    id serial NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    "phoneNumber" text COLLATE pg_catalog."default",
    CONSTRAINT "User_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public._prisma_migrations
(
    id character varying(36) COLLATE pg_catalog."default" NOT NULL,
    checksum character varying(64) COLLATE pg_catalog."default" NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    logs text COLLATE pg_catalog."default",
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone NOT NULL DEFAULT now(),
    applied_steps_count integer NOT NULL DEFAULT 0,
    CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."Answer"
    ADD CONSTRAINT "Answer_assignmentId_fkey" FOREIGN KEY ("assignmentId")
    REFERENCES public."Assignment" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE RESTRICT;


ALTER TABLE IF EXISTS public."Assignment"
    ADD CONSTRAINT "Assignment_inClass_fkey" FOREIGN KEY ("inClass")
    REFERENCES public."Class" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE RESTRICT;


ALTER TABLE IF EXISTS public."Class"
    ADD CONSTRAINT "Class_hostId_fkey" FOREIGN KEY ("hostId")
    REFERENCES public."User" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public."Collection"
    ADD CONSTRAINT "Collection_author_fkey" FOREIGN KEY (author)
    REFERENCES public."User" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public."Collection"
    ADD CONSTRAINT "Collection_belongto_fkey" FOREIGN KEY (belongto)
    REFERENCES public."Class" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public."Flashcard"
    ADD CONSTRAINT "Flashcard_collectionId_fkey" FOREIGN KEY ("collectionId")
    REFERENCES public."Collection" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE RESTRICT;


ALTER TABLE IF EXISTS public."Post"
    ADD CONSTRAINT "Post_inClass_fkey" FOREIGN KEY ("inClass")
    REFERENCES public."Class" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE RESTRICT;


ALTER TABLE IF EXISTS public."StudyAt"
    ADD CONSTRAINT "StudyAt_classId_fkey" FOREIGN KEY ("classId")
    REFERENCES public."Class" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE RESTRICT;


ALTER TABLE IF EXISTS public."StudyAt"
    ADD CONSTRAINT "StudyAt_studentId_fkey" FOREIGN KEY ("studentId")
    REFERENCES public."User" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE RESTRICT;

END;