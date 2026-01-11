ALTER TABLE "articles" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_slug_unique" UNIQUE("slug");