"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

type FormData = {
  category: string;
  title: string;
  content?: string;
  pdf?: FileList;
};

const sants = ["Tukaram", "Eknath", "Namdev", "Dnyaneshwar"];

export default function CreateArticleForm() {
  const { register, handleSubmit, setValue, reset } = useForm<FormData>();
  const [uploading, setUploading] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      setUploading(true);

      // Prepare JSON payload
      const payload = {
        category: data.category,
        title: data.title,
        content: data.content || "",
      };

      const res = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      console.log(result);

      if (!res.ok) throw new Error("Failed to upload");
      alert("Article submitted for review!");
      reset();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-6 bg-white shadow-md shadow-orange-200 rounded-xl space-y-4 mt-5"
    >
      <div className="space-y-2 mt-4">
        <Label className="text-sm font-medium font-sans">Category (Sant)</Label>
        <Input type="hidden" {...register("category", { required: true })} />
        <Select onValueChange={(val) => setValue("category", val, { shouldValidate: true })}>
          <SelectTrigger className="w-full rounded-lg border border-gray-300 bg-white shadow-sm focus:ring-2">
            <SelectValue placeholder="Select Sant" />
          </SelectTrigger>
          <SelectContent className="rounded-lg shadow-lg bg-white">
            {sants.map((sant) => (
              <SelectItem key={sant} value={sant} className="hover:bg-gray-100">
                {sant}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="font-sans">Title</Label>
        <Input {...register("title", { required: true })} placeholder="Enter article title" />
      </div>

      <div>
        <Label className="font-sans">Write Article</Label>
        <Textarea {...register("content")} placeholder="Write your article here..." className="min-h-[150px]" />
      </div>

      <div>
        <Label className="font-sans">Or Upload as PDF</Label>
        <Input type="file" accept=".pdf" {...register("pdf")} />
      </div>

      <Button
        type="submit"
        disabled={uploading}
        className="w-full font-sans bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded-lg hover:text-base"
      >
        {uploading ? "Submitting..." : "Submit Article"}
      </Button>
    </form>
  );
}