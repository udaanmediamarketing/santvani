import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db";
import { organizations } from "../../../schema/organizations";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { name, santName, description, website, foundedYear } = req.body;

      await db.insert(organizations).values({
        name,
        santName,
        description,
        website,
        foundedYear,
      });

      return res.status(200).json({ message: "Organization added successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to add organization" });
    }
  }

  if (req.method === "GET") {
    const all = await db.select().from(organizations);
    return res.status(200).json(all);
  }

  return res.status(405).json({ error: "Method not allowed" });
}