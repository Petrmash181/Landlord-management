"use client";

import { useRef } from "react";
import { createBuilding } from "./building-actions";

type AddBuildingFormProps = {
  propertyId: string;
};

export default function AddBuildingForm({
  propertyId,
}: AddBuildingFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    await createBuilding(formData);
    formRef.current?.reset();
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="flex items-center gap-2"
    >
      <input type="hidden" name="propertyId" value={propertyId} />

      <input
        type="text"
        name="name"
        placeholder="Building name"
        required
        className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
      />

      <button
        type="submit"
        className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
      >
        Add Building
      </button>
    </form>
  );
}