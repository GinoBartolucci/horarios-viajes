'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

interface props {
  deleteEvent: (id: number) => void;
  //handleClick: (event: React.MouseEvent<HTMLButtonElement>, id: number) => void;
  dataHeaders: string[]
  dataTable: string[][]
}

export default function Table(props: props) {
  const deleteDia = async (id: number) => {
    await prisma.dias.delete({
      where: {
        id: id
      }
    }).then(() => {
      props.dataTable.splice(props.dataTable.findIndex((element) => element[0] === String(id)), 1)
    }).catch((error) => {
      console.error(error)
    })
  }

  const funcion = (id: number) => {
    console.log("eliminado: " + id)
  }
  const pathname = usePathname()


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {props.dataHeaders.map((header, i) => {
              return (
                <th key={i} scope="col" className="px-6 py-3">
                  {header}
                </th>
              )
            })}
            <th scope="col" className="px-6 py-3 text-right">
              Editar
            </th>
            <th scope="col" className="px-6 py-3 text-right">
              Eliminar
            </th>
          </tr>
        </thead>
        <tbody>
          {
            props.dataTable.map((rows, i) => {
              return (
                <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  {rows.map((text, e) => {
                    return (
                      <td key={e} className="px-6 py-4">
                        {text}
                      </td>
                    )
                  })}
                  <td className="px-6 py-4 text-right">
                    <Link href={`${pathname}/${rows[0]}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => props.deleteEvent(Number(rows[0]))} className="font-medium text-red-600 dark:text-red-500 hover:underline">Eliminar</button>
                    {/* <a onClick={() => funcion(Number(rows[0]))} className="font-medium text-red-600 dark:text-red-500 hover:underline">Eliminar</a> */}
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}