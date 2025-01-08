'use client';

import { useOptimistic } from 'react';
import { deleteReservation } from '../_lib/actions';
import ReservationCard from '@/app/_components/ReservationCard';

export default function ReservationsList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDeleteReservation(bookingId) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          onDelete={handleDeleteReservation}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}
