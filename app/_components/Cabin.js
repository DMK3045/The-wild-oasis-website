import Image from 'next/image';
import TextExpander from './TextExpander';
import { EyeSlashIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/solid';

export default function Cabin({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[3fr_4fr] gap-10 lg:gap-20 border border-primary-800 py-6 px-6 lg:py-3 lg:px-10 mb-24">
      <div className="relative lg:scale-[1.15] lg:-translate-x-3 h-[300px] lg:h-auto">
        <Image
          fill
          src={image}
          alt={`Cabin ${name}`}
          className="object-cover"
        />
      </div>

      <div>
        <h3 className="text-accent-100 font-black text-4xl lg:text-7xl mb-5 lg:translate-x-[-254px] bg-primary-950 p-4 lg:p-6 pb-1 lg:w-[150%]">
          Cabin {name}
        </h3>

        <p className="text-base lg:text-lg text-primary-300 mb-10">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-base lg:text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-base lg:text-lg">
              Located in the heart of the{' '}
              <span className="font-bold">Notre Dame</span> (Switzerland)
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span className="text-base lg:text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
