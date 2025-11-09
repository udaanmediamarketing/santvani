import { pgTable, text, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";

export const articleStatusEnum = pgEnum("article_status", [
  "pending",
  "approved",
  "cancelled"
]);

export const articles = pgTable("articles", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  content: text("content"),
  pdfUrl: text("pdf_url"),
  status: articleStatusEnum("status").default("pending").notNull(),
  authorId: uuid("author_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
});