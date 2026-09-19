import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddBuildingForm from "./AddBuildingForm";

type PropertyPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PropertyPage({
  params,
}: PropertyPageProps) {
  const { id } = await params;

  const property = await prisma.property.findUnique({
    where: {
      id,
    },
    include: {
      buildings: {
        include: {
          floors: {
            include: {
              units: true,
            },
          },
        },
      },
    },
  });

  if (!property) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-50 p-6 text-zinc-900">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-medium text-zinc-600 hover:text-black"
        >
          ← Back to Properties
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl font-bold">{property.name}</h1>

          {property.location && (
            <p className="mt-2 text-zinc-600">{property.location}</p>
          )}
        </header>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Buildings</h2>
              <p className="mt-1 text-sm text-zinc-500">
                Manage buildings, floors and units.
              </p>
            </div>

           <AddBuildingForm propertyId={property.id} />
          </div>

          {property.buildings.length === 0 ? (
            <div className="rounded-lg border border-dashed border-zinc-300 p-8 text-center">
              <p className="text-zinc-500">
                No buildings added to this property yet.
              </p>

              <p className="mt-2 text-sm text-zinc-400">
                Add a building to start creating floors and units.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {property.buildings.map((building) => {
                const floorCount = building.floors.length;

                const unitCount = building.floors.reduce(
                  (total, floor) => total + floor.units.length,
                  0
                );

                return (
                  <div
                    key={building.id}
                    className="rounded-lg border border-zinc-200 p-5"
                  >
                    <h3 className="text-lg font-semibold">
                      {building.name}
                    </h3>

                    <p className="mt-1 text-sm text-zinc-600">
                      {floorCount}{" "}
                      {floorCount === 1 ? "floor" : "floors"} · {unitCount}{" "}
                      {unitCount === 1 ? "unit" : "units"}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}