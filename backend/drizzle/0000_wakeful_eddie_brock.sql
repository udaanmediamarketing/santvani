CREATE TYPE "public"."article_status" AS ENUM('pending', 'published', 'rejected');--> statement-breakpoint
CREATE TABLE "articles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"category" text NOT NULL,
	"content" text,
	"pdf_url" text,
	"status" "article_status" DEFAULT 'pending' NOT NULL,
	"author_id" uuid,
	"created_at" timestamp with time zone DEFAULT now()
);
