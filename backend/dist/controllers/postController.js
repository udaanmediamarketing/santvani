import { createPost, getPosts, getPostsBySantName, getAllPosts, getPostBySlug, getListByCategory, getPostsByCategory, getGalleryPosts, } from "../models/postModel.js";
export const createPostController = async (req, res) => {
    try {
        const { title, category, santname, content, image_url, youtube_url, slug } = req.body;
        const author_id = req.user?.id;
        if (!author_id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const post = await createPost(title, category, santname, content || null, image_url || null, youtube_url || null, slug, author_id);
        res.status(201).json({
            message: "Post created successfully",
            post,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};
export const listAllPosts = async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.json({ posts });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};
export const listPosts = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "User ID is required" });
    }
    const posts = await getPosts(id);
    res.json({ posts });
};
export const listPostsByCategory = async (req, res) => {
    const { category } = req.params;
    if (!category) {
        return res.status(400).json({ error: 'Category is required' });
    }
    try {
        const posts = await getPostsByCategory(category);
        res.json({ posts });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};
export const listPostsBySantName = async (req, res) => {
    const { name } = req.params;
    if (!name) {
        return res.status(400).json({ error: "Sant name is required" });
    }
    const posts = await getPostsBySantName(name);
    res.json({ posts });
};
export const getPostBySlugController = async (req, res) => {
    try {
        const { slug } = req.params;
        if (!slug) {
            return res.status(400).json({ message: 'Slug is required' });
        }
        const post = await getPostBySlug(slug);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    }
    catch (err) {
        console.error('getPostBySlug error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
export const listByCategoryController = async (req, res) => {
    try {
        const data = await getListByCategory();
        res.json(data);
    }
    catch (error) {
        console.error("listByCategory error:", error);
        res.status(500).json({ error: "Server error" });
    }
};
export const listPostsByCategoryController = async (req, res) => {
    try {
        const { category } = req.params;
        if (!category)
            return res.status(400).json({ error: "Category required" });
        const posts = await getPostsByCategory(category);
        res.json({ posts });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};
//galley content
export const listGalleryPosts = async (_req, res) => {
    try {
        const posts = await getGalleryPosts();
        res.json({ posts });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch gallery" });
    }
};
// search bar ------searchPosts
// export const searchPostsController = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const q = req.query.q as string | undefined;
//     if (!q) {
//       return res.json({ posts: [] });
//     }
//     const posts = await searchPosts(q);
//     res.json({ posts });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Search failed" });
//   }
// };
//# sourceMappingURL=postController.js.map