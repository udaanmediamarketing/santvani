ALTER TABLE "organizations" RENAME COLUMN "name" TO "address";--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "org_type" text;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "org_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "city" text NOT NULL;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "state" text NOT NULL;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "pincode" text;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "head_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "email" text;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "youtube_url" text;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "image_url" text;--> statement-breakpoint
ALTER TABLE "organizations" DROP COLUMN "sant_name";--> statement-breakpoint
ALTER TABLE "organizations" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "organizations" DROP COLUMN "website";--> statement-breakpoint
ALTER TABLE "organizations" DROP COLUMN "founded_year";