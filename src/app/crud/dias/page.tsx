"use server"
import prisma from "@/lib/prisma";
import CrudDiasTable from "@/components/crud/table";

export default async function ReadDeleteDias() {
  const dias = await prisma.dias.findMany({
    select: {
      id: true,
      nombre: true,
    },
  });
  const dataTable = dias.map(objeto => Object.values(objeto).map(valor => String(valor)))
  const dataHeaders = Object.keys(dias[0]).map(key => String(key))

  // const deleteDia = async (id: number) => {
  //   await prisma.dias.delete({
  //     where: {
  //       id: id
  //     }
  //   }).then(() => {
  //     dataTable.splice(dataTable.findIndex((element) => element[0] === String(id)), 1)
  //   }).catch((error) => {
  //     console.error(error)
  //   })
  // }

  async function funcion(id: number) {
    "use server"
    console.log("eliminado: " + id)
  }

  return (
    <main>
      <CrudDiasTable dataHeaders={dataHeaders} dataTable={dataTable} deleteEvent={funcion} />
    </main>
  );
}
