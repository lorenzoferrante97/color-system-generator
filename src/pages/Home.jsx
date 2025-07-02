// start code

import { useGlobalContext } from '../contexts/globalContext';

export default function Home() {
  // --- GLOBAL CONTEXT -----------------------------------------------------
  const { inputColor, getHslObjColor, getHslColor, baseColor, handleClick } =
    useGlobalContext();

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
      </div>
    </>
  );
}
