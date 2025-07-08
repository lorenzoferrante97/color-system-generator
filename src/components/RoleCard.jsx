import Tag from './Tag.jsx';

export default function RoleCard({
  bgColor,
  onColor,
  bgRole = 'solid',
  onRole,
  colorClassname,
}) {
  return (
    <>
      <div className='flex w-full flex-col items-center gap-2'>
        {/* on color text */}
        {onRole && <Tag color={onColor} />}
        {/* bg color */}
        <div
          className={`flex aspect-video min-h-20 w-full flex-col rounded-lg p-2 ${onRole ? 'justify-between' : 'justify-end'} ${colorClassname}`}
          style={{ backgroundColor: `${bgColor}` }}>
          {/* on color */}
          {onRole && (
            <div
              className={`flex aspect-video max-h-20 w-full flex-col items-center rounded-md p-2 ${colorClassname}`}
              style={{ backgroundColor: `${onColor}` }}>
              {/* on color role */}
              <span
                className='font-body-m-bold'
                style={{ color: `${bgColor}` }}>
                {onRole}
              </span>
            </div>
          )}
          {/* bg color role */}
          <span
            className='font-body-m-bold self-center'
            style={{ color: `${onColor}` }}>
            {bgRole}
          </span>
        </div>
        {/* bg color text */}
        <Tag color={bgColor} />
      </div>
    </>
  );
}
