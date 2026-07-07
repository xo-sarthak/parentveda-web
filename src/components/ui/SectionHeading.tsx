import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

type Props = {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  accent?: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  accent,
  subtitle,
  align = "center",
  className = "",
}: Props) {
  const alignCls =
    align === "center"
      ? "mx-auto items-center text-center"
      : "items-start text-left";
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignCls} ${className}`}>
      {eyebrow ? (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}
      <Reveal delay={0.05}>
        <h2 className="text-balance font-display text-[2.05rem] font-medium leading-[1.08] tracking-[-0.02em] text-ink-900 sm:text-[2.6rem]">
          {title}
          {accent ? (
            <>
              {" "}
              <span className="text-gradient italic">{accent}</span>
            </>
          ) : null}
        </h2>
      </Reveal>
      {subtitle ? (
        <Reveal delay={0.1}>
          <p className="max-w-xl text-pretty text-[1.02rem] leading-relaxed text-ink-600 sm:text-lg">
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
