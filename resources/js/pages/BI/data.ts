// ==================== FILTROS ====================
export const periodoFilterOptions = [
    { value: "semana", label: "Esta Semana" },
    { value: "mes", label: "Este Mes" },
    { value: "trimestre", label: "Este Trimestre" },
    { value: "año", label: "Este Año" },
];

export const añoFilterOptions = [
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
];

// ==================== OCUPACIÓN ====================
export const ocupacionMensual = [
    { mes: "Ene", ocupacion: 65, meta: 72 },
    { mes: "Feb", ocupacion: 72, meta: 72 },
    { mes: "Mar", ocupacion: 78, meta: 75 },
    { mes: "Abr", ocupacion: 74, meta: 75 },
    { mes: "May", ocupacion: 82, meta: 78 },
    { mes: "Jun", ocupacion: 89, meta: 82 },
    { mes: "Jul", ocupacion: 95, meta: 88 },
    { mes: "Ago", ocupacion: 97, meta: 90 },
    { mes: "Sep", ocupacion: 85, meta: 80 },
    { mes: "Oct", ocupacion: 79, meta: 78 },
    { mes: "Nov", ocupacion: 73, meta: 75 },
    { mes: "Dic", ocupacion: 91, meta: 88 },
];

export const ocupacionSemanal = [
    { semana: "Sem 1", ocupacion: 78, meta: 75 },
    { semana: "Sem 2", ocupacion: 82, meta: 75 },
    { semana: "Sem 3", ocupacion: 75, meta: 75 },
    { semana: "Sem 4", ocupacion: 88, meta: 80 },
    { semana: "Sem 5", ocupacion: 91, meta: 80 },
    { semana: "Sem 6", ocupacion: 85, meta: 80 },
    { semana: "Sem 7", ocupacion: 79, meta: 78 },
    { semana: "Sem 8", ocupacion: 83, meta: 78 },
    { semana: "Sem 9", ocupacion: 87, meta: 82 },
    { semana: "Sem 10", ocupacion: 92, meta: 85 },
    { semana: "Sem 11", ocupacion: 89, meta: 85 },
    { semana: "Sem 12", ocupacion: 94, meta: 88 },
];

// ==================== INGRESOS ====================
export const ingresosMensuales = [
    { mes: "Ene", ingresos: 125000, gastos: 45000, beneficio: 80000 },
    { mes: "Feb", ingresos: 138000, gastos: 48000, beneficio: 90000 },
    { mes: "Mar", ingresos: 152000, gastos: 52000, beneficio: 100000 },
    { mes: "Abr", ingresos: 145000, gastos: 50000, beneficio: 95000 },
    { mes: "May", ingresos: 168000, gastos: 55000, beneficio: 113000 },
    { mes: "Jun", ingresos: 185000, gastos: 60000, beneficio: 125000 },
    { mes: "Jul", ingresos: 210000, gastos: 68000, beneficio: 142000 },
    { mes: "Ago", ingresos: 225000, gastos: 72000, beneficio: 153000 },
    { mes: "Sep", ingresos: 178000, gastos: 58000, beneficio: 120000 },
    { mes: "Oct", ingresos: 162000, gastos: 54000, beneficio: 108000 },
    { mes: "Nov", ingresos: 148000, gastos: 51000, beneficio: 97000 },
    { mes: "Dic", ingresos: 198000, gastos: 65000, beneficio: 133000 },
];

export const ingresosSemanales = [
    { semana: "Sem 1", ingresos: 42000, gastos: 14000, beneficio: 28000 },
    { semana: "Sem 2", ingresos: 45000, gastos: 15000, beneficio: 30000 },
    { semana: "Sem 3", ingresos: 38000, gastos: 13000, beneficio: 25000 },
    { semana: "Sem 4", ingresos: 52000, gastos: 17000, beneficio: 35000 },
    { semana: "Sem 5", ingresos: 55000, gastos: 18000, beneficio: 37000 },
    { semana: "Sem 6", ingresos: 48000, gastos: 16000, beneficio: 32000 },
    { semana: "Sem 7", ingresos: 51000, gastos: 17000, beneficio: 34000 },
    { semana: "Sem 8", ingresos: 58000, gastos: 19000, beneficio: 39000 },
];

// ==================== HUÉSPEDES ====================
export const huespedPorCategoria = [
    { categoria: "Negocios", cantidad: 1250, porcentaje: 32, fill: "#667eea" },
    { categoria: "Turismo", cantidad: 1680, porcentaje: 43, fill: "#10b981" },
    { categoria: "Familiar", cantidad: 580, porcentaje: 15, fill: "#f59e0b" },
    { categoria: "Eventos", cantidad: 390, porcentaje: 10, fill: "#ef4444" },
];

