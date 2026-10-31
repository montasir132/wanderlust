"use client";

import React, { useState } from "react";
import { Pencil, Save, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Destination, DestinationPayload } from "@/lib/types/destination";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const CATEGORIES = [
  { value: "beach", label: "Beach" },
  { value: "mountain", label: "Mountain" },
  { value: "city", label: "City" },
  { value: "adventure", label: "Adventure" },
  { value: "cultural", label: "Cultural" },
  { value: "wildlife", label: "Wildlife" },
] as const;

const EMPTY_FORM: DestinationPayload = {
  destinationName: "",
  country: "",
  category: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

type FormState = DestinationPayload;
type FieldName = keyof FormState;

type EditDestinationDialogProps = {
  // Pass the whole destination object, including its _id
  data?: Partial<Destination>;
};

const FIELD_CLASS =
  "h-10 rounded-md border-0 bg-[#F7F8FA] px-3 text-sm text-[#0C0B0B] placeholder:text-[#9A979B] shadow-none focus-visible:ring-1 focus-visible:ring-[#15A1BF]";
const LABEL_CLASS = "text-sm font-medium text-[#0C0B0B]";

/** Small helper so every labelled input is declared in one line. */
function Field({
  name,
  label,
  form,
  onChange,
  type = "text",
  placeholder,
}: {
  name: Exclude<FieldName, "category" | "description">;
  label: string;
  form: FormState;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className={LABEL_CLASS}>
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        value={form[name]}
        onChange={onChange}
        placeholder={placeholder}
        className={FIELD_CLASS}
      />
    </div>
  );
}

export function EditDestinationDialog({ data }: EditDestinationDialogProps) {
  // Split the id out so it never ends up in the form or the PATCH body
  const { _id, ...formData } = data ?? {};

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>({ ...EMPTY_FORM, ...formData });
  // console.log("is form",form);
  const [saving, setSaving] = useState(false);

  const setField = (name: FieldName, value: string) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setField(e.target.name as FieldName, e.target.value);

  // Reset to the original data every time the dialog opens or closes.
  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    setForm({ ...EMPTY_FORM, ...formData });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const detailsApi = process.env.NEXT_PUBLIC_DESTINATION_DETAILS_API;
    if (!detailsApi || !_id) {
      console.error("API URL or destination id is missing", {
        detailsApi,
        _id,
      });
      return;
    }
    const token = await getTokenFromClient();

    try {
      setSaving(true);
      const res = await fetch(`${detailsApi}/${_id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json" ,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            className="h-9 gap-2 border-[#EEEEEE] bg-white px-4 text-sm text-[#0C0B0B] hover:bg-[#EDFCFF] hover:text-[#0C0B0B]"
          >
            <Pencil className="h-4 w-4 text-[#1E9E35]" />
            Edit
          </Button>
        }
      />

      <DialogContent className="max-h-none gap-0 overflow-hidden p-0 sm:max-w-xl">
        {/* One form wraps body + footer, so the submit button actually submits */}
        <form onSubmit={handleSubmit}>
          <DialogHeader className="space-y-1 px-5 pb-5 pt-5 text-left">
            <DialogTitle className="text-xl font-semibold text-[#0C0B0B]">
              Update Travel Package
            </DialogTitle>
            <DialogDescription className="text-xs text-[#6C696D]">
              Make changes to the travel package details below
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 px-5 pb-5">
            <Field
              name="destinationName"
              label="Destination Name"
              form={form}
              onChange={handleChange}
              placeholder="Bali Paradise"
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field
                name="country"
                label="Country"
                form={form}
                onChange={handleChange}
                placeholder="Indonesia"
              />

              <div className="space-y-2">
                <Label htmlFor="category" className={LABEL_CLASS}>
                  Category
                </Label>
                <Select
                  value={form.category || null}
                  onValueChange={(value) => setField("category", value ?? "")}
                >
                  <SelectTrigger
                    id="category"
                    className={`w-full ${FIELD_CLASS}`}
                  >
                    <SelectValue placeholder="Beach" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field
                name="price"
                label="Price (USD)"
                type="number"
                form={form}
                onChange={handleChange}
                placeholder="e.g., 1299"
              />
              <Field
                name="duration"
                label="Duration"
                form={form}
                onChange={handleChange}
                placeholder="e.g., 7 Days/6 Nights"
              />
            </div>

            <Field
              name="departureDate"
              label="Departure Date"
              type="date"
              form={form}
              onChange={handleChange}
            />

            <Field
              name="imageUrl"
              label="Image URL"
              type="url"
              form={form}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />

            <div className="space-y-2">
              <Label htmlFor="description" className={LABEL_CLASS}>
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the travel experience..."
                rows={4}
                className="resize-none rounded-md border-0 bg-[#F7F8FA] px-3 py-2.5 text-sm shadow-none placeholder:text-[#9A979B] focus-visible:ring-1 focus-visible:ring-[#15A1BF]"
              />
            </div>
          </div>

          <DialogFooter className="m-0 flex-row justify-end gap-3 rounded-b-xl border-t border-[#EEEEEE] bg-white px-5 py-4">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 gap-2 border-[#EE4A4A]/40 bg-white px-5 text-[#EE4A4A] hover:bg-[#EE4A4A]/5 hover:text-[#EE4A4A]"
                >
                  <Trash2 className="h-4 w-4" />
                  Cancel
                </Button>
              }
            />
            <Button
              type="submit"
              disabled={saving}
              className="h-10 gap-2 bg-[#15A1BF] px-5 text-white hover:bg-[#1190ab]"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
