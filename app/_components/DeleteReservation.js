'use client';

import { TrashIcon } from '@heroicons/react/24/solid';
import { useTransition } from 'react';
import SpinnerMini from '../starter/components/SpinnerMini';

function DeleteReservation({ bookingId, onDelete }) {
  const [isPending, startTransition] = useTransition();

  function handleDeleteReservation() {
    if (confirm('Are you sure you want to delete this booking?'))
      startTransition(() => onDelete(bookingId));
  }

  return (
    <button
      onClick={handleDeleteReservation}
      className="group flex items-center justify-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 py-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      {!isPending ? (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span>Delete</span>
        </>
      ) : (
        <span className="flex items-center justify-center">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default DeleteReservation;
