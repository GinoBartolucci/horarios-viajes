import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    if (!req.body) { return new NextResponse("No body provided", { status: 400 }) }
    const data = await req.json();
    if (Array.isArray(data)) {
      const paradas = await db.parada.createMany({
        data: data.map((parada) => ({ nombre: parada.nombre }))
      })
      return new NextResponse(JSON.stringify(paradas), {
          headers: { "Content-Type": "application/json" },
          status: 201,
        });  
    } else {
        const parada = await db.parada.create({
          data: {
            nombre: data.nombre
          }
        })
      return new NextResponse(JSON.stringify(parada), {
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
    const paradas = await db.parada.findMany();
    return NextResponse.json(paradas, { status: 200 });
  } catch (e: any) {
    return new NextResponse(e.message, { status: 500 });
  }
}