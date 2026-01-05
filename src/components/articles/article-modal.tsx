"use client";

interface ArticleModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export default function ArticleModal({
  open,
  onClose,
  title,
  content,
}: ArticleModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-[90%] max-w-2xl bg-white border-4 border-[#f97316] rounded-lg shadow-xl p-6">
        <h2 className="text-xl font-serif text-black text-center mb-4">
          {title}
        </h2>

        <div className="text-black text-sm leading-relaxed max-h-[60vh] overflow-y-auto">
          {content}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="bg-[#f97316] text-white px-6 py-2 rounded-md hover:bg-[#f97316]/90 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}