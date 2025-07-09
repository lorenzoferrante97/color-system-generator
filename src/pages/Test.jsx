// start code

import { useGlobalContext } from '../contexts/globalContext';
import Card from '../components/Card';
import RoleCard from '../components/RoleCard';
import Badge from '../components/Badge';

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
        <div className='bg-neutral-base-300 border-neutral-border/20 col-span-full flex h-fit flex-col gap-4 rounded-xl border p-4 shadow-xl shadow-black/5 md:col-span-3 lg:col-span-5'>
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
        {/* Neutrals Base Colors ------------- */}
        <div className='bg-neutral-base-300 border-neutral-border/20 col-span-full mb-20 flex flex-col gap-4 rounded-xl border p-4 shadow-xl shadow-black/5'>
          <h2 className='font-h4 text-center'>Semantici base</h2>
          <div className='flex w-full flex-col justify-between gap-2 lg:flex-row lg:items-center'>
            <Card color={semanticColors?.error} />
            <Card color={semanticColors?.warning} />
            <Card color={semanticColors?.success} />
            <Card color={semanticColors?.info} />
          </div>
        </div>
        {/* Base Color Roles ------------- */}
        <div className='bg-neutral-base-300 border-neutral-border/20 col-span-full flex flex-col gap-4 rounded-xl border p-4 shadow-xl shadow-black/5'>
          <h2 className='font-h4 text-center'>Ruoli Colore Base</h2>
          <div className='flex flex-col gap-10 md:max-h-60 md:flex-row'>
            <RoleCard
              bgColor={primaryRoles?.solid}
              onColor={primaryRoles['on solid']}
              bgRole='solid'
              onRole='on solid'
            />
            <RoleCard
              bgColor={primaryRoles?.soft}
              onColor={primaryRoles['on soft']}
              bgRole='soft'
              onRole='on soft'
            />
          </div>
        </div>
        {/* Neutral Color Roles -> background ------------- */}
        <div className='bg-neutral-base-300 border-neutral-border/20 col-span-full flex flex-col gap-4 rounded-xl border p-4 shadow-xl shadow-black/5'>
          <h2 className='font-h4 text-center'>Ruoli Neutrali - Background</h2>
          <div className='flex flex-col gap-10 md:max-h-60 md:flex-row'>
            <RoleCard
              bgColor={neutralRoles?.background}
              onColor={neutralRoles['on background']}
              bgRole='background'
            />
            <RoleCard
              bgColor={neutralRoles['background alt 1']}
              onColor={neutralRoles['on background']}
              bgRole='background alt 1'
            />
            <RoleCard
              bgColor={neutralRoles['background alt 2']}
              onColor={neutralRoles['on background']}
              bgRole='background alt 2'
            />
          </div>
        </div>
        {/* Neutral Color Roles -> on background ------------- */}
        <div className='bg-neutral-base-300 border-neutral-border/20 col-span-full flex flex-col gap-4 rounded-xl border p-4 shadow-xl shadow-black/5'>
          <h2 className='font-h4 text-center'>Ruoli Neutrali - Testi</h2>
          <div className='flex flex-col gap-10 md:max-h-60 md:flex-row'>
            <RoleCard
              bgColor={neutralRoles['on background']}
              onColor={neutralRoles?.background}
              bgRole='on background'
            />
            <RoleCard
              bgColor={neutralRoles['on background alt']}
              onColor={neutralRoles?.background}
              bgRole='on background alt'
            />
          </div>
        </div>
        {/* Semantic Color Roles ------------- */}
        <div className='bg-neutral-base-300 border-neutral-border/20 row-grid col-span-full gap-12 rounded-xl border p-4 shadow-xl shadow-black/5'>
          <h2 className='font-h4 col-span-full text-center'>
            Ruoli Colori Semantici
          </h2>
          {/* Error ------ */}
          <div className='perfect-center col-span-full'>
            <Badge
              text='Errore'
              bg={semanticRoles?.error?.soft}
              txt={semanticRoles?.error['on soft']}
              className=''
            />
          </div>
          <div className='col-span-full flex flex-col gap-10 md:max-h-60 md:flex-row'>
            <RoleCard
              bgColor={semanticRoles?.error?.solid}
              onColor={semanticRoles?.error['on solid']}
              bgRole='solid'
              onRole='on solid'
            />
            <RoleCard
              bgColor={semanticRoles?.error?.soft}
              onColor={semanticRoles?.error['on soft']}
              bgRole='solid'
              onRole='on solid'
            />
          </div>
          {/* Warning ------ */}
          <div className='perfect-center col-span-full'>
            <Badge
              text='Attenzione'
              bg={semanticRoles?.warning?.soft}
              txt={semanticRoles?.warning['on soft']}
              className=''
            />
          </div>
          <div className='col-span-full flex flex-col gap-10 md:max-h-60 md:flex-row'>
            <RoleCard
              bgColor={semanticRoles?.warning?.solid}
              onColor={semanticRoles?.warning['on solid']}
              bgRole='solid'
              onRole='on solid'
            />
            <RoleCard
              bgColor={semanticRoles?.warning?.soft}
              onColor={semanticRoles?.warning['on soft']}
              bgRole='soft'
              onRole='on soft'
            />
          </div>
          {/* Success ------ */}
          <div className='perfect-center col-span-full'>
            <Badge
              text='Successo'
              bg={semanticRoles?.success?.soft}
              txt={semanticRoles?.success['on soft']}
              className=''
            />
          </div>
          <div className='col-span-full flex flex-col gap-10 md:max-h-60 md:flex-row'>
            <RoleCard
              bgColor={semanticRoles?.success?.solid}
              onColor={semanticRoles?.success['on solid']}
              bgRole='solid'
              onRole='on solid'
            />
            <RoleCard
              bgColor={semanticRoles?.success?.soft}
              onColor={semanticRoles?.success['on soft']}
              bgRole='soft'
              onRole='on soft'
            />
          </div>
          {/* Info ------ */}
          <div className='perfect-center col-span-full'>
            <Badge
              text='Info'
              bg={semanticRoles?.info?.soft}
              txt={semanticRoles?.info['on soft']}
              className=''
            />
          </div>
          <div className='col-span-full flex flex-col gap-10 md:max-h-60 md:flex-row'>
            <RoleCard
              bgColor={semanticRoles?.info?.solid}
              onColor={semanticRoles?.info['on solid']}
              bgRole='solid'
              onRole='on solid'
            />
            <RoleCard
              bgColor={semanticRoles?.info?.soft}
              onColor={semanticRoles?.info['on soft']}
              bgRole='soft'
              onRole='on soft'
            />
          </div>
        </div>
        {/* --- Palettes ----------------------------------------- */}
        <div className='bg-neutral-base-300 border-neutral-border/20 perfect-center col-span-full flex-col gap-2 rounded-xl border p-4 shadow-xl shadow-black/5'>
          <h2 className='font-h4 col-span-full mb-8 text-center'>
            Palette Colori
          </h2>
          {/* base palette */}
          <div className='flex w-fit items-center overflow-hidden rounded-sm'>
            {basePalette.map((color, i) => {
              return (
                <>
                  <div
                    className='aspect-square size-8'
                    style={{ backgroundColor: `${color}` }}
                  />
                </>
              );
            })}
          </div>
          {/* neutral palette */}
          <div className='flex w-fit items-center overflow-hidden rounded-sm'>
            {neutralPalette.map((color, i) => {
              return (
                <>
                  <div
                    className='aspect-square size-8'
                    style={{ backgroundColor: `${color}` }}
                  />
                </>
              );
            })}
          </div>
          {/* error palette */}
          <div className='flex w-fit items-center overflow-hidden rounded-sm'>
            {semanticPalette?.error.map((color, i) => {
              return (
                <>
                  <div
                    className='aspect-square size-8'
                    style={{ backgroundColor: `${color}` }}
                  />
                </>
              );
            })}
          </div>
          {/* warning palette */}
          <div className='flex w-fit items-center overflow-hidden rounded-sm'>
            {semanticPalette?.warning.map((color, i) => {
              return (
                <>
                  <div
                    className='aspect-square size-8'
                    style={{ backgroundColor: `${color}` }}
                  />
                </>
              );
            })}
          </div>
          {/* success palette */}
          <div className='flex w-fit items-center overflow-hidden rounded-sm'>
            {semanticPalette?.success.map((color, i) => {
              return (
                <>
                  <div
                    className='aspect-square size-8'
                    style={{ backgroundColor: `${color}` }}
                  />
                </>
              );
            })}
          </div>
          {/* info palette */}
          <div className='flex w-fit items-center overflow-hidden rounded-sm'>
            {semanticPalette?.info.map((color, i) => {
              return (
                <>
                  <div
                    className='aspect-square size-8'
                    style={{ backgroundColor: `${color}` }}
                  />
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
