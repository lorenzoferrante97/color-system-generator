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
    primaryRoles,
  } = useGlobalContext();

  return (
    <>
      <div>
        <div>
          <label htmlFor='baseColor'>Inserisci un colore in formato HEX</label>
          <input
            className='bg-neutral-200'
            ref={inputColor}
            type='text'
            name='baseColor'
          />
          <button onClick={handleClick} className='bg-black text-white'>
            Crea la Palette
          </button>
        </div>
        {/* Show colors */}
        <div>
          <span>{baseColor}</span>
          <div
            className='aspect-square size-12'
            style={{ backgroundColor: `${baseColor}` }}
          />
        </div>
        <div>
          <span>{baseNeutrals?.baseLight}</span>
          <div
            className='aspect-square size-12'
            style={{ backgroundColor: `${baseNeutrals?.baseLight}` }}
          />
        </div>
        <div>
          <span>{baseNeutrals?.baseDark}</span>
          <div
            className='aspect-square size-12'
            style={{ backgroundColor: `${baseNeutrals?.baseDark}` }}
          />
        </div>
        {/* base palette */}
        <div className='flex items-center'>
          {basePalette.map((color, i) => {
            return (
              <div
                key={i}
                className='aspect-square size-8'
                style={{ backgroundColor: `${color}` }}
              />
            );
          })}
        </div>
        {/* color roles - primary - solid */}
        <div className='flex items-center'>
          {/* solid */}
          <div
            className='aspect-square size-12'
            style={{ backgroundColor: `${primaryRoles?.solid}` }}
          />
          {/* on solid */}
          <div
            className='aspect-square size-12'
            style={{ backgroundColor: `${primaryRoles['on solid']}` }}
          />
        </div>
        {/* color roles - primary - soft */}
        <div className='flex items-center'>
          {/* soft */}
          <div
            className='aspect-square size-12'
            style={{ backgroundColor: `${primaryRoles?.soft}` }}
          />
          {/* on soft */}
          <div
            className='aspect-square size-12'
            style={{ backgroundColor: `${primaryRoles['on soft']}` }}
          />
        </div>
      </div>
    </>
  );
}
