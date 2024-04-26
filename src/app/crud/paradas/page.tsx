import CrudTable from "@/components/crud/table";

export default async function CrudEmpresas() {
  const paradas = await prisma.parada.findMany({
    select: {
      id: true,
      nombre: true,
    },
  });

  const dataTable = paradas.map(objeto => Object.values(objeto).map(valor => String(valor)))
  console.log(dataTable)

  return (
    <main>
      <CrudTable headers={{ header: ["id", "nombre"], sortableHerder: [] }} data={dataTable}></CrudTable>
    </main>
  );
}
