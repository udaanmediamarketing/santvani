// "use client";

// import { useState,useEffect } from "react";
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
// import { useAuth } from "../../pages/context/AuthContext";
// import { toast } from "sonner";

// type FormData = {
//   santname: string;
//   category: string;
//   title: string;
//   content?: string;
//   img?: FileList;
//   youtubeUrl?: string;
// };

// const sants = ["तुकाराम", "एकनाथ", "नामदेव", "ज्ञानेश्वर"];
// const categories = ["किर्तन", "भजन", "श्लोक", "सामुदायिक ध्यान", "सामुदायिक प्रार्थना"];

// export default function CreateArticleForm() {
//   const {
//   register,
//   handleSubmit,
//   setValue,
//   reset,
//   watch,
//   control,
// } = useForm<FormData>({
//   defaultValues: {
//     santname: "",
//     category: "",
//     content: "",
//   },
// });
//   const [uploading, setUploading] = useState(false);
//   const [wordCount, setWordCount] = useState(0);
//   const { token } = useAuth();
//   const [mounted, setMounted] = useState(false);
//   const [translating, setTranslating] = useState(false);
//   const contentValue = watch("content") || "";
//   const santValue = watch("santname");
// const categoryValue = watch("category");

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   const MAX_WORDS = 500;

//   const translateContent = async (lang: string) => {
//     if (!contentValue.trim()) return;

//     setTranslating(true);
//     try {
//       const res = await fetch(
//         `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(
//           contentValue
//         )}`
//       );
//       const data = await res.json();
//       const translatedText = data[0]
//         .map((item: string) => item[0])
//         .join("");

//       // 🔥 Replace textarea content with translated text
//       setValue("content", translatedText, {
//         shouldDirty: true,
//         shouldValidate: true,
//       });
//     } catch {
//       alert("भाषांतर अयशस्वी झाले");
//     } finally {
//       setTranslating(false);
//     }
//   };
//   const onSubmit = async (data: FormData) => {
//     console.log("Sddsdsdsa:")
//     try {
//       if (!token) {
//       throw new Error("User not authenticated");
//     }
//     const file = data.img?.[0];
//     if (file && /\s/.test(file.name)) {
//       toast.error("फाइल नावात space वापरू नका", {
//         description: "कृपया फाइलचे नाव बदलून पुन्हा अपलोड करा (उदा. image-194.png)",
//       });
//       return;
//     }
//       setUploading(true);

//       const formData = new FormData();
//       formData.append("santname", data.santname);
//       formData.append("category", data.category);
//       formData.append("title", data.title);
//       if (data.content) formData.append("content", data.content);
//       if (data.img?.[0]) formData.append("img", data.img[0]);
//       if (data.youtubeUrl) {
//   formData.append("youtubeUrl", data.youtubeUrl);
// }
//       console.log("Submitting form with data:")
//       const res = await fetch("http://localhost:5000/api/posts/create-post", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });
//       console.log("Response:", res);
//       if (!res.ok) throw new Error("Failed to upload");

//       toast.success("लेख यशस्वीरित्या पाठवण्यात आला!", {
//       description: "आपला लेख पुनरावलोकनासाठी पाठवण्यात आला आहे.",
//     });
//       reset();
//     } catch (err) {
//       console.error(err);
//        toast.error("काहीतरी चूक झाली", {
//       description: "लेख सबमिट करता आला नाही. कृपया पुन्हा प्रयत्न करा.",
//     });
//     } finally {
//       setUploading(false);
//     }
//   };
//   const countWords = (text: string) =>
//   text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

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

//         {/* Santname */}
//         <div className="space-y-2">
//           <Label className="text-sm font-semibold text-gray-700">
//             संत निवडा
//           </Label>

//           <Input type="hidden" {...register("santname", { required: true })} />

//           <Select
//   value={santValue}
//   onValueChange={(val) =>
//     setValue("santname", val, {
//       shouldValidate: true,
//       shouldDirty: true,
//     })
//   }
// >
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

//          <div className="space-y-2">
//           <Label className="text-sm font-semibold text-gray-700">
//             विभाग
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
//               <SelectValue placeholder="विभाग" />
//             </SelectTrigger>

//             <SelectContent className="rounded-xl shadow-lg bg-white">
//               {categories.map((category) => (
//                 <SelectItem
//                   key={category}
//                   value={category}
//                   className="cursor-pointer hover:bg-orange-50"
//                 >
//                   {category}
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
// <div className="space-y-2">
//   <Label className="text-sm font-semibold text-gray-700">
//     लेख मजकूर
//   </Label>

//   <Textarea
//     value={contentValue} 
//     placeholder="येथे आपला लेख लिहा..."
//     className="
//       min-h-[180px]
//       rounded-xl
//       border-gray-300
//       focus:ring-2 focus:ring-orange-400
//       transition-all
//     "
//     onChange={(e) => {
//       const text = e.target.value;
//       const words = countWords(text);

