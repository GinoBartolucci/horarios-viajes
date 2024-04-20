import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (!data) { return new NextResponse("No body provided", { status: 400 }) }    
    if (Array.isArray(data)) {
      const tramos = await db.tramo.createMany({
        data: data.map((tramo) => ({
          salidaId: tramo.salida.id,
          horaSalida: tramo.horaSalida,
          llegadaId: tramo.llegada.id,
          horaLlegada: tramo.horaLlegada,
          empresaId: tramo.empresa.id,
        }))
      })
      return new NextResponse(JSON.stringify(tramos), {
          headers: { "Content-Type": "application/json" },
          status: 201,
        });  
    } else {
        const tramo = await db.tramo.create({
        data: {
          salidaId: data.salida.id,
          horaSalida: data.horaSalida,
          llegadaId: data.llegada.id,
          horaLlegada: data.horaLlegada,
          empresaId: data.empresa.id,          
        }
      })
      return new NextResponse(JSON.stringify(tramo), {
          headers: { "Content-Type": "application/json" },
          status: 201,
        });         
      }
  } catch (e: any) {
    return new NextResponse(e.message, { status: 500 });
  }
}

export async function GET() {
  try {
    const tramos = await db.tramo.findMany();
    return NextResponse.json(tramos, { status: 200 });
  } catch (e: any) {
    return new NextResponse(e.message, { status: 500 });
  }
}