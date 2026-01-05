// ----- san code below one

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

// const sants = ["तुकाराम", "एकनाथ", "नामदेव", "ज्ञानेश्वर"];

// export default function CreateArticleForm() {
//   const { register, handleSubmit, setValue, reset } = useForm<FormData>();
//   const [uploading, setUploading] = useState(false);

//   const onSubmit = async (data: FormData) => {
//     try {
//       setUploading(true);
//       const formData = new FormData();
//       formData.append("category", data.category);
//       formData.append("title", data.title);
//       if (data.content) formData.append("content", data.content);
//       if (data.pdf?.[0]) formData.append("pdf", data.pdf[0]);

//       const res = await fetch("/api/articles", {
//         method: "POST",
//         body: formData,
//       });
//       if (!res.ok) throw new Error("Failed to upload");
//       alert("लेख पुनरावलोकनासाठी पाठवण्यात आला!");
//       reset();
//     } catch (err) {
//       console.error(err);
//       console.log(err);
//       alert("काहीतरी चूक झाली.");
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
//         <Label className="text-sm font-medium font-sans">विभाग (संत)</Label>

//         <Input type="hidden" {...register("category", { required: true })} />

//         <Select onValueChange={(val) => setValue("category", val, { shouldValidate: true, shouldDirty: true  })}>
//           <SelectTrigger className="w-full rounded-lg border border-gray-300 bg-white shadow-sm focus:ring-2">
//             <SelectValue placeholder="संत निवडा" />
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
//         <Label className="font-sans">शीर्षक</Label>
//         <Input {...register("title", { required: true })} placeholder="लेखाचे शीर्षक लिहा" />
//       </div>

//       <div>
//         <Label className="font-sans">लेख लिहा</Label>
//         <Textarea
//           {...register("content")}
//           placeholder="येथे आपला लेख लिहा..."
//           className="min-h-[150px]"
//         />
//       </div>

//       <div>
//         <Label className="font-sans">किंवा PDF, images अपलोड करा</Label>
//         <Input type="file" accept=".pdf, .jpg, .jpeg, .png" {...register("pdf")} />
//       </div>

//       <Button
//         type="submit"
//         disabled={uploading}
//         className="w-full font-sans bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded-lg hover:text-base"
//       >
//         {uploading ? "सबमिट करत आहोत..." : "लेख सबमिट करा"}
//       </Button>
//     </form>
//   );
// }


//below is running original code

// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Input } from "../ui/input";
// import { Textarea } from "../ui/textarea";
// import { Button } from "../ui/button";
// import { Label } from "../ui/label";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "../ui/select";

// type FormData = {
//   category: string;
//   title: string;
//   content?: string;
//   pdf?: FileList;
// };

// const sants = ["तुकाराम", "एकनाथ", "नामदेव", "ज्ञानेश्वर"];

// export default function CreateArticleForm() {
//   const { register, handleSubmit, setValue, reset } = useForm<FormData>();
//   const [uploading, setUploading] = useState(false);

//   const onSubmit = async (data: FormData) => {
//     try {
//       setUploading(true);

//       const formData = new FormData();
//       formData.append("category", data.category);
//       formData.append("title", data.title);
//       if (data.content) formData.append("content", data.content);
//       if (data.pdf?.[0]) formData.append("pdf", data.pdf[0]);

//       const res = await fetch("/api/articles", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Failed to upload");

//       alert("लेख पुनरावलोकनासाठी पाठवण्यात आला!");
//       reset();
//     } catch (err) {
//       console.error(err);
//       alert("काहीतरी चूक झाली.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center px-4">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="
//           w-full max-w-xl
//           bg-white/90 backdrop-blur
//           border border-orange-200
//           shadow-xl shadow-orange-200/40
//           rounded-2xl
//           p-8
//           space-y-6
//           mt-10
//           animate-fade-in
//         "
//       >
//         {/* Header */}
//         <div className="text-center space-y-1">
//           <h2 className="text-2xl font-bold text-orange-500 font-serif">
//             नवीन लेख सबमिट करा
//           </h2>
//           <p className="text-sm text-gray-600">
//             संतवाणी ज्ञानकोशासाठी आपला लेख पाठवा
//           </p>
//         </div>

//         {/* Category */}
//         <div className="space-y-2">
//           <Label className="text-sm font-semibold text-gray-700">
//             संत निवडा
//           </Label>

//           <Input type="hidden" {...register("category", { required: true })} />

//           <Select
//             onValueChange={(val) =>
//               setValue("category", val, {
//                 shouldValidate: true,
//                 shouldDirty: true,
//               })
//             }
//           >
//             <SelectTrigger
//               className="
//                 rounded-xl
//                 border-gray-300
//                 focus:ring-2 focus:ring-orange-400
//                 transition-all
//               "
//             >
//               <SelectValue placeholder="संत निवडा" />
//             </SelectTrigger>

