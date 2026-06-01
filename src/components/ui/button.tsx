import {
  type ButtonHTMLAttributes,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type ButtonSize = "default" | "icon";
type ButtonVariant = "default" | "ghost";

type CommonProps = {
  children: ReactNode;
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  render?: ReactElement<{ className?: string; children?: ReactNode }>;
  nativeButton?: boolean;
};

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-10 px-4 text-sm",
  icon: "size-9 p-0",
};

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "bg-fd-foreground text-fd-background hover:bg-fd-foreground/90 shadow-[0_8px_22px_rgba(2,6,23,0.16)]",
  ghost:
    "bg-transparent text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground",
};

export function Button({
  children,
  className,
  size = "default",
  variant = "default",
  render,
  nativeButton = true,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full border border-transparent font-medium transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-foreground/40 disabled:pointer-events-none disabled:opacity-60",
    sizeClasses[size],
    variantClasses[variant],
    className,
  );

  if (!nativeButton && render && isValidElement(render)) {
    const existingChildren = render.props.children;
    return cloneElement(render, {
      className: cn(render.props.className, classes),
      children: (
        <>
          {children}
          {existingChildren}
        </>
      ),
    });
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
