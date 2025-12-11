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
import { BookOpen, CpuIcon, Folder, LayoutGrid, UserIcon, Tags, NfcIcon, UtensilsCrossed, HotelIcon, BoxIcon, DnaIcon, BookPlus, ClipboardCheck, Shapes } from 'lucide-react';
//import SolarPanelIcon from '@/components/shared/SolarPanelIcon';
import AppLogo from './app-logo';
import usuarios from '@/routes/usuarios';
import configuracion from '@/routes/configuracion';
import { route } from 'ziggy-js';
import servicios from '@/routes/servicios';
import categorias from '@/routes/categorias';
import platillos from '@/routes/platillos';
import tipoHabitacion from '@/routes/tipo-habitacion';


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
        title:'Tipo De Habitacion',
        //href: route('tipo-habitacion.index'),
        href:tipoHabitacion.index(),
        icon:HotelIcon,
    },
    // {
    //     title:'BI',
    //     //href: route('tipo-habitacion.index'),
    //     href:route('bi.index'),
    //     icon:BoxIcon,
    // },
    // {
    //     title:'BI Dinamico',
    //     //href: route('tipo-habitacion.index'),
    //     href:route('bi.index-dinamico'),
    //     icon:BoxIcon,
    // },
    {
        title:'BI',
        //href: route('tipo-habitacion.index'),
        href:route('bi.index-v2'),
        icon:BoxIcon,
    },
    {
        title:'Predicciones',
        //href: route('tipo-habitacion.index'),
        href:route('predicciones.index'),
        icon:BoxIcon,
    },
    {
        title:'K-Means',
        href:route('kmeans.index'),
        icon:DnaIcon,
    },

    {
        title:'Reservas',
        href:route('recepcion.reservas.index'),
        icon:BookPlus,
    },
    {
        title:'Check-in',
        href:route('recepcion.checkins.index'),
        icon:ClipboardCheck,
    },
    {
        title:'Promos',
        href:route('promos.index'),
        icon:Shapes,
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
