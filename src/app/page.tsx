import ViajesTable from "@/components/viajes/table";

export default async function Home() {
  return (
    <main>
      <ViajesTable id_empresa={0} id_partida={0} id_destino={0} />
    </main>
  );
}
