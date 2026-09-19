"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createBuilding(formData: FormData) {
  const propertyId = formData.get("propertyId")?.toString().trim();
  const name = formData.get("name")?.toString().trim();

  if (!propertyId) {
    throw new Error("Property ID is required");
  }

  if (!name) {
    throw new Error("Building name is required");
  }

  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });

  if (!property) {
    throw new Error("Property not found");
  }

  const existingBuilding = await prisma.building.findFirst({
    where: {
      propertyId,
      name,
    },
  });

  if (existingBuilding) {
    return;
  }

  await prisma.building.create({
    data: {
      name,
      propertyId,
    },
  });

  revalidatePath(`/property/${propertyId}`);
}