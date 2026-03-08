"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X, Search, ChevronDown, Check } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { privateAxios } from "@/components/axiosInstance/axios";
import { fetchCategoris } from "../../categories/CategoriesTable";
import toast, { Toaster } from "react-hot-toast";
import { SeriesSearchSelect } from "./SeriesSearchSelect";
const GENRE_OPTIONS = [
  "comedy",
  "drama",
  "action",
  "horror",
  "romance",
  "sci_fi",
  "thriller",
  "mystery",
];



type Inputs = {
  title: string;
  genres: string[];
  description: string;
  contentCategory: string;
  contentType: string;
  series_id: string;
  season_number: number | "";
  episode_number: number | "";
  is_premium: boolean;
  file: File | null;
  thumbnailImg: File | null;
};



// ─── Main Form ───────────────────────────────────────────────────────────────
export function EpisodesUploadForm() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: "",
      genres: [],
      description: "",
      contentCategory: "",
      contentType: "episode",
      series_id: "",
      season_number: "",
      episode_number: "",
      is_premium: false,
      file: null,
      thumbnailImg: null,
    },
  });

  const contentCategory = watch("contentCategory");
  const contentType = watch("contentType");
  const isPremium = watch("is_premium");
  const thumbnail = watch("thumbnailImg");
  const vidFile = watch("file");
  const seriesId = watch("series_id");

  const toggleGenre = (genre: string) => {
    const updated = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];
    setSelectedGenres(updated);
    setValue("genres", updated, { shouldValidate: true, shouldDirty: true });
  };

  const uploadContent = useMutation({
    mutationFn: async (data: Inputs) => {
      try {
        const formData = new FormData();

        if (data.file) formData.append("file", data.file);
        if (data.thumbnailImg) formData.append("thumbnail", data.thumbnailImg);

        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("genre", data.genres.join(", "));
        formData.append("category_id", data.contentCategory);
        formData.append("content_type", data.contentType);
        formData.append("series_id", data.series_id);
        formData.append("season_number", String(data.season_number));
        formData.append("episode_number", String(data.episode_number));
        formData.append("is_premium", String(data.is_premium));

        const response = await privateAxios.post(`/uploads/video`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (!response.data.success) {
          const msg = response.data.message || "Error uploading";
          toast.error(msg);
          throw new Error(msg);
        }

        return response.data;
      } catch (error: any) {
        throw new Error(error?.response?.data?.message || "Something went wrong!");
      }
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    uploadContent.mutate(data, {
      onSuccess: () => toast.success("Episode Uploaded Successfully!"),
      onError: (err: Error) => toast.error(err.message || "Failed to upload"),
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) setValue("thumbnailImg", file, { shouldValidate: true, shouldDirty: true });
  };

  const handleFilePick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue("thumbnailImg", e.target.files?.[0] ?? null, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleVideoPick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue("file", e.target.files?.[0] ?? null, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const { data: categoriesList } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategoris,
  });

  return (
    <div>
      <Toaster />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8"
      >
        {/* ── Upload Area ── */}
        <div className="overflow-hidden h-76 md:h-[340px] lg:h-full">
          <div
            className={`border border-dashed flex flex-col items-center justify-between h-full rounded-lg p-8 text-center transition-colors bg-[#131824] ${
              dragActive
                ? "border-purple-500 bg-purple-500/10"
                : "border-slate-700 hover:border-slate-600"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="h-40" />
            <div className="flex flex-col items-center space-y-4">
              <div className="flex md:w-[134px] md:h-[134px] justify-center items-center bg-[#0D121E] p-[35px] rounded-full">
                <Upload className="w-12 h-12 text-slate-400" />
              </div>
              <div className="space-y-2">
                <p className="text-slate-300 font-medium">Drag and drop video files to upload</p>
                <p className="text-[#A5A5AB] text-sm">
                  Your videos will be private until <br /> you publish them.
                </p>
              </div>
              <label className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded cursor-pointer">
                Select files
                <input type="file" accept="video/*" onChange={handleVideoPick} className="hidden" />
              </label>
              {vidFile && (
                <p className="text-xs text-slate-400">
                  Selected: <span className="text-slate-200">{vidFile.name}</span>
                </p>
              )}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mt-8">
              By submitting your videos to streaming app, you acknowledge that you agree to streaming{" "}
              <span className="text-purple-400 underline cursor-pointer">Terms of Service</span> and{" "}
              <span className="text-purple-400 underline cursor-pointer">Community Guidelines</span>.
            </p>
          </div>
        </div>

        {/* ── Form Fields ── */}
        <div className="space-y-5 md:col-span-2">

          {/* Row 1: Title + Content Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-base font-medium text-slate-300 block">Title</label>
              <Input
                placeholder="Type your episode name"
                className="bg-[#131824] border-[#1B202C] rounded text-slate-100 placeholder:text-slate-500"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-base font-medium text-slate-300 block">Content Type</label>
              <Select
                value={contentType}
                onValueChange={(val) =>
                  setValue("contentType", val, { shouldValidate: true, shouldDirty: true })
                }
              >
                <SelectTrigger className="bg-[#131824] border-[#1B202C] rounded text-slate-100 w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-[#131824] border-slate-700 text-white">
                  <SelectItem value="episode">Episode</SelectItem>
                  {/* <SelectItem value="series">Series</SelectItem>
                  <SelectItem value="movie">Movie</SelectItem>
                  <SelectItem value="documentary">Documentary</SelectItem>
                  <SelectItem value="short">Short</SelectItem> */}
                </SelectContent>
              </Select>
              <input type="hidden" {...register("contentType", { required: true })} value={contentType} readOnly />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-base font-medium text-slate-300">Description</label>
            <Textarea
              placeholder="Enter a short description"
              className="h-[90px] rounded border border-[#1B202C] bg-[#131824] px-4 py-3 text-slate-100 placeholder:text-slate-500 resize-none"
              {...register("description", {
                required: "Description is required",
                minLength: { value: 10, message: "Min 10 characters" },
              })}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Genre Pills */}
          <div className="space-y-2">
            <label className="text-base font-medium text-slate-300 block">Genre</label>
            <div className="flex flex-wrap gap-2">
              {GENRE_OPTIONS.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => toggleGenre(genre)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border transition-colors capitalize ${
                    selectedGenres.includes(genre)
                      ? "bg-purple-600 border-purple-600 text-white"
                      : "bg-[#131824] border-[#1B202C] text-slate-400 hover:border-slate-500"
                  }`}
                >
                  {selectedGenres.includes(genre) && <X className="w-3 h-3" />}
                  {genre.replace("_", " ")}
                </button>
              ))}
            </div>
            <input
              type="hidden"
              {...register("genres", {
                validate: (v) => v.length > 0 || "Select at least one genre",
              })}
            />
            {errors.genres && (
              <p className="text-sm text-red-500">{errors.genres.message as string}</p>
            )}
          </div>

          {/* Row: Category + Is Premium */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-base font-medium text-slate-300 block">Content Category</label>
              <Select
                value={contentCategory}
                onValueChange={(val) =>
                  setValue("contentCategory", val, { shouldValidate: true, shouldDirty: true })
                }
              >
                <SelectTrigger className="bg-[#131824] border-[#1B202C] rounded text-slate-100 w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-[#131824] border-slate-700 text-white">
                  {categoriesList?.data?.map((cat: any) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input
                type="hidden"
                {...register("contentCategory", { required: "Category is required" })}
                value={contentCategory}
                readOnly
              />
              {errors.contentCategory && (
                <p className="text-sm text-red-500">{errors.contentCategory.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-base font-medium text-slate-300 block">Is Premium</label>
              <div
                className="flex items-center gap-3 h-10 cursor-pointer"
                onClick={() =>
                  setValue("is_premium", !isPremium, { shouldValidate: true, shouldDirty: true })
                }
              >
                <div
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    isPremium ? "bg-purple-600" : "bg-slate-700"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                      isPremium ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </div>
                <span className="text-slate-400 text-sm">{isPremium ? "Yes" : "No"}</span>
              </div>
              <input type="hidden" {...register("is_premium")} value={String(isPremium)} readOnly />
            </div>
          </div>

          {/* Series Search-Select */}
          <div className="space-y-2">
            <label className="text-base font-medium text-slate-300 block">Series</label>
            <SeriesSearchSelect
              value={seriesId}
              onChange={(id) =>
                setValue("series_id", id, { shouldValidate: true, shouldDirty: true })
              }
              error={errors.series_id?.message}
            />
            <input
              type="hidden"
              {...register("series_id", { required: "Series is required" })}
              value={seriesId}
              readOnly
            />
          </div>

          {/* Season + Episode Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-base font-medium text-slate-300 block">Season Number</label>
              <Input
                type="number"
                min={1}
                placeholder="e.g. 1"
                className="bg-[#131824] border-[#1B202C] rounded text-slate-100 placeholder:text-slate-500"
                {...register("season_number", {
                  required: "Season number is required",
                  min: { value: 1, message: "Must be at least 1" },
                  valueAsNumber: true,
                })}
              />
              {errors.season_number && (
                <p className="text-sm text-red-500">{errors.season_number.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-base font-medium text-slate-300 block">Episode Number</label>
              <Input
                type="number"
                min={1}
                placeholder="e.g. 1"
                className="bg-[#131824] border-[#1B202C] rounded text-slate-100 placeholder:text-slate-500"
                {...register("episode_number", {
                  required: "Episode number is required",
                  min: { value: 1, message: "Must be at least 1" },
                  valueAsNumber: true,
                })}
              />
              {errors.episode_number && (
                <p className="text-sm text-red-500">{errors.episode_number.message}</p>
              )}
            </div>
          </div>

          {/* Thumbnail */}
          <div className="space-y-2">
            <label className="text-base font-medium text-slate-300 block">Thumbnail Image</label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={handleFilePick}
              />
              <div className="flex h-[100px] justify-center items-center gap-3 rounded border border-[#1B202C] bg-[#131824] px-4 py-3">
                <span className="text-black text-sm bg-white px-3 py-1 rounded font-medium">
                  Choose File
                </span>
                <span className="text-slate-400 text-sm truncate">
                  {thumbnail ? thumbnail.name : "No file chosen"}
                </span>
              </div>
            </div>
            <input
              type="hidden"
              {...register("thumbnailImg", { required: "Thumbnail is required" })}
            />
            {errors.thumbnailImg && (
              <p className="text-sm text-red-500">{errors.thumbnailImg.message as string}</p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className={`w-full py-[13px] ${
              uploadContent.isError
                ? "bg-red-600 hover:bg-red-700"
                : "bg-[#7A24BC] hover:bg-[#7A24A1]"
            } cursor-pointer`}
            disabled={uploadContent.isPending}
          >
            {uploadContent.isPending
              ? "Uploading..."
              : uploadContent.isError
              ? "Try Again"
              : "Upload"}
          </Button>
        </div>
      </form>
    </div>
  );
}