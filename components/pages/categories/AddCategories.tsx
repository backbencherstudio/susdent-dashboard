import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Category } from "./CategoriesTable";
import EditIcon from "@/components/icons/EditIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { privateAxios } from "@/components/axiosInstance/axios";
import { toast } from "sonner";

interface CategoryModalProps {
  category: Category | null;
}

const useCreateCategory = () => {
  return useMutation({
    mutationFn: (data: any) => {
      return privateAxios.post("/admin/categories/create_category", data);
    },
  });
};

const useUpdateCategory = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => {
      return privateAxios.put(`/admin/categories/categories/${id}`, data);
    },
  });
};

export default function AddCategories({ category }: CategoryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    status: 1,
  });

  const {
    mutate: createCategory,
    isPending: createLoading,
    isError: createError,
  } = useCreateCategory();
  const {
    mutate: updateCategory,
    isPending: updateLoading,
    isError: updateError,
  } = useUpdateCategory();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        slug: category.slug,
        status: category.status,
      });
    } else {
      setFormData({ name: "", slug: "", status: 1 });
    }
  }, [category]);

  const handleSubmit = async () => {
    if (!formData.name) {
      toast.error("Name is required");
      return;
    }

    const generateSlug = formData.name
      .toLocaleLowerCase()
      .trim()
      .replace(/\s+/g, "-") 
      .replace(/[^\w\-]+/g, "");

    const payload = {...formData, slug: generateSlug}

    if (category) {
      // Update category
      updateCategory(
        { id: category.id, data: payload },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Category Updated Successfully!");
            setIsOpen(false);
          },
          onError: () => toast.error("Failed to update category"),
        }
      );
    } else {
      // Create category
      createCategory(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["categories"] });
          setIsOpen(false);
          toast.success("Category Created Successfully!");
          setFormData({
            name: "",
            slug: "",
            status: 1,
          });
        },
        onError: () => toast.error("Failed to create category"),
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger className=" cursor-pointer" asChild>
        {category ? (
          <p>
            <EditIcon />
          </p>
        ) : (
          <p className="primary-btn">Add Category</p>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px flex-col items-start gap-[43px] border border-[color:var(--Line-Color,#1B202C)] [background:#181E2A] p-6 rounded-lg border-solid text-white">
        <DialogHeader>
          <DialogTitle>
            {category ? "Edit Category" : "Add New Category"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="category-name">Name</Label>
            <Input
              id="category-name"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          {/* <div className="grid gap-3">
            <Label htmlFor="category-slug">Slug</Label>
            <Input
              id="category-slug"
              name="slug"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
            />
          </div> */}

          <div className="grid gap-3">
            <Label htmlFor="category-status">Status</Label>
            <select
              id="category-status"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: Number(e.target.value) })
              }
              className="bg-[#1B202C]/80 text-white border rounded-sm px-2 py-2"
            >
              <option value={1}>Active</option>
              <option value={0}>Deactive</option>
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            type="submit"
            disabled={createLoading || updateLoading}
            className="primary-btn w-full"
          >
            {category ? (
              <>{updateLoading ? "Updating..." : "Update"}</>
            ) : (
              <>{createLoading ? "Creating..." : "Create"}</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
