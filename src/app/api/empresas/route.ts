import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (!data) { return new NextResponse("No body provided", { status: 400 }) }    
    if (Array.isArray(data)) {
      const empresas = await db.empresa.createMany({
        data: data.map((empresa) => ({ nombre: empresa.nombre }))
      })
      return new NextResponse(JSON.stringify(empresas), {
          headers: { "Content-Type": "application/json" },
          status: 201,
        });  
    } else {
        const empresa = await db.empresa.create({
          data: {
            nombre: data.nombre
          }
        })
      return new NextResponse(JSON.stringify(empresa), {
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
    const empresas = await db.empresa.findMany();
    return NextResponse.json(empresas, { status: 200 });
  } catch (e: any) {
    return new NextResponse(e.message, { status: 500 });
  }
}