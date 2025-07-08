export default function Badge({ text, bg, txt, className }) {
  return (
    <>
      <span
        className={`font-body-m-bold w-fit rounded-full px-3 py-1 ${className}`}
        style={{ color: `${txt}`, backgroundColor: `${bg}` }}>
        {text}
      </span>
    </>
  );
}
