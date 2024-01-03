import NavbarTop from '@/components/navbar/navbar';
import Sidebar from '@/components/sidebar/sidebar';

type LayoutProps = {
  title?: string;
  children: React.ReactNode;
};
export default function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    tag: string;
    item: string;
  };
}) {
  return (
    <div className='flex h-screen max-h-screen flex-col overflow-hidden'>
      <NavbarTop />
      <div className='flex h-fit grow  flex-row overflow-hidden '>
        <div className='w-1/6 h-full'>
          <Sidebar />
        </div>
        <div className='w-5/6 h-full flex flex-col'>{children}</div>
      </div>
    </div>
  );
}