export const huespedPorNacionalidad = [
    { pais: "Bolivia", cantidad: 1850, porcentaje: 38, fill: "#667eea" },
    { pais: "Argentina", cantidad: 720, porcentaje: 15, fill: "#10b981" },
    { pais: "Brasil", cantidad: 580, porcentaje: 12, fill: "#f59e0b" },
    { pais: "Chile", cantidad: 485, porcentaje: 10, fill: "#ef4444" },
    { pais: "Perú", cantidad: 390, porcentaje: 8, fill: "#8b5cf6" },
    { pais: "USA", cantidad: 340, porcentaje: 7, fill: "#06b6d4" },
    { pais: "España", cantidad: 245, porcentaje: 5, fill: "#ec4899" },
    { pais: "Otros", cantidad: 290, porcentaje: 5, fill: "#6b7280" },
];

export const huespedMensuales = [
    { mes: "Ene", nuevos: 285, recurrentes: 120 },
    { mes: "Feb", nuevos: 310, recurrentes: 135 },
    { mes: "Mar", nuevos: 345, recurrentes: 148 },
    { mes: "Abr", nuevos: 328, recurrentes: 142 },
    { mes: "May", nuevos: 378, recurrentes: 165 },
    { mes: "Jun", nuevos: 420, recurrentes: 185 },
    { mes: "Jul", nuevos: 485, recurrentes: 212 },
    { mes: "Ago", nuevos: 510, recurrentes: 225 },
    { mes: "Sep", nuevos: 395, recurrentes: 175 },
    { mes: "Oct", nuevos: 358, recurrentes: 158 },
    { mes: "Nov", nuevos: 322, recurrentes: 145 },
    { mes: "Dic", nuevos: 445, recurrentes: 198 },
];

// ==================== RESERVAS ====================
export const reservasPorEstado = [
    { mes: "Ene", confirmadas: 285, pendientes: 45, canceladas: 32 },
    { mes: "Feb", confirmadas: 312, pendientes: 52, canceladas: 28 },
    { mes: "Mar", confirmadas: 358, pendientes: 48, canceladas: 35 },
    { mes: "Abr", confirmadas: 342, pendientes: 55, canceladas: 30 },
    { mes: "May", confirmadas: 395, pendientes: 62, canceladas: 38 },
    { mes: "Jun", confirmadas: 445, pendientes: 58, canceladas: 42 },
    { mes: "Jul", confirmadas: 512, pendientes: 72, canceladas: 48 },
    { mes: "Ago", confirmadas: 548, pendientes: 78, canceladas: 52 },
    { mes: "Sep", confirmadas: 425, pendientes: 65, canceladas: 40 },
    { mes: "Oct", confirmadas: 385, pendientes: 58, canceladas: 35 },
    { mes: "Nov", confirmadas: 348, pendientes: 52, canceladas: 30 },
    { mes: "Dic", confirmadas: 478, pendientes: 68, canceladas: 45 },
];

export const reservasPorCanal = [
    { canal: "Booking.com", reservas: 1580, porcentaje: 32, fill: "#667eea" },
    { canal: "Expedia", reservas: 985, porcentaje: 20, fill: "#10b981" },
    { canal: "Web Directa", reservas: 1230, porcentaje: 25, fill: "#f59e0b" },
    { canal: "Recepción", reservas: 640, porcentaje: 13, fill: "#ef4444" },
    { canal: "Airbnb", reservas: 295, porcentaje: 6, fill: "#8b5cf6" },
    { canal: "Agencias", reservas: 195, porcentaje: 4, fill: "#06b6d4" },
];

export const reservasPorTipoHabitacion = [
    { tipo: "Individual", reservas: 890, ingresoPromedio: 75 },
    { tipo: "Doble", reservas: 1650, ingresoPromedio: 120 },
    { tipo: "Suite", reservas: 780, ingresoPromedio: 250 },
    { tipo: "Suite Premium", reservas: 420, ingresoPromedio: 380 },
    { tipo: "Familiar", reservas: 850, ingresoPromedio: 180 },
    { tipo: "Presidencial", reservas: 135, ingresoPromedio: 550 },
];

// ==================== SERVICIOS ====================
export const calificacionServicios = [
    { servicio: "Recepción", calificacion: 4.8, evaluaciones: 2450 },
    { servicio: "Limpieza", calificacion: 4.7, evaluaciones: 2380 },
    { servicio: "Restaurante", calificacion: 4.5, evaluaciones: 1850 },
    { servicio: "Room Service", calificacion: 4.3, evaluaciones: 920 },
    { servicio: "Spa", calificacion: 4.9, evaluaciones: 680 },
    { servicio: "Gimnasio", calificacion: 4.4, evaluaciones: 520 },
    { servicio: "Piscina", calificacion: 4.6, evaluaciones: 780 },
    { servicio: "WiFi", calificacion: 4.2, evaluaciones: 2100 },
];

