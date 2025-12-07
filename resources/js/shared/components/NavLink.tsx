import { Link as InertiaLink, InertiaLinkProps } from "@inertiajs/react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<InertiaLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, href, ...props }, ref) => {
    // Aquí puedes agregar lógica adicional si necesitas manejar clases activas manualmente
    return (
      <InertiaLink
        ref={ref}
        href={href}
        className={cn(className, activeClassName)}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };