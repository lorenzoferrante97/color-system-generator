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
      <div className='bg-neutral-base-200 border-neutral-base-300 perfect-center h-[20vh] w-full flex-col rounded-xl border-8 p-4'>
        <h1 className='font-h1'>Color System</h1>
      </div>
    </>
  );
}
