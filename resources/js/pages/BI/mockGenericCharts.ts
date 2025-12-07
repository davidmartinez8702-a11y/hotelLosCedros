// Mock data para componentes genéricos de charts

// 1. Data para GenericBarChart (Uso de Servicios) - Ahora con ingresos
export const serviciosUsoData = [
    { servicio: "Gym", cantidad: 45, ingresos: 12500 },
    { servicio: "Spa", cantidad: 32, ingresos: 28000 },
    { servicio: "Piscina", cantidad: 67, ingresos: 8500 },
    { servicio: "Restaurant", cantidad: 89, ingresos: 45000 },
    { servicio: "Room Service", cantidad: 54, ingresos: 32000 },
    { servicio: "Lavandería", cantidad: 28, ingresos: 6500 },
];

export const serviciosBarsConfig = [
    { dataKey: "cantidad", name: "Cantidad de Usos", fill: "#667eea" },
    { dataKey: "ingresos", name: "Ingresos (Bs)", fill: "#10b981" },
];

// 2. Data para GenericHorizontalBarChart (Ranking de Habitaciones)
export const rankingHabitacionesData = [
    { tipo: "Suite Presidencial", reservas: 145, ingresos: 89000 },
    { tipo: "Suite Junior", reservas: 230, ingresos: 67000 },
    { tipo: "Deluxe", reservas: 320, ingresos: 54000 },
    { tipo: "Estándar", reservas: 450, ingresos: 38000 },
    { tipo: "Económica", reservas: 280, ingresos: 22000 },
];

export const rankingBarsConfig = [
    { dataKey: "reservas", name: "Reservas", fill: "#667eea", radius: [0, 4, 4, 0] as [number, number, number, number] },
    { dataKey: "ingresos", name: "Ingresos (Bs)", fill: "#10b981", radius: [0, 4, 4, 0] as [number, number, number, number] },
];

// 3. Data para GenericLineChart (Tendencias de Ocupación)
export const tendenciasOcupacionData = [
    { mes: "Ene", ocupacion: 75, proyeccion: 78, objetivo: 80 },
    { mes: "Feb", ocupacion: 82, proyeccion: 85, objetivo: 85 },
    { mes: "Mar", ocupacion: 88, proyeccion: 90, objetivo: 90 },
    { mes: "Abr", ocupacion: 92, proyeccion: 93, objetivo: 92 },
    { mes: "May", ocupacion: 85, proyeccion: 87, objetivo: 88 },
    { mes: "Jun", ocupacion: 90, proyeccion: 92, objetivo: 95 },
];

export const tendenciasLinesConfig = [
    { dataKey: "ocupacion", name: "Ocupación Real", stroke: "#667eea", strokeWidth: 3 },
    { dataKey: "proyeccion", name: "Proyección", stroke: "#10b981", strokeDasharray: "5 5" },
    { dataKey: "objetivo", name: "Objetivo", stroke: "#f59e0b", strokeDasharray: "3 3" },
];

// 4. Data para GenericPieChart (Origen de Huéspedes)
export const origenHuespedesData = [
    { origen: "Nacional", cantidad: 245, fill: "#667eea" },
    { origen: "Internacional", cantidad: 180, fill: "#764ba2" },
    { origen: "Regional", cantidad: 95, fill: "#f093fb" },
    { origen: "Local", cantidad: 65, fill: "#4facfe" },
];

// 5. Data para GenericAreaChart (Flujo de Reservas)
export const flujoReservasData = [
    { semana: "Sem 1", nuevas: 45, modificadas: 12, canceladas: 5 },
    { semana: "Sem 2", nuevas: 52, modificadas: 8, canceladas: 3 },
    { semana: "Sem 3", nuevas: 48, modificadas: 15, canceladas: 7 },
    { semana: "Sem 4", nuevas: 60, modificadas: 10, canceladas: 4 },
];

export const flujoAreasConfig = [
    { dataKey: "nuevas", name: "Nuevas", stroke: "#10b981", fill: "#10b981", stackId: "1" },
    { dataKey: "modificadas", name: "Modificadas", stroke: "#fbbf24", fill: "#fbbf24", stackId: "1" },
    { dataKey: "canceladas", name: "Canceladas", stroke: "#ef4444", fill: "#ef4444", stackId: "1" },
];

// 6. Data para GenericMultiBarChart (Análisis Financiero)
export const analisisFinancieroData = [
    { categoria: "Habitaciones", ingresos: 125000, gastos: 45000, utilidad: 80000, proyeccion: 130000 },
    { categoria: "Alimentos", ingresos: 68000, gastos: 38000, utilidad: 30000, proyeccion: 72000 },
    { categoria: "Servicios", ingresos: 45000, gastos: 22000, utilidad: 23000, proyeccion: 48000 },
    { categoria: "Eventos", ingresos: 92000, gastos: 54000, utilidad: 38000, proyeccion: 95000 },
];

