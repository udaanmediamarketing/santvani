import { GetServerSideProps } from "next";
import Image from "next/image";

interface GalleryPost {
  id: string;
  title: string;
  image_url?: string;
  youtube_url?: string;
}

function getYoutubeEmbedUrl(url: string) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function GalleryPage({ posts }: { posts: GalleryPost[] }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-orange-600 mb-8">
        गॅलरी
      </h1>

      {posts.length === 0 ? (
        <p className="text-gray-500">गॅलरीमध्ये काही उपलब्ध नाही</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const embedUrl = post.youtube_url
              ? getYoutubeEmbedUrl(post.youtube_url)
              : null;

            return (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                {post.image_url ? (
                  <div className="relative aspect-video">
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : embedUrl ? (
                  <iframe
                    src={embedUrl}
                    className="w-full aspect-video"
                    allowFullScreen
                  />
                ) : null}

                <div className="p-4">
                  <h3 className="font-semibold text-orange-700">
                    {post.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:5000/api/posts/gallery");

  if (!res.ok) {
    return { props: { posts: [] } };
  }

  const data = await res.json();

  return {
    props: {
      posts: data.posts || [],
    },
  };
};
