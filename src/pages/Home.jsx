// start code

import { useGlobalContext } from '../contexts/globalContext';

export default function Home() {
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
      {/* --- HERO ----------------------------------------- */}
      <div className='flex h-screen w-full flex-col'>
        <h1 className='font-h1'>
          Costruisci palette e ruoli colore accessibili per il tuo brand
        </h1>
      </div>
    </>
  );
}
