const DELAYS = ["0ms", "-400ms", "-200ms", "-600ms", "-300ms"];

export default function Equalizer() {
  return (
    <span aria-hidden="true" className="flex h-4 items-end gap-[2px]">
      {DELAYS.map((delay) => (
        <span
          key={delay}
          className="h-full w-[3px] origin-bottom animate-eq bg-accent motion-reduce:animate-none motion-reduce:scale-y-50"
          style={{ animationDelay: delay }}
        />
      ))}
    </span>
  );
}
