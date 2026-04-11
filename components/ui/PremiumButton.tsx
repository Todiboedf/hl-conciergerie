"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode, ButtonHTMLAttributes } from "react";
import { ArrowUpRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  /**
   * Active la palette pour fonds crème. Les variantes `secondary` et
   * `ghost` passent du texte `bone` (invisible sur crème) au texte noir
   * avec bordures et hovers `gold-dark`. Laisser `false` (défaut) sur
   * fond noir. Sans effet sur la variante `primary` (or/noir déjà
   * contrastant sur tous les fonds).
   */
  onCream?: boolean;
  className?: string;
}

interface ButtonProps
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> {
  href?: undefined;
}

interface LinkProps extends BaseProps {
  href: string;
  target?: string;
  rel?: string;
}

type PremiumButtonProps = ButtonProps | LinkProps;

const sizeMap: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[11px]",
  md: "px-7 py-3.5 text-[12px]",
  lg: "px-9 py-4 text-[13px]",
};

const baseClasses =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden font-sans uppercase tracking-[0.18em] font-medium cursor-pointer select-none whitespace-nowrap transition-[transform,box-shadow,background-color,border-color,color] duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2";

function getVariantClasses(variant: Variant, onCream: boolean) {
  switch (variant) {
    case "primary":
      // Or sur noir : contrastant partout, pas d'override crème nécessaire.
      return "bg-gold text-black border border-gold hover:bg-gold-dark hover:border-gold-dark hover:-translate-y-px hover:scale-[1.015] hover:shadow-[0_8px_24px_-8px_rgba(201,168,76,0.4)] focus-visible:ring-offset-black";
    case "secondary":
      return onCream
        ? "bg-transparent text-black border border-gold-dark/60 hover:border-gold-dark hover:bg-gold-dark/5 hover:text-black hover:-translate-y-px hover:scale-[1.015] hover:shadow-[0_8px_24px_-10px_rgba(138,112,48,0.35)] focus-visible:ring-offset-cream"
        : "bg-transparent text-bone border border-gold/50 hover:border-gold hover:bg-gold/5 hover:-translate-y-px hover:scale-[1.015] hover:shadow-[0_8px_24px_-10px_rgba(201,168,76,0.35)] focus-visible:ring-offset-black";
    case "ghost":
      return onCream
        ? "bg-transparent text-black border border-gold-dark/60 hover:text-gold-dark hover:border-gold-dark hover:bg-gold-dark/5 focus-visible:ring-offset-cream"
        : "bg-transparent text-bone border border-transparent hover:text-gold focus-visible:ring-offset-black";
  }
}

export function PremiumButton(props: PremiumButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    withArrow = false,
    onCream = false,
    className,
  } = props;

  const classes = cn(
    baseClasses,
    sizeMap[size],
    getVariantClasses(variant, onCream),
    className,
  );

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {withArrow && (
          <ArrowUpRight
            size={14}
            strokeWidth={1.5}
            className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        )}
      </span>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
    </>
  );

  if ("href" in props && props.href !== undefined) {
    return (
      <Link href={props.href} target={props.target} rel={props.rel} className={classes}>
        {content}
      </Link>
    );
  }

  const {
    href: _href,
    variant: _v,
    size: _s,
    withArrow: _a,
    onCream: _oc,
    className: _c,
    ...buttonProps
  } = props as ButtonProps;
  void _href;
  void _v;
  void _s;
  void _a;
  void _oc;
  void _c;

  return (
    <button className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
