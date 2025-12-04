import * as React from 'react';

// Se puede usar la librería 'clsx' o 'tailwind-merge' para manejar clases condicionales
// Si no las tienes, puedes usar una función simple o concatenar cadenas.
// Usaremos la concatenación simple para mantener la portabilidad.

const Textarea = React.forwardRef<
    HTMLTextAreaElement,
    React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
    // Estilos base de Shadcn/UI adaptados a Tailwind
    const baseStyle = "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y";

    // Combina los estilos base con las clases opcionales proporcionadas
    const combinedClassName = `${baseStyle} ${className || ''}`;

    return (
        <textarea
            className={combinedClassName}
            ref={ref}
            {...props}
        />
    );
});
Textarea.displayName = 'Textarea';

export { Textarea };