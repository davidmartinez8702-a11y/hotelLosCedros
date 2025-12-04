import React, { useState, useEffect } from 'react';
// Assuming you might use an icon library like react-icons or a custom SVG component
// import { FaEye, FaPencilAlt } from 'react-icons/fa'; // Example for react-icons

interface Categoria {
  id: number;
  nombre: string;
}

interface Platillo {
  id: number;
  nombre: string;
  precio: number;
  estado: boolean; // Assuming true for activo, false for inactivo
  categoria_id: number;
}

const PlatillosPage: React.FC = () => {
  const [platillos, setPlatillos] = useState<Platillo[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      try {
        // Replace with actual API calls
        const mockCategorias: Categoria[] = [
          { id: 1, nombre: 'Entradas' },
          { id: 2, nombre: 'Platos Fuertes' },
          { id: 3, nombre: 'Postres' },
          { id: 4, nombre: 'Bebidas' },
        ];
        const mockPlatillos: Platillo[] = [
          { id: 1, nombre: 'Ensalada César', precio: 12.50, estado: true, categoria_id: 1 },
          { id: 2, nombre: 'Lomo Saltado', precio: 25.00, estado: true, categoria_id: 2 },
          { id: 3, nombre: 'Tiramisú', precio: 8.00, estado: false, categoria_id: 3 },
          { id: 4, nombre: 'Jugo de Naranja', precio: 5.50, estado: true, categoria_id: 4 },
          { id: 5, nombre: 'Ceviche Mixto', precio: 22.00, estado: true, categoria_id: 1 },
        ];

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        setCategorias(mockCategorias);
        setPlatillos(mockPlatillos);
      } catch (err) {
        setError('Error al cargar los datos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCategoryName = (categoria_id: number): string => {
    const categoria = categorias.find(cat => cat.id === categoria_id);
    return categoria ? categoria.nombre : 'Desconocida';
  };

  const handleShow = (id: number) => {
    console.log(`Mostrar platillo con ID: ${id}`);
    // Implement navigation or modal display for platillo details
  };

  const handleEdit = (id: number) => {
    console.log(`Editar platillo con ID: ${id}`);
    // Implement navigation to edit form
  };

  if (loading) {
    return <div className="p-4">Cargando platillos...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Platillos</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Nombre</th>
              <th className="py-2 px-4 border-b text-left">Precio</th>
              <th className="py-2 px-4 border-b text-left">Estado</th>
              <th className="py-2 px-4 border-b text-left">Categoría</th>
              <th className="py-2 px-4 border-b text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {platillos.map(platillo => (
              <tr key={platillo.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{platillo.id}</td>
                <td className="py-2 px-4 border-b">{platillo.nombre}</td>
                <td className="py-2 px-4 border-b">${platillo.precio.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    platillo.estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {platillo.estado ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">{getCategoryName(platillo.categoria_id)}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleShow(platillo.id)}
                    className="text-blue-600 hover:text-blue-900 mr-2"
                    title="Ver Platillo"
                  >
                    {/* Using a simple SVG for eye icon, replace with FaEye if using react-icons */}
                    <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    {/* <FaEye /> */}
                  </button>
                  <button
                    onClick={() => handleEdit(platillo.id)}
                    className="text-yellow-600 hover:text-yellow-900"
                    title="Editar Platillo"
                  >
                    {/* Using a simple SVG for pencil icon, replace with FaPencilAlt if using react-icons */}
                    <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    {/* <FaPencilAlt /> */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlatillosPage;
