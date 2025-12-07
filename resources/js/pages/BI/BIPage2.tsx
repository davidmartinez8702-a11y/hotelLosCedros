// import React, { useState } from "react";
// import { Head } from "@inertiajs/react";
// import AppLayout from "@/layouts/app-layout";
// import BarChart from "@/shared/BI/BarChart";
// import PieChart from "@/shared/BI/PieChart";
// import LineChart from "@/shared/BI/LineChart";
// import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue  } from "@/components/ui/select";
// // import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/shared/components/Select";


// const BIPage: React.FC = () => {
//   const [selectedFilter, setSelectedFilter] = useState<string>("mes");

//   const handleFilterChange = (value: string) => {
//     setSelectedFilter(value);
//     console.log("Filtro seleccionado:", value);
//   };

//   const barData = [
//     { label: "Enero", value: 300 },
//     { label: "Febrero", value: 400 },
//     { label: "Marzo", value: 350 },
//   ];

//   const pieData = [
//     { label: "Familias", value: 40 },
//     { label: "Parejas", value: 30 },
//     { label: "Viajeros Solos", value: 20 },
//     { label: "Grupos", value: 10 },
//   ];

//   const lineData = [
//     { label: "Día 1", value: 30, category: "Check-ins" },
//     { label: "Día 1", value: 20, category: "Check-outs" },
//   ];

//   return (
//     <AppLayout>
//       <Head title="Dashboard BI - Hotel" />

//       <div className="py-8 lg:py-12">
//         <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
//           <h1 className="text-3xl font-bold">Dashboard BI</h1>

//           {/* Selector de Filtros */}
//           <div className="flex items-center space-x-4">
//             <label className="text-sm font-medium">Selecciona un filtro:</label>
//             <Select onValueChange={handleFilterChange}>
//               <SelectTrigger className="w-48">
//                 <SelectValue placeholder="Selecciona un filtro" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="mes">Este Mes</SelectItem>
//                 <SelectItem value="anio">Este Año</SelectItem>
//                 <SelectItem value="semana">Esta Semana</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Gráfico de Barras */}
//           <div className="bg-white shadow rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4">Reservas</h2>
//             <BarChart data={barData} />
//           </div>

//           {/* Gráfico de Tortas */}
//           <div className="bg-white shadow rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4">Tipos de Personas</h2>
//             <PieChart data={pieData} />
//           </div>

//           {/* Gráfico de Líneas */}
//           <div className="bg-white shadow rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4">Check-ins y Check-outs</h2>
//             <LineChart data={lineData} />
//           </div>
//         </div>
//       </div>
//     </AppLayout>
//   );
// };

// export default BIPage;