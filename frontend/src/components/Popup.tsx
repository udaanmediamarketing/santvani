import React from "react";

interface PopupProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

export default function Popup({ message, show, onClose }: PopupProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center">
        <h2 className="text-lg font-semibold mb-3">{message}</h2>
        <button
          className="mt-4 bg-orange-600 text-white px-4 py-2 rounded-lg w-full"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
}
