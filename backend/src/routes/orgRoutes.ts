import express, { Request, Response } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { parseOrganizationFormData } from "../utils/orgFormidableParser.js";
import { createOrganizationController, listOrgs, listAllOrgs } from "../controllers/orgController.js";

interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

const router = express.Router();
router.get("/list-orgs/:id", listOrgs); 
router.get("/list-all-orgs", listAllOrgs);
router.post(
  "/create-org",
  authenticate,
  async (req: Request, res: Response) => {
    const userId = (req as AuthRequest).user?.id;
    
    if (!userId) {
      return res.status(400).json({ error: "User id is not present" });
    }
    const parsedData = await parseOrganizationFormData(req, res, userId);
    if (!parsedData) return;

    // Inject parsed data into req.body
    const fakeReq = {
      body: parsedData,
      user: (req as AuthRequest).user,
    } as AuthRequest;

    await createOrganizationController(fakeReq, res);
  }
);

export default router;