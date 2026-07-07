/**
 * ParentVeda wordmark — the official parent-&-child heart mark (a purple
 * parent cradling a coral child) beside the "ParentVeda" wordmark in
 * Plus Jakarta Sans. The mark is the official brand asset, served as a
 * transparent PNG from /public/parentveda-mark.png.
 */

import { asset } from "@/lib/site";

/* Intrinsic pixels of the official mark asset (used to keep aspect ratio).
   asset() prefixes the GitHub Pages sub-path so the raw <img> resolves there. */
const MARK_SRC = asset("/parentveda-mark.png");
const MARK_W = 777;
const MARK_H = 889;

export function LogoMark({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const width = Math.round((size * MARK_W) / MARK_H);
  return (
    // Official brand mark (transparent PNG, static asset in /public). A plain
    // <img> keeps it zero-config and crisp at tiny sizes; drop-shadow utilities
    // passed via className still hug the mark's silhouette.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={MARK_SRC}
      alt="ParentVeda"
      width={width}
      height={size}
      className={className}
      style={{ width, height: size }}
      draggable={false}
    />
  );
}

/* PRESERVED — original hand-drawn inline-SVG mark (two hearts).
   Revert by restoring this in place of the image-based LogoMark above.
export function LogoMarkSVG({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="ParentVeda"
    >
      <path
        className="fill-brand-500"
        d="M32 51C16 40 9.5 31.5 9.5 23.6 9.5 17.2 14.3 12.8 20.1 12.8 24.7 12.8 28.7 15.4 32 20.4 35.3 15.4 39.3 12.8 43.9 12.8 49.7 12.8 54.5 17.2 54.5 23.6 54.5 31.5 48 40 32 51Z"
      />
      <path
        className="fill-coral-500"
        d="M32 41.5C24 36 20.7 31.7 20.7 27.6 20.7 24.3 23.1 22 26.1 22 28.4 22 30.5 23.4 32 26.1 33.5 23.4 35.6 22 37.9 22 40.9 22 43.3 24.3 43.3 27.6 43.3 31.7 40 36 32 41.5Z"
      />
    </svg>
  );
}
*/

export default function Logo({
  size = 38,
  withWordmark = true,
  className = "",
  wordmarkClassName = "",
}: {
  size?: number;
  withWordmark?: boolean;
  className?: string;
  wordmarkClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark
        size={size}
        className="shrink-0 drop-shadow-[0_6px_14px_rgba(45,20,76,0.16)]"
      />
      {withWordmark && (
        <span
          className={`font-heading font-extrabold leading-none tracking-[-0.02em] ${wordmarkClassName}`}
        >
          <span className="text-brand-800">Parent</span>
          <span className="text-brand-500">Veda</span>
        </span>
      )}
    </span>
  );
}
