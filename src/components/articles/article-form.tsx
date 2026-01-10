"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { useAuth } from "../../pages/context/AuthContext";
import { toast } from "sonner";

type FormData = {
  category: string;
  title: string;
  content?: string;
  pdf?: FileList;
};

const sants = ["तुकाराम", "एकनाथ", "नामदेव", "ज्ञानेश्वर"];

export default function CreateArticleForm() {
  const { register, handleSubmit, setValue, reset } = useForm<FormData>();
  const [uploading, setUploading] = useState(false);
const [wordCount, setWordCount] = useState(0);
  const { token } = useAuth();
  const MAX_WORDS = 500;
  const onSubmit = async (data: FormData) => {
    try {
      if (!token) {
      throw new Error("User not authenticated");
    }
    const file = data.pdf?.[0];
    if (file && /\s/.test(file.name)) {
      toast.error("फाइल नावात space वापरू नका", {
        description: "कृपया फाइलचे नाव बदलून पुन्हा अपलोड करा (उदा. image-194.png)",
      });
      return;
    }
      setUploading(true);

      const formData = new FormData();
      formData.append("category", data.category);
      formData.append("title", data.title);
      if (data.content) formData.append("content", data.content);
      if (data.pdf?.[0]) formData.append("pdf", data.pdf[0]);

      const res = await fetch("http://localhost:5000/api/posts/create-post", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload");

      toast.success("लेख यशस्वीरित्या पाठवण्यात आला!", {
      description: "आपला लेख पुनरावलोकनासाठी पाठवण्यात आला आहे.",
    });
      reset();
    } catch (err) {
      console.error(err);
       toast.error("काहीतरी चूक झाली", {
      description: "लेख सबमिट करता आला नाही. कृपया पुन्हा प्रयत्न करा.",
    });
    } finally {
      setUploading(false);
    }
  };
  const countWords = (text: string) =>
  text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  return (
    <div className="flex justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          w-full max-w-xl
          bg-white/90 backdrop-blur
          border border-orange-200
          shadow-xl shadow-orange-200/40
          rounded-2xl
          p-8
          space-y-6
          mt-10
          animate-fade-in
        "
      >
        {/* Header */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-orange-500 font-serif">
            नवीन लेख सबमिट करा
          </h2>
          <p className="text-sm text-gray-600">
            संतवाणी ज्ञानकोशासाठी आपला लेख पाठवा
          </p>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">
            संत निवडा
          </Label>

          <Input type="hidden" {...register("category", { required: true })} />

          <Select
            onValueChange={(val) =>
              setValue("category", val, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          >
            <SelectTrigger
              className="
                rounded-xl
                border-gray-300
                focus:ring-2 focus:ring-orange-400
                transition-all
              "
            >
              <SelectValue placeholder="संत निवडा" />
            </SelectTrigger>

            <SelectContent className="rounded-xl shadow-lg bg-white">
              {sants.map((sant) => (
                <SelectItem
                  key={sant}
                  value={sant}
                  className="cursor-pointer hover:bg-orange-50"
                >
                  {sant}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">
            लेखाचे शीर्षक
          </Label>
          <Input
            {...register("title", { required: true })}
            placeholder="लेखाचे शीर्षक लिहा"
            className="
              rounded-xl
              border-gray-300
              focus:ring-2 focus:ring-orange-400
              transition-all
            "
          />
        </div>

        {/* Content */}
<div className="space-y-2">
  <Label className="text-sm font-semibold text-gray-700">
    लेख मजकूर
  </Label>

  <Textarea
    {...register("content")}
    placeholder="येथे आपला लेख लिहा..."
    className="
      min-h-[180px]
      rounded-xl
      border-gray-300
      focus:ring-2 focus:ring-orange-400
      transition-all
    "
    onChange={(e) => {
      const text = e.target.value;
      const words = countWords(text);

      if (words <= MAX_WORDS) {
        setWordCount(words);
        setValue("content", text, { shouldDirty: true });
      }
    }}
  />

  {/* Word Counter */}
  <div className="flex justify-between text-xs">
    <span
      className={`${
        wordCount >= MAX_WORDS ? "text-red-600" : "text-gray-500"
      }`}
    >
      {wordCount} / {MAX_WORDS} शब्द
    </span>

    {wordCount >= MAX_WORDS && (
      <span className="text-red-600">
        कमाल शब्द मर्यादा गाठली आहे
      </span>
    )}
  </div>
</div>

        {/* Upload */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">
            PDF किंवा Image अपलोड करा
          </Label>

          <div
            className="
              border-2 border-dashed border-orange-300
              rounded-xl
              p-4
              text-center
              hover:bg-orange-50
              transition-all
            "
          >
            <Input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              {...register("pdf")}
              className="cursor-pointer"
            />
            <p className="text-xs text-gray-500 mt-2">
              PDF / JPG / PNG समर्थित
            </p>
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={uploading}
          className="
            w-full
            bg-gradient-to-r from-orange-400 to-orange-500
            hover:from-orange-500 hover:to-orange-600
            text-white
            font-semibold
            py-3
            rounded-xl
            transition-all
            transform hover:scale-[1.02]
            disabled:opacity-60
          "
        >
          {uploading ? "सबमिट होत आहे..." : "लेख सबमिट करा"}
        </Button>
      </form>
    </div>
  );
}
