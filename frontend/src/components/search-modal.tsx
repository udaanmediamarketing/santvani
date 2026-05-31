'use client';

import Link from 'next/link';
import { Post } from '../types/post';
import Image from 'next/image';
import { Calendar, X } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  results: Post[];
  isLoading?: boolean;
}

export default function SearchModal({
  isOpen,
  onClose,
  query,
  results,
  isLoading = false,
}: SearchModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-[90%] max-w-3xl bg-white rounded-lg shadow-2xl z-50 max-h-[70vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            सर्च परिणाम: <span className="text-orange-600">"{query}"</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-orange-600" />
              <p className="mt-2 text-gray-600">शोधत आहे...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                "{query}" साठी कोणतेही परिणाम मिळाले नाहीत
              </p>
              <p className="text-gray-500 text-sm mt-2">
                वेगळे शब्द वापरून पुन्हा प्रयत्न करा
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                {results.length} परिणाम मिळाले
              </p>

              {results.map((post) => (
                <Link key={post.id} href={`/${post.slug || post.id}`}>
                  <div className="flex gap-4 p-4 rounded-lg border border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 cursor-pointer group">
                    {/* Thumbnail */}
                    <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded bg-gray-100 group-hover:scale-105 transition-transform">
                      {post.image_url ? (
                        <Image
                          src={post.image_url}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="100px"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-orange-200 to-orange-100 flex items-center justify-center">
                          <span className="text-xs text-orange-600 font-semibold">
                            No Image
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Category */}
                      {post.category && (
                        <span className="inline-block bg-orange-600 text-white text-xs font-semibold px-2 py-0.5 rounded mb-2">
                          {post.category}
                        </span>
                      )}

                      {/* Title */}
                      <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 group-hover:text-orange-600 transition">
                        {post.title}
                      </h3>

                      {/* Content Preview */}
                      {post.content && (
                        <p className="text-gray-600 text-xs line-clamp-2 mt-1">
                          {post.content}
                        </p>
                      )}

                      {/* Date */}
                      {post.created_at && (
                        <div className="flex items-center gap-1 text-gray-500 text-xs mt-2">
                          <Calendar size={12} />
                          <span>
                            {new Date(post.created_at).toLocaleDateString('mr-IN', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
