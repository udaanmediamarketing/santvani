'use client';

import { useEffect, useState } from 'react';
import EditorUpdateCardLayout from './editor-layout';
 import { Post } from '../types/post';
export default function EditorUpdatesSection({
  posts = [],
}: {
  posts: Post[];
}) {
  // const [posts, setPosts] = useState<EditorPost[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const res = await fetch(
  //         'http://localhost:5000/api/posts/list-all-posts',
  //         { cache: 'no-store' }
  //       );

  //       const data = await res.json();
  //       setPosts(data.posts || []);
  //     } catch (err) {
  //       console.error('Failed to fetch editor updates', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  if (posts.length < 2) return null;

  return (
    <EditorUpdateCardLayout
      featured={posts[0]}
      list={posts.slice(1, 5)}
    />
  );
}