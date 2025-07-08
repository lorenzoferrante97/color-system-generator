// start code

import { useGlobalContext } from '../contexts/globalContext';
import Card from '../components/Card';

export default function Test() {
  // --- GLOBAL CONTEXT -----------------------------------------------------
  const {
    inputColor,
    getHslObjColor,
    getHslColor,
    baseColor,
    handleClick,
    baseNeutrals,
    basePalette,
    neutralPalette,
    primaryRoles,
    neutralRoles,
    semanticColors,
    semanticRoles,
    semanticPalette,
  } = useGlobalContext();

  return (
    <>
      {/* --- HERO ----------------------------------------------------------- */}
      <div className='bg-neutral-base-200 border-neutral-base-300 perfect-center mb-10 h-[20vh] w-full flex-col rounded-xl border-8 p-4'>
        <h1 className='font-h1'>Color System</h1>
      </div>
      {/* --- COLORS GRID ----------------------------------------------------- */}
      <div className='row-grid w-full gap-3'>
        {/* Base Color ------------- */}
        <div className='bg-neutral-base-300 border-neutral-border/20 col-span-full flex flex-col gap-4 rounded-xl border p-4 shadow-xl shadow-black/5 md:col-span-3 lg:col-span-5'>
          <h2 className='font-h4 text-center'>Colore base</h2>
          <Card color={baseColor} colorClassname='max-lg:max-h-none' />
        </div>
        {/* Neutrals Base Colors ------------- */}
        <div className='bg-neutral-base-300 border-neutral-border/20 col-span-full flex flex-col gap-4 rounded-xl border p-4 shadow-xl shadow-black/5 md:col-span-5 lg:col-span-7'>
          <h2 className='font-h4 text-center'>Neutrali base</h2>
          <div className='flex w-full flex-col justify-between gap-2 lg:flex-row lg:items-center'>
            <Card color={baseNeutrals?.baseLight} />
            <Card color={baseNeutrals?.baseDark} />
          </div>
        </div>
      </div>
    </>
  );
}
