"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import type { DestinationPayload } from "@/lib/types/destination";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const categories = [
  { value: "beach", label: "Beach" },
  { value: "mountain", label: "Mountain" },
  { value: "city", label: "City" },
  { value: "adventure", label: "Adventure" },
  { value: "cultural", label: "Cultural" },
  { value: "wildlife", label: "Wildlife" },
];

const emptyForm: DestinationPayload = {
  destinationName: "",
  country: "",
  category: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

export default function AdminPage() {
  const [form, setForm] = useState(emptyForm);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: send `form` to the API
    const token = await getTokenFromClient();
    // console.log(data);
    const adminApi = process.env.NEXT_PUBLIC_ADMIN_API;
    if (!adminApi) {
      console.error("Admin api is not configured");
      return;
    }
    const res = await fetch(adminApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      console.error(`Failed to add travel package: ${res.status}`);
    }
    // const adminData = await res.json();
    // console.log(adminData);
    // console.log(form);
  };
  const handleCancel = () => setForm(emptyForm);

  return (
    <main className="min-h-screen w-full bg-white mb-20 px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-normal tracking-tight text-[#0C0B0B] sm:text-4xl">
          Add New Travel Package
        </h1>

        <Card className="mt-8 border border-[#EEEEEE] shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Destination Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="destinationName"
                  className="text-sm font-medium text-[#0C0B0B]"
                >
                  Destination Name
                </Label>
                <Input
                  id="destinationName"
                  name="destinationName"
                  value={form.destinationName}
                  onChange={handleChange}
                  placeholder="Bali Paradise"
                  className="h-10 bg-[#F7F8FA] px-3"
                />
              </div>

              {/* Country + Category */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="country"
                    className="text-sm font-medium text-[#0C0B0B]"
                  >
                    Country
                  </Label>
                  <Input
                    id="country"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="Indonesia"
                    className="h-10 bg-[#F7F8FA] px-3"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="category"
                    className="text-sm font-medium text-[#0C0B0B]"
                  >
                    Category
                  </Label>
                  <Select
                    value={form.category || null}
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, category: value ?? "" }))
                    }
                  >
                    <SelectTrigger
                      id="category"
                      className="h-10 w-full bg-[#F7F8FA] px-3"
                    >
                      <SelectValue placeholder="Beach" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Price + Duration */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="price"
                    className="text-sm font-medium text-[#0C0B0B]"
                  >
                    Price (USD)
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="e.g., 1299"
                    className="h-10 bg-[#F7F8FA] px-3"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="duration"
                    className="text-sm font-medium text-[#0C0B0B]"
                  >
                    Duration
                  </Label>
                  <Input
                    id="duration"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    placeholder="e.g., 7 Days/6 Nights"
                    className="h-10 bg-[#F7F8FA] px-3"
                  />
                </div>
              </div>

              {/* Departure Date */}
              <div className="space-y-2">
                <Label
                  htmlFor="departureDate"
                  className="text-sm font-medium text-[#0C0B0B]"
                >
                  Departure Date
                </Label>
                <Input
                  id="departureDate"
                  name="departureDate"
                  type="date"
                  value={form.departureDate}
                  onChange={handleChange}
                  placeholder="mm/dd/yyyy"
                  className="h-10 bg-[#F7F8FA] px-3"
                />
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <Label
                  htmlFor="imageUrl"
                  className="text-sm font-medium text-[#0C0B0B]"
                >
                  Image URL
                </Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  value={form.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="h-10 bg-[#F7F8FA] px-3"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-sm font-medium text-[#0C0B0B]"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the travel experience..."
                  rows={5}
                  className="bg-[#F7F8FA] px-3 py-2.5"
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="h-10 gap-2 border-[#EE4A4A]/40 bg-white px-5 text-[#EE4A4A] hover:bg-[#EE4A4A]/5 hover:text-[#EE4A4A]"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-10 gap-2 bg-[#15A1BF] px-5 text-white hover:bg-[#008fbd]"
                >
                  <Plus className="h-4 w-4" />
                  Add Travel Package
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
