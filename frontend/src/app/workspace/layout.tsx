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
        <div className='w-1/3 md:w-1/6 h-full flex-shrink-0 overflow-y-auto ' style={{ minWidth: '200px' }} >
          <Sidebar />
        </div>
        <div className='w-2/3 md:w-5/6 h-full flex flex-col bg-secondaryBG '>{children}</div>
      </div>
    </div>
  );
}
