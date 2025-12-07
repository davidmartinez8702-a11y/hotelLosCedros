import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, CpuIcon, Folder, LayoutGrid, UserIcon, Tags, NfcIcon, UtensilsCrossed } from 'lucide-react';
//import SolarPanelIcon from '@/components/shared/SolarPanelIcon';
import AppLogo from './app-logo';
import usuarios from '@/routes/usuarios';
import configuracion from '@/routes/configuracion';
import { route } from 'ziggy-js';
import servicios from '@/routes/servicios';
import categorias from '@/routes/categorias';
import platillos from '@/routes/platillos';


const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Usuarios',
        href: usuarios.index(),
        icon: UserIcon,
    },
    {
        title: 'Categorías',
        href: categorias.index(),
        icon: Tags,
    },
    {
        title: 'Servicios',
        href: servicios.index(),
        icon: NfcIcon,
        
    },
    {
        title: 'Platillos',
        href: platillos.index(),
        icon: UtensilsCrossed,
        
    },
    {
        title: 'Configuracion',
        href: configuracion.index(),
        icon: CpuIcon,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
