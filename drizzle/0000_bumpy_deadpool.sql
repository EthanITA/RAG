CREATE TABLE IF NOT EXISTS "kb" (
	"id" serial NOT NULL,
	"content" text,
	"embedding" vector(1024)
);