export const financieroBarsConfig = [
    { dataKey: "ingresos", name: "Ingresos", fill: "#10b981" },
    { dataKey: "gastos", name: "Gastos", fill: "#ef4444" },
    { dataKey: "utilidad", name: "Utilidad", fill: "#667eea" },
    { dataKey: "proyeccion", name: "Proyección", fill: "#fbbf24" },
];

// Filtros opcionales
export const periodoFilterOptions = [
    { value: "mes", label: "Este Mes" },
    { value: "trimestre", label: "Este Trimestre" },
    { value: "semestre", label: "Este Semestre" },
    { value: "anio", label: "Este Año" },
];

// Data para Check-ins y Check-outs del día
export const checkinsCheckoutsData = [
    { hora: "08:00", checkins: 2, checkouts: 5 },
    { hora: "09:00", checkins: 5, checkouts: 8 },
    { hora: "10:00", checkins: 8, checkouts: 12 },
    { hora: "11:00", checkins: 12, checkouts: 15 },
    { hora: "12:00", checkins: 15, checkouts: 10 },
    { hora: "13:00", checkins: 10, checkouts: 8 },
    { hora: "14:00", checkins: 18, checkouts: 5 },
    { hora: "15:00", checkins: 22, checkouts: 3 },
    { hora: "16:00", checkins: 15, checkouts: 2 },
    { hora: "17:00", checkins: 8, checkouts: 1 },
];

export const checkinsCheckoutsBarsConfig = [
    { dataKey: "checkins", name: "Check-ins", fill: "#10b981", radius: [8, 8, 0, 0] as [number, number, number, number] },
    { dataKey: "checkouts", name: "Check-outs", fill: "#ef4444", radius: [8, 8, 0, 0] as [number, number, number, number] },
];

// Filtros para Check-ins/Check-outs
export const checkinsFilterOptions = [
    { value: "hoy", label: "Hoy" },
    { value: "semana", label: "Esta Semana" },
    { value: "mes", label: "Este Mes" },
];

// Data para Predicción de Demanda (reemplaza Tendencias de Ocupación)
export const prediccionDemandaData = [
    { mes: "Ene", demandaReal: 120, prediccion: 125, maximo: 140, minimo: 110 },
    { mes: "Feb", demandaReal: 135, prediccion: 138, maximo: 150, minimo: 125 },
    { mes: "Mar", demandaReal: 145, prediccion: 148, maximo: 160, minimo: 135 },
    { mes: "Abr", demandaReal: 158, prediccion: 160, maximo: 175, minimo: 145 },
    { mes: "May", demandaReal: 142, prediccion: 145, maximo: 158, minimo: 132 },
    { mes: "Jun", demandaReal: 165, prediccion: 168, maximo: 180, minimo: 155 },
];

export const prediccionLinesConfig = [
    { dataKey: "demandaReal", name: "Demanda Real", stroke: "#667eea", strokeWidth: 3 },
    { dataKey: "prediccion", name: "Predicción", stroke: "#10b981", strokeWidth: 3, strokeDasharray: "5 5" },
    { dataKey: "maximo", name: "Máximo Esperado", stroke: "#f59e0b", strokeDasharray: "3 3" },
    { dataKey: "minimo", name: "Mínimo Esperado", stroke: "#ef4444", strokeDasharray: "3 3" },
];

// Data para Flujo de Ingresos (nueva gráfica)
export const flujoIngresosData = [
    { semana: "Sem 1", habitaciones: 45000, servicios: 12000, eventos: 8000 },
    { semana: "Sem 2", habitaciones: 52000, servicios: 15000, eventos: 10000 },
    { semana: "Sem 3", habitaciones: 48000, servicios: 13500, eventos: 9500 },
    { semana: "Sem 4", habitaciones: 58000, servicios: 16500, eventos: 12000 },
];

export const flujoIngresosAreasConfig = [
    { dataKey: "habitaciones", name: "Habitaciones", stroke: "#667eea", fill: "#667eea", stackId: "1" },
    { dataKey: "servicios", name: "Servicios", stroke: "#10b981", fill: "#10b981", stackId: "1" },
    { dataKey: "eventos", name: "Eventos", fill: "#f59e0b", stroke: "#f59e0b", stackId: "1" },
];

// Data para Rendimiento de Comentarios (pie chart)
export const comentariosData = [
    { categoria: "Excelente", cantidad: 145, fill: "#10b981" },
    { categoria: "Bueno", cantidad: 82, fill: "#667eea" },
    { categoria: "Regular", cantidad: 18, fill: "#fbbf24" },
    { categoria: "Malo", cantidad: 5, fill: "#ef4444" },
];
