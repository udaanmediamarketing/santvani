import { pgTable, text, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";

export const articleStatusEnum = pgEnum("article_status", [
  "pending",
  "published",
  "rejected"
]);

export const articles = pgTable("articles", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  santname: text("santname"),
  category: text("category"),
  content: text("content"),
  imageUrl: text("image_url"),
  status: articleStatusEnum("status").default("pending").notNull(),
  youtubeUrl: text("youtube_url"), 
  slug: text("slug").notNull().unique(), 
  // TODO: Foreign key relation with users table
  authorId: uuid("author_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow()
});