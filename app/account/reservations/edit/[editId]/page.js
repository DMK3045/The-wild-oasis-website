import { getBooking, getCabin } from '@/app/_lib/data-service';
import SubmitFormButton from '@/app/_components/SubmitFormButton';
import { updateBooking } from '@/app/_lib/actions';
export default async function Page({ params }) {
  // CHANGE
  const { editId } = params;
  const { numGuests, observations, cabinId } = await getBooking(editId);
  const { maxCapacity } = await getCabin(cabinId);
  console.log(numGuests);
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{editId}
      </h2>

      <form
        action={updateBooking}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <div className="space-y-2">
          <input type="hidden" name="editId" value={editId} />
          <label htmlFor="numGuests">How many guests?</label>
          <select
            defaultValue={numGuests}
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            defaultValue={observations}
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitFormButton loadingText="Updating...">
            Update Reservation
          </SubmitFormButton>
        </div>
      </form>
    </div>
  );
}