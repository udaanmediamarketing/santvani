import {
  pgTable,
  text,
  timestamp,
  uuid,
  pgEnum
} from "drizzle-orm/pg-core";

export const orgStatusEnum = pgEnum("organization_status", [
  "pending",
  "published",
  "rejected"
]);

export const organizations = pgTable("organizations", {
  id: uuid("id").defaultRandom().primaryKey(),
  orgType: text("org_type"), // optional (manual or select)
  orgName: text("org_name").notNull(),
  address: text("address"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  pincode: text("pincode"),
  headName: text("head_name").notNull(),
  email: text("email"),
  youtubeUrl: text("youtube_url"),
  imageUrl: text("image_url"),
  status: orgStatusEnum("status").default("pending").notNull(),
  authorId: uuid("author_id"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow()
});