//       if (words <= MAX_WORDS) {
//         setWordCount(words);
//         setValue("content", text, { shouldDirty: true });
//       }
//     }}
//   />

//   {/* Word Counter */}
//   <div className="flex justify-between text-xs">
//     <span
//       className={`${
//         wordCount >= MAX_WORDS ? "text-red-600" : "text-gray-500"
//       }`}
//     >
//       {wordCount} / {MAX_WORDS} शब्द
//     </span>

//     {wordCount >= MAX_WORDS && (
//       <span className="text-red-600">
//         कमाल शब्द मर्यादा गाठली आहे
//       </span>
//     )}
//   </div>
//   {/* 🔽 Language Dropdown (NEW) */}
//           <Select onValueChange={translateContent}>
//             <SelectTrigger className="mt-2 rounded-xl border-gray-300">
//               <SelectValue
//                 placeholder={
//                   translating ? "भाषांतर होत आहे..." : "भाषा बदला"
//                 }
//               />
//             </SelectTrigger>

//             <SelectContent className="rounded-xl bg-white shadow-lg">
//               <SelectItem value="en">English</SelectItem>
//               <SelectItem value="hi">Hindi</SelectItem>
//               <SelectItem value="mr">Marathi</SelectItem>
//               <SelectItem value="sa">Sanskrit</SelectItem>
//             </SelectContent>
//           </Select>
// </div>

// {/* YT Link */}
// <div className="space-y-2">
//   <Label className="text-sm font-semibold text-gray-700">
//     YouTube व्हिडिओ लिंक (ऐच्छिक)
//   </Label>

//   <Input
//     type="url"
//     placeholder="https://www.youtube.com/watch?v=XXXX"
//     {...register("youtubeUrl", {
//       pattern: {
//         value:
//           /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
//         message: "वैध YouTube लिंक द्या",
//       },
//     })}
//     className="
//       rounded-xl
//       border-gray-300
//       focus:ring-2 focus:ring-orange-400
//       transition-all
//     "
//   />

//   <p className="text-xs text-gray-500">
//     YouTube व्हिडिओ असल्यास लिंक पेस्ट करा
//   </p>
// </div>
   
//         {/* Upload */}
//         <div className="space-y-2">
//           <Label className="text-sm font-semibold text-gray-700">
//             Image अपलोड करा
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
//               accept=".jpg,.jpeg,.png"
//               {...register("img")}
//               className="cursor-pointer"
//             />
//             <p className="text-xs text-gray-500 mt-2">
//               JPG / PNG समर्थित
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

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
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
  santname?: string;
  category?: string;
  title: string;
  content?: string;
  img?: FileList;
  youtubeUrl?: string;
};

const sants = ["तुकाराम", "एकनाथ", "नामदेव", "ज्ञानेश्वर"];
const categories = ["किर्तन", "भजन", "श्लोक", "सामुदायिक ध्यान", "सामुदायिक प्रार्थना"];

