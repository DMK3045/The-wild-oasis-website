import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { format, formatDistance, isPast, isToday, parseISO } from 'date-fns';
import DeleteReservation from './DeleteReservation';
import Image from 'next/image';
import Link from 'next/link';

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace('about ', '');

function ReservationCard({ booking, onDelete }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    Cabins: { name, image },
  } = booking;

  return (
    <div className="flex flex-col lg:flex-row border border-primary-800 rounded-lg overflow-hidden shadow-lg">
      {/* Image Section */}
      <div className="relative h-48 lg:h-auto lg:w-1/3">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          className="object-cover border-b lg:border-b-0 lg:border-r border-primary-800"
        />
      </div>

      {/* Content Section */}
      <div className="flex-grow px-4 py-3 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg lg:text-xl font-semibold">
            {numNights} nights in Cabin {name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="bg-yellow-800 text-yellow-200 px-3 py-1 uppercase text-xs font-bold rounded-sm">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 px-3 py-1 uppercase text-xs font-bold rounded-sm">
              upcoming
            </span>
          )}
        </div>

        <p className="text-sm lg:text-lg text-primary-300">
          {format(new Date(startDate), 'EEE, MMM dd yyyy')} (
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), 'EEE, MMM dd yyyy')}
        </p>

        <div className="flex flex-wrap gap-4 mt-auto items-baseline">
          <p className="text-lg lg:text-xl font-semibold text-accent-400">
            ${totalPrice}
          </p>
          <p className="text-primary-300">&bull;</p>
          <p className="text-sm lg:text-lg text-primary-300">
            {numGuests} guest{numGuests > 1 && 's'}
          </p>
          <p className="ml-auto text-xs lg:text-sm text-primary-400">
            Booked {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}
          </p>
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex flex-col border-t lg:border-t-0 lg:border-l border-primary-800 w-full lg:w-[100px]">
        {!isPast(startDate) && (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="group flex items-center justify-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 py-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span>Edit</span>
            </Link>
            <DeleteReservation onDelete={onDelete} bookingId={id} />
          </>
        )}
      </div>
    </div>
  );
}

export default ReservationCard;
