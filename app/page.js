import Image from 'next/image';
import bg from '@/public/bg.png';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="mt-24">
      <Image
        src={bg}
        fill
        alt="Mountains and forests with two cabins"
        className="object-cover object-top"
        placeholder="blur"
        quality={80}
      />

      <div className="relative md:z-10 text-center">
        <h1 className="text-4xl sm:text-6xl md:text-8xl text-primary-50 mb-6 sm:mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-4 sm:px-8 py-3 sm:py-6 text-primary-800 text-sm sm:text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
