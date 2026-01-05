import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const organizations = pgTable("organizations", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  santName: text("sant_name").notNull(),
  description: text("description").notNull(),
  website: text("website"),
  foundedYear: text("founded_year"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});