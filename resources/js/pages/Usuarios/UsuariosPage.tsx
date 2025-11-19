// import {route} from 'ziggy-js';
// import { Head, Link } from '@inertiajs/react';
// import { Plus, Pencil, Trash2 } from 'lucide-react'; 
// import { UserProp} from "./usuarios"; 
// import AppLayout from '@/layouts/app-layout';
// import { Pagination } from '../shared/interfaces/paginacion';

// interface UsuariosPageProp {
//     usuariosPaginados: Pagination<UserProp>; 
// }

// export default function UsuariosPage({ usuariosPaginados }: UsuariosPageProp) {
    
//     const { data: userList, links: paginationLinks, total, per_page, from, to } = usuariosPaginados; 

//     const breadcrumbs = [
//         { title: 'Gestión', href: route('dashboard') }, 
//         { title: 'Usuarios', href: route('usuarios.index') }
//     ];

//     const handleDelete = (userId: number, userName: string) => {
//         if (confirm(`¿Estás seguro de que deseas eliminar a ${userName}?`)) {
//             // Ejemplo: Inertia.delete(route('usuarios.destroy', userId));
//             console.log(`Eliminando usuario con ID: ${userId}`);
//         }
//     };

//     return (
//         <AppLayout breadcrumbs={breadcrumbs}>
//             <Head title="Usuarios" />

//             <div className="py-8 lg:py-12">
//                 <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
           
//                     <div className="bg-white shadow-xl sm:rounded-xl overflow-hidden">
                        
//                         <div className="p-6 md:p-8">
                            
                           
//                             <div className="flex justify-between items-center mb-6 border-b pb-4">
//                                 <h3 className="text-2xl font-extrabold text-gray-900">
//                                     Usuarios
//                                 </h3>
                                
//                                 <Link 
//                                     href={route('usuarios.create')}
//                                     className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-full font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 transition ease-in-out duration-150 shadow-md"
//                                 >
//                                     <Plus className="w-4 h-4 mr-1" />
//                                     Nuevo Usuario
//                                 </Link>
//                             </div>

//                             {/* TABLA DE DATOS */}
//                             <div className="overflow-x-auto">
//                                 <table className="min-w-full divide-y divide-gray-200">
//                                     <thead className="bg-gray-50">
//                                         <tr>
//                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
//                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
//                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                                             <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody className="bg-white divide-y divide-gray-100">
//                                         {userList.map((user: UserProp) => (
//                                             <tr key={user.id} className="hover:bg-gray-50 transition duration-150">
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.name}</td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                    
//                                                     {/* Botón Editar */}
//                                                     <Link href={route('usuarios.edit', user.id)} className="text-indigo-600 hover:text-indigo-800 transition duration-150 p-1 rounded-md hover:bg-indigo-50">
//                                                         <Pencil className="w-4 h-4 inline-block" />
//                                                     </Link>

//                                                     {/* Botón Eliminar */}
//                                                     <button onClick={() => handleDelete(user.id, user.name)} className="text-red-600 hover:text-red-800 transition duration-150 p-1 rounded-md hover:bg-red-50">
//                                                         <Trash2 className="w-4 h-4 inline-block" />
//                                                     </button>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                         {userList.length === 0 && (
//                                             <tr>
//                                                 <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
//                                                     No se encontraron usuarios registrados.
//                                                 </td>
//                                             </tr>
//                                         )}
//                                     </tbody>
//                                 </table>
//                             </div>

//                             {/* Paginación */}
                            
//                             <div className="mt-6 border-t pt-4 flex justify-between items-center flex-wrap">
//                                 <span className="text-sm text-gray-600 mb-2 sm:mb-0">
//                                     Mostrando {from} a {to} de {total} resultados
//                                 </span>
//                                 <div className="flex space-x-1">
//                                     {paginationLinks.map((link, index) => (
//                                         <Link
//                                             key={index}
//                                             href={link.url || '#'}
//                                             className={`px-3 py-1 text-sm rounded-md transition duration-150 ${
//                                                 link.active
//                                                     ? 'bg-indigo-600 text-white shadow-md'
//                                                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                                             } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
//                                             dangerouslySetInnerHTML={{ __html: link.label }}
//                                         />
//                                     ))}
//                                 </div>
//                             </div>
                            

//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </AppLayout>
//     );
// }



import {route} from 'ziggy-js';
import { Head, Link } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react'; 
import { UserProp} from "./usuarios"; 
import AppLayout from '@/layouts/app-layout';
import { Pagination } from '../shared/interfaces/paginacion';

interface UsuariosPageProp {
    usuariosPaginados: Pagination<UserProp>; 
}

export default function UsuariosPage({ usuariosPaginados }: UsuariosPageProp) {
    
    const { data: userList, links: paginationLinks, total, per_page, from, to } = usuariosPaginados; 

    const breadcrumbs = [
        { title: 'Gestión', href: route('dashboard') }, 
        { title: 'Usuarios', href: route('usuarios.index') }
    ];

    const handleDelete = (userId: number, userName: string) => {
        if (confirm(`¿Estás seguro de que deseas eliminar a ${userName}?`)) {
            // Ejemplo: Inertia.delete(route('usuarios.destroy', userId));
            console.log(`Eliminando usuario con ID: ${userId}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Usuarios" />

            <div className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
           
                    {/* Card principal - Adaptable a dark mode */}
                    <div className="bg-white dark:bg-gray-800 shadow-xl sm:rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                        
                        <div className="p-6 md:p-8">
                            
                            {/* Header con título y botón */}
                            <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                                    Usuarios
                                </h3>
                                
                                <Link 
                                    href={route('usuarios.create')}
                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 border border-transparent rounded-full font-semibold text-xs text-white uppercase tracking-widest transition ease-in-out duration-150 shadow-md"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Nuevo Usuario
                                </Link>
                            </div>

                            {/* TABLA DE DATOS */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-900">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                ID
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Nombre
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                                        {userList.map((user: UserProp) => (
                                            <tr 
                                                key={user.id} 
                                                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {user.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                                    {user.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {user.email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                    
                                                    {/* Botón Editar */}
                                                    <Link 
                                                        href={route('usuarios.edit', user.id)} 
                                                        className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition duration-150 p-1 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                                                    >
                                                        <Pencil className="w-4 h-4 inline-block" />
                                                    </Link>

                                                    {/* Botón Eliminar */}
                                                    <button 
                                                        onClick={() => handleDelete(user.id, user.name)} 
                                                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition duration-150 p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30"
                                                    >
                                                        <Trash2 className="w-4 h-4 inline-block" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {userList.length === 0 && (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                                    No se encontraron usuarios registrados.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Paginación */}
                            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-center flex-wrap gap-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Mostrando {from} a {to} de {total} resultados
                                </span>
                                <div className="flex flex-wrap gap-1">
                                    {paginationLinks.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-3 py-1 text-sm rounded-md transition duration-150 ${
                                                link.active
                                                    ? 'bg-indigo-600 text-white dark:bg-indigo-500 shadow-md'
                                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                            } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}