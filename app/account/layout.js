import SideNavigation from '@/app/_components/SideNavigation';

export default function Layout({ children }) {
  return (
    <>
      <div className="block md:hidden">{children}</div>

      <div className="hidden md:grid md:grid-cols-[16rem_1fr] md:h-full md:gap-12">
        <SideNavigation />
        <div className="py-1">{children}</div>
      </div>
    </>
  );
}
