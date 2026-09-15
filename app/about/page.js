import Image from "next/image";
import about1 from "@/public/about-1.jpg";
import { getCabins } from "../_lib/data-service";

export const revalidate = 86400;

export const metadata = {
  title: "About",
};

export default async function Page() {
  const cabins = await getCabins();
  return (
    <div className="grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">
      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Welcome to Dubai Premier Hotel
        </h1>

        <div className="space-y-8">
          <p>
            Where timeless Arabian hospitality and ultimate modern luxury blend
            seamlessly. Set against the iconic skyline and the pristine waters
            of the Arabian Gulf, this is your exclusive sanctuary in Dubai. But
            it&apos;s not just about the opulent architecture and world-class
            service. It&apos;s about experiencing the vibrant energy of the city
            while indulging in unrivaled comfort and privacy.
          </p>
          <p>
            Our {cabins.length} luxury suites provide a sophisticated retreat,
            complemented by private pools, serene garden courtyards, and
            breathtaking ocean views. Stroll through lush palm gardens, unwind
            by the infinity pool at sunset, and take in the sparkling city
            lights under the night sky.
          </p>
          <p>
            This is where unforgettable moments are created, surrounded by
            architectural grandeur and timeless elegance. It&apos;s a place to
            immerse yourself in pure comfort, recharge, and savor the finest
            moments with those who matter most.
          </p>
        </div>
      </div>

      <div className="col-span-2">
        <Image
          src={about1}
          placeholder="blur"
          quality={80}
          alt="Family sitting around a fire pit in front of cabin"
        />
      </div>

      <div className="col-span-2 aspect-square relative">
        <Image
          src="/about-2.jpg"
          fill
          className="object-cover"
          alt="Family that manages The Wild Oasis"
        />
      </div>

      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Curated with Passion & Excellence Since 1998
        </h1>

        <div className="space-y-8">
          <p>
            Since 1998, Dubai Premier Hotel has stood as a beacon of refined
            luxury and legendary Arabian hospitality. Founded with a vision to
            create an exceptional sanctuary in the heart of Dubai, our hotel has
            been thoughtfully developed and maintained with an unwavering
            commitment to perfection and personalized service.
          </p>
          <p>
            Over the years, we have preserved the true essence of traditional
            warmth while seamlessly integrating world-class modern amenities and
            architectural elegance. Here, every guest is treated to an
            extraordinary experience where genuine care meets unparalleled
            sophistication. We invite you to join us at Dubai Premier Hotel —
            where timeless tradition meets contemporary luxury, and every moment
            is crafted to feel effortless and unforgettable.
          </p>

          <div>
            <a
              href="/cabins"
              className="inline-block mt-4 bg-accent-500 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Explore our luxury cabins
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
