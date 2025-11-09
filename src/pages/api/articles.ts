import type { NextApiRequest, NextApiResponse } from "next";
import {db} from "../../../db";
import { articles } from "../../../schema/articles";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { category, title, content } = req.body;

      console.log({ category, title, content });

      const authorId = "00000000-0000-0000-0000-000000000001";

      await db.insert(articles).values({
        category,
        title,
        content,
        authorId,
        status: "pending",
      });

      return res.status(200).json({ message: "Article created successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to create article" });
    }
  }

  if (req.method === "GET") {
    return res.status(200).json({ message: "Fetched articles" });
  }

  return res.status(405).json({ error: "Method not allowed" });
}

export const config = {
  api: {
    bodyParser: true,
  },
};