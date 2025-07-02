import { Outlet } from 'react-router-dom';

export default function DefaultLayout() {
  return (
    <div className='p-section font-body-base-regular text-neutral-text-high container-full overflow-x-hidden overflow-y-visible pt-12'>
      {/* MAIN ---------------------------- */}
      <main data-id='main' className='container-responsive'>
        <Outlet />
      </main>
    </div>
  );
}