export const usoServiciosMensual = [
    { mes: "Ene", restaurante: 1250, spa: 185, gimnasio: 320, roomService: 420 },
    { mes: "Feb", restaurante: 1380, spa: 210, gimnasio: 345, roomService: 465 },
    { mes: "Mar", restaurante: 1520, spa: 245, gimnasio: 380, roomService: 510 },
    { mes: "Abr", restaurante: 1450, spa: 228, gimnasio: 365, roomService: 485 },
    { mes: "May", restaurante: 1680, spa: 268, gimnasio: 410, roomService: 545 },
    { mes: "Jun", restaurante: 1850, spa: 312, gimnasio: 458, roomService: 598 },
    { mes: "Jul", restaurante: 2150, spa: 385, gimnasio: 525, roomService: 685 },
    { mes: "Ago", restaurante: 2280, spa: 420, gimnasio: 568, roomService: 725 },
    { mes: "Sep", restaurante: 1780, spa: 295, gimnasio: 435, roomService: 565 },
    { mes: "Oct", restaurante: 1620, spa: 258, gimnasio: 395, roomService: 512 },
    { mes: "Nov", restaurante: 1480, spa: 225, gimnasio: 358, roomService: 468 },
    { mes: "Dic", restaurante: 1980, spa: 352, gimnasio: 485, roomService: 632 },
];

export const ingresosPorServicio = [
    { servicio: "Restaurante", ingresos: 71280, transacciones: 1980 },
    { servicio: "Spa", ingresos: 35200, transacciones: 352 },
    { servicio: "Room Service", ingresos: 18960, transacciones: 632 },
    { servicio: "Gimnasio", ingresos: 4850, transacciones: 485 },
    { servicio: "Lavandería", ingresos: 5600, transacciones: 145 },
    { servicio: "Minibar", ingresos: 12400, transacciones: 680 },
    { servicio: "Parking", ingresos: 9800, transacciones: 420 },
    { servicio: "Tours", ingresos: 22500, transacciones: 95 },
];

// ==================== COMPARATIVAS ====================
export const comparativaAnual = [
    { mes: "Ene", añoAnterior: 112000, añoActual: 125000 },
    { mes: "Feb", añoAnterior: 125000, añoActual: 138000 },
    { mes: "Mar", añoAnterior: 138000, añoActual: 152000 },
    { mes: "Abr", añoAnterior: 132000, añoActual: 145000 },
    { mes: "May", añoAnterior: 152000, añoActual: 168000 },
    { mes: "Jun", añoAnterior: 168000, añoActual: 185000 },
    { mes: "Jul", añoAnterior: 192000, añoActual: 210000 },
    { mes: "Ago", añoAnterior: 205000, añoActual: 225000 },
    { mes: "Sep", añoAnterior: 162000, añoActual: 178000 },
    { mes: "Oct", añoAnterior: 148000, añoActual: 162000 },
    { mes: "Nov", añoAnterior: 135000, añoActual: 148000 },
    { mes: "Dic", añoAnterior: 180000, añoActual: 198000 },
];

// ==================== PREDICCIONES ====================
export const prediccionesOcupacion = [
    { fecha: "Sem 1", prediccion: 82, minimo: 75, maximo: 89 },
    { fecha: "Sem 2", prediccion: 85, minimo: 78, maximo: 92 },
    { fecha: "Sem 3", prediccion: 88, minimo: 80, maximo: 95 },
    { fecha: "Sem 4", prediccion: 92, minimo: 85, maximo: 98 },
    { fecha: "Sem 5", prediccion: 78, minimo: 70, maximo: 85 },
    { fecha: "Sem 6", prediccion: 75, minimo: 68, maximo: 82 },
    { fecha: "Sem 7", prediccion: 80, minimo: 72, maximo: 88 },
    { fecha: "Sem 8", prediccion: 84, minimo: 76, maximo: 91 },
];

// ==================== KPIS ====================
export const kpisData = [
    {
        id: "ocupacion",
        titulo: "Tasa de Ocupación",
        valor: "87.5%",
        tendencia: "up" as const,
        porcentaje: 5.2,
        icono: "ocupacion" as const,
        gradiente: "from-blue-500 to-blue-600",
    },
    {
        id: "ingresos",
        titulo: "Ingresos del Mes",
        valor: "$198,450",
        tendencia: "up" as const,
        porcentaje: 12.8,
        icono: "ingresos" as const,
        gradiente: "from-green-500 to-green-600",
    },
    {
        id: "reservas",
        titulo: "Reservas Activas",
        valor: "156",
        tendencia: "up" as const,
        porcentaje: 8.3,
        icono: "reservas" as const,
        gradiente: "from-purple-500 to-purple-600",
    },
    {
        id: "satisfaccion",
        titulo: "Satisfacción",
        valor: "4.7/5",
        tendencia: "up" as const,
        porcentaje: 2.1,
        icono: "satisfaccion" as const,
        gradiente: "from-amber-500 to-amber-600",
    },
];