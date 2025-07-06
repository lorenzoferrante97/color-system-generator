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
        {/* neutral palette */}
        <div className='flex items-center'>
          {neutralPalette.map((color, i) => {
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
        {/* color roles - neutrals - background */}
        <div className='flex items-center'>
          {/* bg */}
          <div
            className='aspect-square size-12'
            style={{ backgroundColor: `${neutralRoles?.background}` }}
          />
          {/* bg alt 1 */}
          <div
            className='aspect-square size-12'
            style={{ backgroundColor: `${neutralRoles['background alt 1']}` }}
          />
          {/* bg alt 2 */}
          <div
            className='aspect-square size-12'
            style={{ backgroundColor: `${neutralRoles['background alt 2']}` }}
          />
          {/* on bg */}
          <div
            className='aspect-square size-12'
            style={{ backgroundColor: `${neutralRoles['on background']}` }}
          />
          {/* on bg alt */}
          <div
            className='aspect-square size-12'
            style={{ backgroundColor: `${neutralRoles['on background alt']}` }}
          />
        </div>
        {/* color roles - neutrals - border */}
        <div className='flex items-center'>
          {/* border */}
          <div
            className='aspect-square size-12'
            style={{ backgroundColor: `${neutralRoles?.border}` }}
          />
          {/* border alt */}
          <div
            className='aspect-square size-12'
            style={{ backgroundColor: `${neutralRoles['border alt']}` }}
          />
        </div>
        {/* semantics colors */}
        <div className='flex items-center'>
          {/* error */}
          <div
            className='aspect-square size-12'
            style={{ backgroundColor: `${semanticColors?.error}` }}
          />
          {/* warning */}
          <div
            className='aspect-square size-12'
            style={{ backgroundColor: `${semanticColors?.warning}` }}
          />
          {/* success */}
          <div
            className='aspect-square size-12'
            style={{ backgroundColor: `${semanticColors?.success}` }}
          />
          {/* info */}
          <div
            className='aspect-square size-12'
            style={{ backgroundColor: `${semanticColors?.info}` }}
          />
        </div>
      </div>
    </>
  );
}