//             <SelectContent className="rounded-xl shadow-lg bg-white">
//               {sants.map((sant) => (
//                 <SelectItem
//                   key={sant}
//                   value={sant}
//                   className="cursor-pointer hover:bg-orange-50"
//                 >
//                   {sant}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Title */}
//         <div className="space-y-2">
//           <Label className="text-sm font-semibold text-gray-700">
//             लेखाचे शीर्षक
//           </Label>
//           <Input
//             {...register("title", { required: true })}
//             placeholder="लेखाचे शीर्षक लिहा"
//             className="
//               rounded-xl
//               border-gray-300
//               focus:ring-2 focus:ring-orange-400
//               transition-all
//             "
//           />
//         </div>

//         {/* Content */}
//         <div className="space-y-2">
//           <Label className="text-sm font-semibold text-gray-700">
//             लेख मजकूर
//           </Label>
//           <Textarea
//             {...register("content")}
//             placeholder="येथे आपला लेख लिहा..."
//             className="
//               min-h-[180px]
//               rounded-xl
//               border-gray-300
//               focus:ring-2 focus:ring-orange-400
//               transition-all
//             "
//           />
//         </div>

//         {/* Upload */}
//         <div className="space-y-2">
//           <Label className="text-sm font-semibold text-gray-700">
//             PDF किंवा Image अपलोड करा
//           </Label>

//           <div
//             className="
//               border-2 border-dashed border-orange-300
//               rounded-xl
//               p-4
//               text-center
//               hover:bg-orange-50
//               transition-all
//             "
//           >
//             <Input
//               type="file"
//               accept=".pdf,.jpg,.jpeg,.png"
//               {...register("pdf")}
//               className="cursor-pointer"
//             />
//             <p className="text-xs text-gray-500 mt-2">
//               PDF / JPG / PNG समर्थित
//             </p>
//           </div>
//         </div>

//         {/* Submit */}
//         <Button
//           type="submit"
//           disabled={uploading}
//           className="
//             w-full
//             bg-gradient-to-r from-orange-400 to-orange-500
//             hover:from-orange-500 hover:to-orange-600
//             text-white
//             font-semibold
//             py-3
//             rounded-xl
//             transition-all
//             transform hover:scale-[1.02]
//             disabled:opacity-60
//           "
//         >
//           {uploading ? "सबमिट होत आहे..." : "लेख सबमिट करा"}
//         </Button>
//       </form>
//     </div>
//   );
// }



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

type FormData = {
  category: string;
  title: string;
  content?: string;
  pdf?: FileList;
};

const sants = ["तुकाराम", "एकनाथ", "नामदेव", "ज्ञानेश्वर"];

export default function CreateArticleForm() {
  const { register, handleSubmit, setValue, reset, watch } =
    useForm<FormData>();
  const [uploading, setUploading] = useState(false);
  const [translating, setTranslating] = useState(false);

  const contentValue = watch("content") || "";

  const translateContent = async (lang: string) => {
    if (!contentValue.trim()) return;

    setTranslating(true);
    try {
      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(
          contentValue
        )}`
      );
      const data = await res.json();
      const translatedText = data[0]
        .map((item: any) => item[0])
        .join("");

      // 🔥 Replace textarea content with translated text
      setValue("content", translatedText, {
        shouldDirty: true,
        shouldValidate: true,
      });
    } catch {
      alert("भाषांतर अयशस्वी झाले");
    } finally {
      setTranslating(false);
    }
  };

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
      alert("काहीतरी चूक झाली.");
    } finally {
      setUploading(false);
    }
  };

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
            <SelectTrigger className="rounded-xl border-gray-300">
              <SelectValue placeholder="संत निवडा" />
            </SelectTrigger>

            <SelectContent className="rounded-xl shadow-lg bg-white">
              {sants.map((sant) => (
                <SelectItem key={sant} value={sant}>
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
            className="rounded-xl border-gray-300"
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
            className="min-h-[180px] rounded-xl border-gray-300"
          />

          {/* 🔽 Language Dropdown (NEW) */}
          <Select onValueChange={translateContent}>
            <SelectTrigger className="mt-2 rounded-xl border-gray-300">
              <SelectValue
                placeholder={
                  translating ? "भाषांतर होत आहे..." : "भाषा बदला"
                }
              />
            </SelectTrigger>

            <SelectContent className="rounded-xl bg-white shadow-lg">
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">Hindi</SelectItem>
              <SelectItem value="mr">Marathi</SelectItem>
              <SelectItem value="sa">Sanskrit</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Upload */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">
            PDF किंवा Image अपलोड करा
          </Label>

          <div className="border-2 border-dashed border-orange-300 rounded-xl p-4 text-center">
            <Input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              {...register("pdf")}
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
            text-white
            font-semibold
            py-3
            rounded-xl
          "
        >
          {uploading ? "सबमिट होत आहे..." : "लेख सबमिट करा"}
        </Button>
      </form>
    </div>
  );
}
