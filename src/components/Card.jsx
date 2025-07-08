import Tag from './Tag.jsx';

export default function Card({ color, colorClassname }) {
  return (
    <>
      <div className='flex w-full flex-col items-center gap-2'>
        <div
          className={`flex aspect-video max-h-20 w-full items-end justify-end rounded-lg p-2 ${colorClassname}`}
          style={{ backgroundColor: `${color}` }}></div>
        <Tag color={color} />
      </div>
    </>
  );
}
