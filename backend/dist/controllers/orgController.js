import { createOrganization, getOrgsByUserId, getAllOrgs } from "../models/orgModel.js";
export const listOrgs = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "User ID is required" });
    }
    console.log("Usrt ", id);
    const posts = await getOrgsByUserId(id);
    res.json({ posts });
};
export const createOrganizationController = async (req, res) => {
    try {
        const { orgType, orgName, address, city, state, pincode, headName, email, youtubeUrl, imageUrl, } = req.body;
        const author_id = req.user?.id;
        if (!author_id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const organization = await createOrganization(orgType ?? null, orgName, address ?? null, city, state, pincode ?? null, headName, email, youtubeUrl ?? null, imageUrl ?? null, author_id);
        res.status(201).json({
            message: "संस्था यशस्वीरित्या तयार झाली",
            organization,
        });
    }
    catch (err) {
        console.error("Create organization error:", err);
        res.status(500).json({ error: "Server error" });
    }
};
export const listAllOrgs = async (req, res) => {
    try {
        const posts = await getAllOrgs();
        res.json({ posts });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};
//# sourceMappingURL=orgController.js.map