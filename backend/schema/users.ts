import {
  pgTable,
  text,
  timestamp,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";

export const userStatusEnum = pgEnum("user_status", [
  "pending",
  "approved",
  "rejected",
]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("user").notNull(),
  status: userStatusEnum("status").default("pending").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});