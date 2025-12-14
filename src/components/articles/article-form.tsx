// "use client";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Input } from "../ui/input";
// import { Textarea } from "../ui/textarea";
// import { Button } from "../ui/button";
// import { Label } from "../ui/label";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";

// type FormData = {
//   category: string;
//   title: string;
//   content?: string;
//   pdf?: FileList;
// };

// const sants = ["Tukaram", "Eknath", "Namdev", "Dnyaneshwar"];

// export default function CreateArticleForm() {
//   const { register, handleSubmit, setValue, reset } = useForm<FormData>();
//   const [uploading, setUploading] = useState(false);

//   const onSubmit = async (data: FormData) => {
//     try {
//       setUploading(true);

//       // Prepare JSON payload
//       const payload = {
//         category: data.category,
//         title: data.title,
//         content: data.content || "",
//       };

//       const res = await fetch("/api/articles", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const result = await res.json();
//       console.log(result);

//       if (!res.ok) throw new Error("Failed to upload");
//       alert("Article submitted for review!");
//       reset();
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="max-w-xl mx-auto p-6 bg-white shadow-md shadow-orange-200 rounded-xl space-y-4 mt-5"
//     >
//       <div className="space-y-2 mt-4">
//         <Label className="text-sm font-medium font-sans">Category (Sant)</Label>
//         <Input type="hidden" {...register("category", { required: true })} />
//         <Select onValueChange={(val) => setValue("category", val, { shouldValidate: true })}>
//           <SelectTrigger className="w-full rounded-lg border border-gray-300 bg-white shadow-sm focus:ring-2">
//             <SelectValue placeholder="Select Sant" />
//           </SelectTrigger>
//           <SelectContent className="rounded-lg shadow-lg bg-white">
//             {sants.map((sant) => (
//               <SelectItem key={sant} value={sant} className="hover:bg-gray-100">
//                 {sant}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       <div>
//         <Label className="font-sans mb-2">Title</Label>
//         <Input {...register("title", { required: true })} placeholder="Enter article title" />
//       </div>

//       <div>
//         <Label className="font-sans mb-2">Write Article</Label>
//         <Textarea {...register("content")} placeholder="Write your article here..." className="min-h-[150px]" />
//       </div>

//       <div>
//         <Label className="font-sans mb-2">Or Upload as PDF</Label>
//         <Input type="file" accept=".pdf" {...register("pdf")} />
//       </div>

//       <Button
//         type="submit"
//         disabled={uploading}
//         className="w-full font-sans bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded-lg hover:text-base"
//       >
//         {uploading ? "Submitting..." : "Submit Article"}
//       </Button>
//     </form>
//   );
// }


"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";

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

  const onSubmit = async (data: FormData) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("category", data.category);
      formData.append("title", data.title);
      if (data.content) formData.append("content", data.content);
      if (data.pdf?.[0]) formData.append("pdf", data.pdf[0]);

      const res = await fetch("/api/articles", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to upload");
      alert("लेख पुनरावलोकनासाठी पाठवण्यात आला!");
      reset();
    } catch (err) {
      console.error(err);
      console.log(err);
      alert("काहीतरी चूक झाली.");
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
        <Label className="text-sm font-medium font-sans">विभाग (संत)</Label>

        <Input type="hidden" {...register("category", { required: true })} />

        <Select onValueChange={(val) => setValue("category", val, { shouldValidate: true, shouldDirty: true  })}>
          <SelectTrigger className="w-full rounded-lg border border-gray-300 bg-white shadow-sm focus:ring-2">
            <SelectValue placeholder="संत निवडा" />
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
        <Label className="font-sans">शीर्षक</Label>
        <Input {...register("title", { required: true })} placeholder="लेखाचे शीर्षक लिहा" />
      </div>

      <div>
        <Label className="font-sans">लेख लिहा</Label>
        <Textarea
          {...register("content")}
          placeholder="येथे आपला लेख लिहा..."
          className="min-h-[150px]"
        />
      </div>

      <div>
        <Label className="font-sans">किंवा PDF, images अपलोड करा</Label>
        <Input type="file" accept=".pdf, .jpg, .jpeg, .png" {...register("pdf")} />
      </div>

      <Button
        type="submit"
        disabled={uploading}
        className="w-full font-sans bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded-lg hover:text-base"
      >
        {uploading ? "सबमिट करत आहोत..." : "लेख सबमिट करा"}
      </Button>
    </form>
  );
}