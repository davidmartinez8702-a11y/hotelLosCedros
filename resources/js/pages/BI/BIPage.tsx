// import React from "react";
// import { Head } from "@inertiajs/react";
// import AppLayout from "@/layouts/app-layout";
// import BarChart from "@/shared/BI/BarChart";
// import PieChart from "@/shared/BI/PieChart";
// import LineChart from "@/shared/BI/LineChart";

// const BIPage: React.FC = () => {
//   // Datos para el gráfico de barras (Reservas por mes)
//   const barData = {
//     labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
//     datasets: [
//       {
//         label: "Reservas",
//         data: [120, 150, 180, 200, 170, 190],
//         backgroundColor: "rgba(75, 192, 192, 0.5)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Datos para el gráfico de torta (Servicios más consumidos)
//   const pieData = {
//     labels: ["Spa", "Restaurante", "Gimnasio", "Bar"],
//     datasets: [
//       {
//         data: [40, 30, 20, 10],
//         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
//         hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
//       },
//     ],
//   };

//   // Datos para el gráfico de líneas (Check-ins y Check-outs diarios)
//   const lineData = {
//     labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
//     datasets: [
//       {
//         label: "Check-ins",
//         data: [30, 50, 40, 60, 70, 90, 100],
//         borderColor: "rgba(54, 162, 235, 1)",
//         backgroundColor: "rgba(54, 162, 235, 0.2)",
//         tension: 0.4,
//       },
//       {
//         label: "Check-outs",
//         data: [20, 40, 30, 50, 60, 80, 90],
//         borderColor: "rgba(255, 99, 132, 1)",
//         backgroundColor: "rgba(255, 99, 132, 0.2)",
//         tension: 0.4,
//       },
//     ],
//   };

//   return (
//     <AppLayout>
//       <Head title="Business Intelligence - Hotel" />

//       <div className="py-8 lg:py-12">
//         <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
//           <h1 className="text-3xl font-bold">Business Intelligence</h1>

//           {/* Gráfico de Barras */}
//           <div className="bg-white shadow rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4">Reservas por Mes</h2>
//             <BarChart data={barData} />
//           </div>

//           {/* Gráfico de Torta */}
//           <div className="bg-white shadow rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4">Servicios Más Consumidos</h2>
//             <PieChart data={pieData} />
//           </div>

//           {/* Gráfico de Líneas */}
//           <div className="bg-white shadow rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4">Check-ins y Check-outs Diarios</h2>
//             <LineChart data={lineData} />
//           </div>
//         </div>
//       </div>
//     </AppLayout>
//   );
// };

// export default BIPage;