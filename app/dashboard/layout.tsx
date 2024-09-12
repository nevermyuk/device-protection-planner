import SidebarWithHeader from '../components/ui/dashboard/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>
        <SidebarWithHeader />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
