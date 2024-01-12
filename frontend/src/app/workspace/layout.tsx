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
        <div className='w-1/4 md:w-1/6 h-full flex-shrink-0'>
          <Sidebar />
        </div>
        <div className='w-3/4 lg:w-5/6 h-full flex flex-col bg-secondaryBG over-flow-y-auto'>{children}</div>
      </div>
    </div>
  );
}
