'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Button from './Button';

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get('capacity') ?? 'all';

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set('capacity', filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex ">
      <Button
        activeFilter={activeFilter}
        filter="all"
        onClick={() => handleFilter('all')}
      >
        All cabins
      </Button>
      <Button
        activeFilter={activeFilter}
        filter="small"
        onClick={() => handleFilter('small')}
      >
        1&mdash;3 guests
      </Button>
      <Button
        activeFilter={activeFilter}
        filter="medium"
        onClick={() => handleFilter('medium')}
      >
        4&mdash;7 guests
      </Button>
      <Button
        activeFilter={activeFilter}
        filter="large"
        onClick={() => handleFilter('large')}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}
