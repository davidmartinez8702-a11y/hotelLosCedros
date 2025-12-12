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
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, CpuIcon, Folder, LayoutGrid, UserIcon, Tags, NfcIcon, UtensilsCrossed, HotelIcon, BoxIcon, DnaIcon, BookPlus, ClipboardCheck, Shapes, FolderCheck } from 'lucide-react';
//import SolarPanelIcon from '@/components/shared/SolarPanelIcon';
import AppLogo from './app-logo';
import usuarios from '@/routes/usuarios';
import configuracion from '@/routes/configuracion';
import { route } from 'ziggy-js';
import servicios from '@/routes/servicios';
import categorias from '@/routes/categorias';
import platillos from '@/routes/platillos';
import tipoHabitacion from '@/routes/tipo-habitacion';
import Habitacion from '@/routes/habitaciones';

interface CustomNavItem extends NavItem {
    roles: string[];
}
const mainNavItems: CustomNavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
        roles: ['administrador', 'recepcionista', 'cliente'],
    },
    {
        title: 'Mis Reservas',
        href: route('clientes.mis-reservas.index'),
        icon: FolderCheck,
        roles: ['cliente'],
    },
    {
        title: 'Usuarios',
        href: usuarios.index(),
        icon: UserIcon,
        roles: ['administrador', 'recepcionista'],
    },
    {
        title: 'Categorías',
        href: categorias.index(),
        icon: Tags,
        roles: ['administrador', 'recepcionista'],
    },
    {
        title: 'Servicios',
        href: servicios.index(),
        icon: NfcIcon,
        roles: ['administrador', 'recepcionista'],
    },
    {
        title: 'Platillos',
        href: platillos.index(),
        icon: UtensilsCrossed,
        roles: ['administrador', 'recepcionista'],
    },
    {
        title:'Tipo De Habitacion',
        //href: route('tipo-habitacion.index'),
        href:tipoHabitacion.index(),
        icon:HotelIcon,
        roles: ['administrador', 'recepcionista'],
    },
        {
        title:'Habitaciones',
        //href: route('tipo-habitacion.index'),
        href:Habitacion.index(),
        icon:HotelIcon,
        roles: ['administrador', 'recepcionista'],
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
        roles: ['administrador'],
    },
    {
        title:'Predicciones',
        //href: route('tipo-habitacion.index'),
        href:route('predicciones.index'),
        icon:BoxIcon,
        roles: ['administrador'],
    },
    {
        title:'K-Means',
        href:route('kmeans.index'),
        icon:DnaIcon,
        roles: ['administrador'],
    },

    {
        title:'Reservas',
        href:route('recepcion.reservas.index'),
        icon:BookPlus,
        roles: ['administrador', 'recepcionista'],
    },
    {
        title:'Check-in',
        href:route('recepcion.checkins.index'),
        icon:ClipboardCheck,
        roles: ['administrador', 'recepcionista'],
    },
    {
        title:'Promos',
        href:route('promos.index'),
        icon:Shapes,
        roles: ['administrador', 'recepcionista'],
    },
    {
        title: 'Configuracion',
        href: configuracion.index(),
        icon: CpuIcon,
        roles: ['administrador', 'recepcionista'],
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
    const { auth } = usePage<SharedData>().props;
    console.log("auth.user.rol ", auth.user.rol);
    const userRole = auth.user.rol ?? 'cliente';
    const filteredNavItems = mainNavItems.filter(item => 
        item.roles.includes(userRole)
    );
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
                <NavMain items={filteredNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
