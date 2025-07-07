// start code

import { useGlobalContext } from '../contexts/globalContext';
// import hero-cover from "../../public/hero-cover.webp"

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
      <div className='border-neutral-base-300 perfect-center h-[80vh] w-full rounded-xl border-8 bg-[url(/hero-cover.webp)] bg-cover bg-center shadow-xl shadow-black/10'>
        <div className='flex size-full w-full flex-col justify-center gap-8 p-4 backdrop-blur-[2px]'>
          <h1 className='font-h1 self-center md:max-w-[80%] md:text-center xl:max-w-[60%]'>
            Costruisci palette e ruoli colore accessibili per il web
          </h1>
          {/* input ----------- */}
          <div className='flex flex-col items-center gap-5 self-center max-md:w-full md:max-w-[80%]'>
            <div className='flex flex-col gap-2 md:items-center'>
              <label htmlFor='baseColor' className='font-body-base-bold'>
                Inserisci un colore in HEX
              </label>
              <input
                className='bg-neutral-base-300 focus-state min-h-12 rounded-md px-4 py-2 shadow-md shadow-black/15 md:w-full'
                ref={inputColor}
                type='text'
                name='baseColor'
              />
            </div>
            <button
              onClick={handleClick}
              className='font-body-l-bold bg-neutral-solid lg:hover:bg-neutral-solid-hover transition-base min-h-12 w-full rounded-full px-3 py-1 text-white transition-all md:w-fit md:px-7 md:py-5 lg:hover:px-10'>
              Crea il Color System
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
