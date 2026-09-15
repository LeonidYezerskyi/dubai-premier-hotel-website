import { Suspense } from "react";
import CabinList from "@/app/_components/CabinList";
import Spinner from "@/app/_components/Spinner";
import Filter from "@/app/_components/Filter";
import ReservationReminder from "@/app/_components/ReservationReminder";

export const revalidate = 3600;

export const metadata = {
  title: "Cabins",
};
export default function Page({ searchParams }) {
  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Suites
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Opulent yet comfortable suites, located right along the coastline of the
        Arabian Gulf. Imagine waking up to panoramic sea and skyline views,
        spending your days relaxing by your private pool, or experiencing the
        vibrant energy of Dubai. Enjoy unrivaled luxury in your own exclusive
        sanctuary away from home. The perfect spot for an unforgettable,
        sophisticated vacation. Welcome to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
