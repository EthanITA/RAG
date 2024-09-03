CREATE TABLE IF NOT EXISTS "kb" (
	"id" serial NOT NULL,
	"content" text NOT NULL,
	"embedding" vector(1024) NOT NULL
);