export default function CreateArticleForm() {
  const {
  register,
  handleSubmit,
  control,
  reset,
  watch,
  formState: { errors, isValid },
} = useForm<FormData>({
  mode: "onChange",
  defaultValues: {
    santname: "",
    category: "",
    title: "",
    content: "",
    youtubeUrl: "",
  },
});

// Update FormData type - make everything optional except title

  const [uploading, setUploading] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [translating, setTranslating] = useState(false);
  
  const { token } = useAuth();
  const contentValue = watch("content") || "";
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const MAX_WORDS = 500;

  const countWords = (text: string) =>
    text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

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
        .map((item: string) => item[0])
        .join("");

      // Update via trigger for proper validation
      const words = countWords(translatedText);
      if (words <= MAX_WORDS) {
        reset({ ...watch(), content: translatedText });
        setWordCount(words);
      }
    } catch {
      toast.error("भाषांतर अयशस्वी झाले");
    } finally {
      setTranslating(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    console.log("Form submitted:", data);
    
    if (!token) {
      toast.error("प्रयोगकर्ता प्रमाणित नाही");
      return;
    }

    const file = data.img?.[0];
    if (file && /\s/.test(file.name)) {
      toast.error("फाइल नावात space वापरू नका", {
        description: "कृपया फाइलचे नाव बदलून पुन्हा अपलोड करा (उदा. image-194.png)",
      });
      return;
    }

    setUploading(true);

    try {
  const formData = new FormData();
  
  // Required field (title) - safe because it's validated
  formData.append("title", data.title);
  
  // Optional fields - only append if they exist and have value
  if (data.santname) formData.append("santname", data.santname);
  if (data.category) formData.append("category", data.category);
  if (data.content) formData.append("content", data.content);
  if (data.youtubeUrl) formData.append("youtubeUrl", data.youtubeUrl);
  if (data.img?.[0]) formData.append("img", data.img[0]);

  const res = await fetch("http://localhost:5000/api/posts/create-post", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    try {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to upload");
    } catch {
      throw new Error("Failed to upload");
    }
  }

  toast.success("लेख यशस्वीरित्या पाठवण्यात आला!", {
    description: "आपला लेख पुनरावलोकनासाठी पाठवण्यात आला आहे.",
  });
  reset();
  setWordCount(0);
} catch (err: unknown) {
  console.error(err);
  let errorMessage = "काहीतरी चूक झाले";
  if (err instanceof Error) {
    errorMessage = err.message;
  }
  toast.error(errorMessage, {
    description: "लेख सबमिट करता आला नाही. कृपया पुन्हा प्रयत्न करा.",
  });
} finally {
  setUploading(false);
}
  };

  return (
    <div className="flex justify-center px-4 py-8">
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

        {/* Sant Name */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">संत निवडा *</Label>
          <Controller
            name="santname"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="rounded-xl border-gray-300 focus:ring-2 focus:ring-orange-400 transition-all">
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
            )}
          />
          {errors.santname && (
            <p className="text-xs text-red-600 mt-1">{errors.santname.message}</p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">विभाग *</Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="rounded-xl border-gray-300 focus:ring-2 focus:ring-orange-400 transition-all">
                  <SelectValue placeholder="विभाग निवडा" />
                </SelectTrigger>
                <SelectContent className="rounded-xl shadow-lg bg-white">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && (
            <p className="text-xs text-red-600 mt-1">{errors.category.message}</p>
          )}
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">लेखाचे शीर्षक *</Label>
          <Input
            {...register("title", {
              required: "शीर्षक आवश्यक आहे",
            })}
            placeholder="लेखाचे शीर्षक लिहा"
            className="rounded-xl border-gray-300 focus:ring-2 focus:ring-orange-400 transition-all"
          />
          {errors.title && (
            <p className="text-xs text-red-600 mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">लेख मजकूर *</Label>
          <Textarea
            {...register("content", {
              required: "मजकूर आवश्यक आहे",
              maxLength: {
                value: MAX_WORDS * 6, // Rough char limit
                message: `कमाल ${MAX_WORDS} शब्द मर्यादा`,
              },
              onChange: (e) => {
                const words = countWords(e.target.value);
                setWordCount(words);
              },
            })}
            placeholder="येथे आपला लेख लिहा..."
            className="min-h-[180px] rounded-xl border-gray-300 focus:ring-2 focus:ring-orange-400 transition-all"
          />
          
          {/* Word Counter & Translate */}
          <div className="flex flex-col sm:flex-row justify-between gap-2 text-xs">
            <span
              className={`${
                wordCount >= MAX_WORDS ? "text-red-600" : "text-gray-500"
              }`}
            >
              {wordCount} / {MAX_WORDS} शब्द
            </span>
            <Controller
              name="content"
              control={control}
              render={() => (
                <Select onValueChange={translateContent} disabled={translating}>
                  <SelectTrigger className="w-full sm:w-32 rounded-xl border-gray-300 text-xs">
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
              )}
            />
          </div>
          {errors.content && (
            <p className="text-xs text-red-600">{errors.content.message}</p>
          )}
        </div>

        {/* YouTube Link */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">
            YouTube व्हिडिओ लिंक (ऐच्छिक)
          </Label>
          <Input
            type="url"
            placeholder="https://www.youtube.com/watch?v=XXXX"
            {...register("youtubeUrl", {
              pattern: {
                value: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
                message: "वैध YouTube लिंक द्या",
              },
            })}
            className="rounded-xl border-gray-300 focus:ring-2 focus:ring-orange-400 transition-all"
          />
          {errors.youtubeUrl && (
            <p className="text-xs text-red-600">{errors.youtubeUrl.message}</p>
          )}
          <p className="text-xs text-gray-500">YouTube व्हिडिओ असल्यास लिंक पेस्ट करा</p>
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">Image अपलोड करा</Label>
          <div className="border-2 border-dashed border-orange-300 rounded-xl p-4 text-center hover:bg-orange-50 transition-all">
            <Input
              type="file"
              accept=".jpg,.jpeg,.png"
              {...register("img")}
              className="cursor-pointer"
            />
            <p className="text-xs text-gray-500 mt-2">JPG / PNG समर्थित</p>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={uploading || !isValid || wordCount > MAX_WORDS}
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
            disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {uploading ? "सबमिट होत आहे..." : "लेख सबमिट करा"}
        </Button>
      </form>
    </div>
  );
}