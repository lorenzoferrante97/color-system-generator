export default function Card({ color }) {
  return (
    <>
      <div
        className={`aspect-video min-h-20 min-w-36 bg-[var(${color})]`}></div>
    </>
  );
}
