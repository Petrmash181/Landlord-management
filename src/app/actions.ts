"use server";

import { prisma } from "@/lib/prisma";

export async function createProperty(formData: FormData) {
  const name = formData.get("name")?.toString().trim();
  const location = formData.get("location")?.toString().trim();

  if (!name) {
    throw new Error("Property name is required");
  }

  const existingProperty = await prisma.property.findFirst({
    where: {
      name,
      location: location || null,
    },
  });

  if (existingProperty) {
    return;
  }

  await prisma.property.create({
    data: {
      name,
      location: location || null,
    },
  });
}