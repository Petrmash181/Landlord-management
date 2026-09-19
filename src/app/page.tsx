
import { prisma } from "@/lib/prisma";
import { createProperty } from "./actions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const properties = await prisma.property.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-50 p-6 text-zinc-900">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Landlord Management</h1>
          <p className="mt-2 text-zinc-600">
            Manage your properties, buildings, units, tenants and payments.
          </p>
        </header>

        <section className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Add Property</h2>

          <form action={createProperty} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-sm font-medium"
              >
                Property name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="e.g. Greenview Apartments"
                className="w-full rounded-lg border border-zinc-300 px-4 py-2 outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="mb-1 block text-sm font-medium"
              >
                Location
              </label>

              <input
                id="location"
                name="location"
                type="text"
                placeholder="e.g. Kilimani, Nairobi"
                className="w-full rounded-lg border border-zinc-300 px-4 py-2 outline-none focus:border-zinc-500"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-black px-5 py-2.5 font-medium text-white hover:bg-zinc-800"
            >
              Add Property
            </button>
          </form>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Properties</h2>
            <span className="text-sm text-zinc-500">
              {properties.length}{" "}
              {properties.length === 1 ? "property" : "properties"}
            </span>
          </div>

          {properties.length === 0 ? (
            <p className="py-8 text-center text-zinc-500">
              No properties added yet.
            </p>
          ) : (
            <div className="space-y-3">
              {properties.map((property) => (
            <Link
              key={property.id}
              href={`/property/${property.id}`}
              className="block rounded-lg border border-zinc-200 p-4 hover:bg-zinc-50"
            >
              <h3 className="font-semibold">{property.name}</h3>

              {property.location && (
                <p className="mt-1 text-sm text-zinc-600">
                  {property.location}
                </p>
              )}
            </Link>
          ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
