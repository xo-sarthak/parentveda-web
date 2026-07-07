import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-white shadow-soft hover:bg-brand-600 hover:shadow-float",
  secondary:
    "bg-surface text-brand-700 ring-1 ring-brand-500/20 shadow-soft hover:ring-brand-500/40 hover:bg-mist/60",
  ghost: "text-brand-700 hover:bg-mist",
  whatsapp:
    "bg-wa text-white shadow-soft hover:bg-wa-dark hover:shadow-[0_18px_44px_-16px_rgba(37,211,102,0.55)]",
};

const SIZES: Record<Size, string> = {
  sm: "h-11 gap-1.5 px-4 text-sm",
  md: "h-[52px] gap-2 px-6 text-[0.95rem]",
  lg: "h-[58px] gap-2.5 px-7 text-base",
};

const BASE =
  "group inline-flex select-none items-center justify-center rounded-btn font-sans font-semibold leading-none transition-all duration-300 ease-out active:scale-[0.985] disabled:pointer-events-none disabled:opacity-60";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: ReactNode;
  children: ReactNode;
};

type ButtonProps = BaseProps &
  (
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  );

export default function Button(props: ButtonProps) {
  const cls = `${BASE} ${VARIANTS[props.variant ?? "primary"]} ${
    SIZES[props.size ?? "md"]
  } ${props.className ?? ""}`;

  if (props.href !== undefined) {
    const { variant, size, className, icon, children, href, ...rest } = props;
    void variant;
    void size;
    void className;
    return (
      <a href={href} className={cls} {...rest}>
        {icon ? <span className="shrink-0">{icon}</span> : null}
        {children}
      </a>
    );
  }

  const { variant, size, className, icon, children, ...rest } = props;
  void variant;
  void size;
  void className;
  return (
    <button className={cls} {...rest}>
      {icon ? <span className="shrink-0">{icon}</span> : null}
      {children}
    </button>
  );
}
