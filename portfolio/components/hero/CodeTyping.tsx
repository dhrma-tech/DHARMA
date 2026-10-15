// Three indented "lines of code" written in turn, with a blinking caret on the last.
const LINES = [
  { indent: "0%", width: "70%", delay: "0ms" },
  { indent: "25%", width: "75%", delay: "350ms" },
  { indent: "25%", width: "45%", delay: "700ms" },
];

export default function CodeTyping() {
  return (
    <span aria-hidden="true" className="flex h-5 w-7 shrink-0 flex-col justify-center gap-[3px]">
      {LINES.map(({ indent, width, delay }, i) => (
        <span key={i} className="flex h-[3px] items-center" style={{ paddingLeft: indent }}>
          <span
            className="h-full origin-left animate-type rounded-full bg-accent motion-reduce:animate-none"
            style={{ width, animationDelay: delay }}
          />
          {i === LINES.length - 1 && (
            <span className="ml-[2px] h-[7px] w-[2px] animate-blink bg-fg motion-reduce:animate-none" />
          )}
        </span>
      ))}
    </span>
  );
}
