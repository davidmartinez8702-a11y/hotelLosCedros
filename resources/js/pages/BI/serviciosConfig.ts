// Mapeo de servicios a IDs
// IMPORTANTE: Estos IDs deben coincidir con los IDs reales en la base de datos
export const serviciosMap: Record<string, number> = {
    gym: 1,
    spa: 2,
    piscina: 3,
    restaurant: 4,
    roomService: 5,
    lavanderia: 6,
};

// Mapeo inverso para obtener el nombre del servicio por ID
export const serviciosMapInverso: Record<number, string> = {
    1: 'gym',
    2: 'spa',
    3: 'piscina',
    4: 'restaurant',
    5: 'roomService',
    6: 'lavanderia',
};

// Mapeo de períodos frontend a backend
export const periodosMap: Record<string, string> = {
    hoy: 'hoy',
    semana: 'semana',
    mes: 'mes',
    anio: 'anio',
};
