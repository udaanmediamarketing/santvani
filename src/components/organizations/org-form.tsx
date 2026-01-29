"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useAuthFetch } from "../../context/authFetch";
import { Textarea } from "../ui/textarea";
import { useAuth } from "../../context/AuthContext";

type OrgFormData = {
  orgType?: string;
  orgName: string;
  address?: string;
  city: string;
  state: string;
  pincode?: string;
  headName: string;
  email?: string;
  youtubeUrl?: string;
  image?: FileList;
};

const orgTypes = [
  "मठ",
  "आश्रम",
  "सामाजिक संस्था",
  "शैक्षणिक संस्था",
  "धार्मिक संस्था",
];

export default function CreateOrganizationForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<OrgFormData>({
    mode: "onChange",
    defaultValues: {
      orgType: "",
      orgName: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      headName: "",
      email: "",
    },
  });

  const authFetch = useAuthFetch();
  const { token } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [manualType, setManualType] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  /* ---------------- TRANSLATION ---------------- */
  const translateField = async (
    field: keyof OrgFormData,
    value: string,
    lang: string
  ) => {
    if (!value?.trim()) return;

    try {
      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(
          value
        )}`
      );
      const data = await res.json();
      const translated = data[0].map((i: string) => i[0]).join("");
      setValue(field, translated, { shouldValidate: true });
    } catch {
      toast.error("भाषांतर अयशस्वी झाले");
    }
  };

  const TranslateSelect = ({
    onSelect,
  }: {
    onSelect: (lang: string) => void;
  }) => (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-28 text-xs rounded-lg">
        <SelectValue placeholder="भाषा" />
      </SelectTrigger>
      <SelectContent className="rounded-xl bg-white shadow-lg">
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="hi">Hindi</SelectItem>
        <SelectItem value="mr">Marathi</SelectItem>
        <SelectItem value="sa">Sanskrit</SelectItem>
      </SelectContent>
    </Select>
  );

  /* ---------------- SUBMIT ---------------- */
  const onSubmit = async (data: OrgFormData) => {
    if (!token) {
          toast.error("प्रयोगकर्ता प्रमाणित नाही");
          return;
        }
    setUploading(true);
    try {
      const formData = new FormData();

if (data.orgType) formData.append("orgType", data.orgType);
formData.append("orgName", data.orgName);
formData.append("city", data.city);
formData.append("state", data.state);

if (data.pincode) formData.append("pincode", data.pincode);
formData.append("headName", data.headName);
formData.append("email", data?.email || "");

if (data.image && data.image.length > 0) {
  formData.append("image", data.image[0]);
}
 if (data.youtubeUrl) formData.append("youtubeUrl", data.youtubeUrl);

 console.log("ORG DATA:", Object.fromEntries(formData.entries()));
      const res = await authFetch("http://localhost:5000/api/organizations/create-org", {
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

      toast.success("संस्था यशस्वीरित्या जतन झाली");
      reset();
    } catch {
      toast.error("संस्था जतन करता आली नाही");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl bg-white p-8 rounded-2xl space-y-6 shadow-xl"
      >
        <h2 className="text-2xl font-bold text-orange-500 text-center">
          नवीन संस्था जोडा
        </h2>

        {/* ORG TYPE */}
        <div className="space-y-2">
          <Label className="flex justify-between">
            संस्था प्रकार
            <button
              type="button"
              onClick={() => {
                setManualType(!manualType);
                setValue("orgType", "");
              }}
              className="text-orange-500"
            >
              <Plus size={16} />
            </button>
          </Label>

          {manualType ? (
             <div className="flex gap-2">
            <Input
              {...register("orgType")}
              placeholder="संस्था प्रकार लिहा"
            />
            <TranslateSelect
      onSelect={(lang) =>
        translateField("orgType", watch("orgType") || "", lang)
      }
    />
    </div>
          ) : (
            <Controller
              name="orgType"
              control={control}
              render={({ field }) => (
                <Select
  value={field.value}
  onValueChange={field.onChange}
>
  <SelectTrigger>
    <SelectValue placeholder="प्रकार निवडा" />
  </SelectTrigger>

  <SelectContent
    className="rounded-xl bg-white shadow-lg z-50"
  >
    {orgTypes.map((t) => (
      <SelectItem key={t} value={t}>
        {t}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
              )}
            />
          )}
        </div>

        {/* ORG NAME */}
        <div className="space-y-2">
          <Label>संस्थेचे नाव *</Label>
          <div className="flex gap-2">
            <Input
              {...register("orgName", { required: "नाव आवश्यक आहे" })}
              placeholder="संस्थेचे नाव"
            />
            <TranslateSelect
              onSelect={(l) =>
                translateField("orgName", watch("orgName"), l)
              }
            />
          </div>
        </div>

        {/* ADDRESS */}
        <div className="space-y-2">
  <Label>पूर्ण पत्ता</Label>

  <div className="flex gap-2">
    <Textarea
      {...register("address")}
      placeholder="संपूर्ण पत्ता लिहा"
      className="min-h-[60px]"
    />
    <TranslateSelect
      onSelect={(lang) =>
        translateField("address", watch("address") || "", lang)
      }
    />
  </div>
  <Input
    {...register("city")}
    placeholder="शहर / गाव"
  />
  <Input
    {...register("state")}
    placeholder="राज्य / प्रांत"
  />
  <Input
    {...register("pincode")}
    placeholder="पिनकोड (ऐच्छिक)"
  />
</div>

        {/* HEAD */}
        <div className="space-y-2">
          <Label>संस्थेचे प्रमुख</Label>
           <div className="flex items-center gap-2">
    <Input
      {...register("headName")}
      placeholder="प्रमुख नाव"
      className="flex-1"
    />

    <TranslateSelect
      onSelect={(lang) =>
        translateField("headName", watch("headName") || "", lang)
      }
    />
  </div>
        </div>

        {/* CONTACT */}
        <div className="space-y-2">
          <Label>संपर्क (फोन / ईमेल)</Label>
          <Input
            {...register("email")}
            placeholder="फोन किंवा ईमेल"
          />
        </div>

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

        {/* IMAGE */}
        <div className="space-y-2">
          <Label>संस्थेचा फोटो</Label>
          <Input
            type="file"
            accept="image/*"
            {...register("image")}
          />
        </div>

        {/* SUBMIT */}
        <Button
          type="submit"
          disabled={!isValid || uploading}
          className="w-full bg-orange-500 text-white rounded-xl"
        >
          {uploading ? "जतन होत आहे..." : "संस्था जतन करा"}
        </Button>
      </form>
    </div>
  );
}