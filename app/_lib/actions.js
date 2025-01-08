'use server';

import { revalidatePath } from 'next/cache';
import { auth, signIn, signOut } from './auth';
import { supabase } from './supabase';
import { getBookings } from './data-service';
import { redirect } from 'next/navigation';

export async function updateGuest(formData) {
  const session = await auth();
  //console.log(session.user.guestId);
  if (!session) throw new Error('You must be logged in.');

  const nationalID = formData.get('nationalID');
  const [nationality, countryFlag] = formData.get('nationality').split('%');

  const regex = /^[a-zA-Z0-9]{6,12}$/;
  if (!regex.test(nationalID))
    throw new Error('Please Provide a Valid National ID');

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from('Guests')
    .update(updateData)
    .eq('id', session.user.guestId);

  if (error) throw new Error('Guest could not be updated');

  revalidatePath('/account/profile');
}

export async function updateBooking(formData) {
  // 1) Authentication
  const session = await auth();
  if (!session.user.guestId) throw new Error('You must be logged in.');

  // 2. Authorization
  const bookingId = Number(formData.get('editId'));
  console.log(bookingId);
  const guestReservaions = await getBookings(session.user.guestId);
  const allReservationsIds = guestReservaions.map(
    (reservation) => reservation.id
  );
  if (!allReservationsIds.includes(bookingId))
    throw new Error('You cannot edit this booking');

  //3. Mutation and error handling
  const updatedFields = {
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 1000),
  };

  const { data, error } = await supabase
    .from('Bookings')
    .update(updatedFields)
    .eq('id', bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }

  // 4. Revalidate paths
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath('/account/reservations');

  // 5. Redirect
  redirect('/account/reservations');
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session.user.guestId) throw new Error('You must be logged in!');

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: 'unconfirmed',
  };

  const { error } = await supabase.from('Bookings').insert([newBooking]);

  if (error) throw new Error('Booking could not be created');
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect('/cabins/thankYou');
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session.user.guestId) throw new Error('You must be logged in.');

  const guestReservaions = await getBookings(session.user.guestId);
  const allReservationsIds = guestReservaions.map(
    (reservation) => reservation.id
  );

  if (!allReservationsIds.includes(bookingId))
    throw new Error('You cannot delete this booking.');

  const { error } = await supabase
    .from('Bookings')
    .delete()
    .eq('id', bookingId);

  if (error) throw new Error('Booking could not be deleted');

  revalidatePath('/account/reservations');
}

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}
