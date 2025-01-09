import Link from 'next/link';
import { auth } from '../_lib/auth';
import { PiArrowElbowRightDownFill } from 'react-icons/pi';

export const metadata = {
  title: 'Guest area',
};

export default async function Page() {
  const session = await auth();
  const firstName = session.user.name.split(' ').at(0);

  return (
    <>
      <div>
        <h2 className=" font-semibold text-3xl text-primary-50 mb-10 ">
          Welcome. <span className="text-accent-500">{firstName}</span>
        </h2>
      </div>

      <div className="md:hidden flex flex-col gap-5  ">
        <h3 className="flex gap-5 align-center justify-start  text-2xl">
          Navigate to{' '}
          <span className="text-2xl">
            <PiArrowElbowRightDownFill />
          </span>
        </h3>

        <Link
          href="/account/reservations"
          className=" text-xl text-accent-300 inline-block ml-3 cursor-pointer"
        >
          Reservations &rarr;
        </Link>
        <Link
          href="/account/profile"
          className=" text-xl text-accent-300 inline-block ml-3 cursor-pointer"
        >
          Guest Profile &rarr;
        </Link>
      </div>
    </>
  );
}
