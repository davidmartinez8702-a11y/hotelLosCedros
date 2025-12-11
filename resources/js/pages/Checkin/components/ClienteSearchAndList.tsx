// ClienteSearchAndList.tsx

import React from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Users } from 'lucide-react';

interface ClienteDisponible {
    id: number;
    nombre: string;
    email: string;
    telefono: string;
}

interface PaginatedData<T> {
    data: T[];
    links: { url: string | null, label: string, active: boolean }[];
}

interface Props {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filteredClientes: ClienteDisponible[];
    clientesEnBolsaIds: number[];
    clientesDisponiblesPaginated: PaginatedData<ClienteDisponible>;
    addClienteToBag: (cliente: ClienteDisponible) => void;
}

export default function ClienteSearchAndList({ 
    searchTerm, 
    setSearchTerm, 
    filteredClientes, 
    clientesEnBolsaIds,
    clientesDisponiblesPaginated,
    addClienteToBag,
}: Props) {
    
    // Función para manejar la paginación (llama al backend para nueva data)
    const handlePagination = (url: string | null) => {
        if (url) {
            router.get(url, { search: searchTerm }, { preserveState: true, replace: true });
        }
    };

    return (
        <div className="border-b pb-4 space-y-3">
            <h3 className="text-lg font-semibold mb-2">Añadir Huésped Adicional</h3>
            
            {/* Input de Búsqueda */}
            <div className="flex items-center gap-2">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar por nombre, email o teléfono..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {/* Botón de búsqueda aquí si el router.get se hiciera por un botón,
                pero en esta implementación, la búsqueda es local (JS filter). 
                La paginación sí requiere router.get. */}
            </div>
            
            {/* Resultados de la Búsqueda Local y Paginación */}
            {filteredClientes.length > 0 ? (
                <>
                    <div className="border rounded-lg max-h-64 overflow-y-auto">
                        {filteredClientes.map(cliente => (
                            <div 
                                key={cliente.id} 
                                className="flex justify-between items-center p-3 border-b hover:bg-gray-100"
                            >
                                <div>
                                    <p className="font-medium">{cliente.nombre}</p>
                                    <p className="text-xs text-muted-foreground">{cliente.email}</p>
                                </div>
                                <Button 
                                    type="button"
                                    variant="secondary" 
                                    size="sm"
                                    onClick={() => addClienteToBag(cliente)}
                                    // La exclusión del cliente principal ya está en el filtro,
                                    // pero aquí verificamos si ya fue agregado a la bolsa de esta página.
                                    disabled={clientesEnBolsaIds.includes(cliente.id)}
                                >
                                    Agregar
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* Paginación */}
                    <div className="flex justify-between items-center text-sm pt-2">
                         {/* <p className="text-muted-foreground">
                            Pág. {clientesDisponiblesPaginated.current_page} de {clientesDisponiblesPaginated.last_page}
                        </p> */}
                        <div className="flex gap-1">
                            {/* Renderiza los enlaces de paginación de Laravel, excluyendo los extremos (First, Last) si quieres un diseño compacto */}
                            {clientesDisponiblesPaginated.links.map((link) => (
                                <Button
                                    key={link.label}
                                    variant={link.active ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => handlePagination(link.url)}
                                    disabled={!link.url}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className="min-w-[30px]"
                                />
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <p className="text-sm italic text-center text-muted-foreground">
                    {searchTerm 
                        ? 'No se encontraron clientes que coincidan en esta página.' 
                        : 'Busque un cliente por nombre, email o teléfono.'
                    }
                </p>
            )}
        </div>
    );
}