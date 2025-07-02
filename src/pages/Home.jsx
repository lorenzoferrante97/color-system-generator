// start code

import { useGlobalContext } from '../contexts/globalContext';

export default function Home() {
  // --- GLOBAL CONTEXT -----------------------------------------------------
  const { inputColor, getHslObjColor, getHslColor } = useGlobalContext();

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
          <button className='bg-black text-white'>Crea la Palette</button>
        </div>
      </div>
    </>
  );
}
