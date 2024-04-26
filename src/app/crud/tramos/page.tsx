import CrudTable from "@/components/crud/table";

export default async function CrudEmpresas() {
  const tramos = await prisma.tramo.findMany({
    select: {
      id: true,
      salida: {
        select: {
          nombre: true,
        },
      },
      horaSalida: true,
      llegada: true,
      horaLlegada: true,
      empresa: {
        select: {
          nombre: true,
        },
      },
    },
  });
  console.log("=================== " + tramos)
  const dataTable = tramos.map(objeto => Object.values(objeto).map(valor => String(valor)))
  console.log(dataTable)

  return (
    <main>
      <CrudTable headers={{ header: ["id", "nombre"], sortableHerder: [] }} data={dataTable}></CrudTable>
    </main>
  );
}
