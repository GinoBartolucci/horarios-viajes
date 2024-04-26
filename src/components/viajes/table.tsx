import Header from "@/components/viajes/header";
import Row from "./row";
import prisma from "../../lib/prisma";
interface Props {
  id_empresa: number
  id_partida: number
  id_destino: number
}

export default async function Table(props: Props) {
  const dias = await prisma.dias.findMany({
    select: {
      id: true,
      nombre: true,
    },
  });
  dias.unshift({ id: 0, nombre: "Horario" });

  const empresa = await prisma.empresa.findUnique({
    where: { id: 1 },
    select: {
      id: true,
      nombre: true,
    },
  });
  return (
    <main className="flex flex-col justify-center items-center pt-8 overflow-x-auto">
      <table className="text-center text-gray-500 dark:text-gray-400 table-auto ">
        <caption className="p-5 text-3xl font-semibold text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          {empresa && empresa.nombre}
        </caption>
        <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {dias.map((header) => {
              return (<Header key={header.id} text={header.nombre} />)
            })
            }
          </tr>
        </thead>
        <tbody>
          {/* {horarios.map((horario) => {
            return (
              <tr key={horario.hora} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {horario.hora.toString()}
                </th>
                <Row disponible={horario.domingo} />
                <Row disponible={horario.lunes} />
                <Row disponible={horario.martes} />
                <Row disponible={horario.miercoles} />
                <Row disponible={horario.jueves} />
                <Row disponible={horario.viernes} />
                <Row disponible={horario.sabado} />
                <Row disponible={horario.feriados} />
              </tr>
            );
          })} */}
        </tbody>
      </table>
    </main>
  )
}