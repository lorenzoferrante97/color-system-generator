export default function Card({ color }) {
  return (
    <>
      <div
        className='flex aspect-video min-h-20 min-w-36 items-end justify-end p-2'
        style={{ backgroundColor: `${color}` }}></div>
    </>
  );
}
