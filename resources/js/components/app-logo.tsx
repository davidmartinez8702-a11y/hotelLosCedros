import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    const logoSrc = '/images/cedros_blanco.png';
    return (
        <>
             <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>
             
             {/* <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-transparent">
                <img 
                    src={logoSrc} // Usamos la URL procesada
                    alt="Hotel Los Cedros Logo"
                    className="size-8 rounded-md object-cover"
                />
            </div> */}
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Hotel Los Cedros Resort
                </span>
            </div>
        </>
    );
}
