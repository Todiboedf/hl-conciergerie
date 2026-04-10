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
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden font-sans uppercase tracking-[0.18em] font-medium transition-all duration-500 ease-out cursor-pointer select-none whitespace-nowrap";

function getVariantClasses(variant: Variant) {
  switch (variant) {
    case "primary":
      return "bg-gold text-black border border-gold hover:bg-gold-dark hover:border-gold-dark hover:shadow-[0_0_40px_-8px_rgba(201,168,76,0.55)]";
    case "secondary":
      return "bg-transparent text-bone border border-gold/50 hover:border-gold hover:bg-gold/5 hover:shadow-[0_0_40px_-12px_rgba(201,168,76,0.45)]";
    case "ghost":
      return "bg-transparent text-bone border border-transparent hover:text-gold";
  }
}

export function PremiumButton(props: PremiumButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    withArrow = false,
    className,
  } = props;

  const classes = cn(
    baseClasses,
    sizeMap[size],
    getVariantClasses(variant),
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

  const { href: _href, variant: _v, size: _s, withArrow: _a, className: _c, ...buttonProps } =
    props as ButtonProps;
  void _href;
  void _v;
  void _s;
  void _a;
  void _c;

  return (
    <button className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
