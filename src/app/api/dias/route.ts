import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (!data) { return new NextResponse("No body provided", { status: 400 }) } 
    
    if (Array.isArray(data)) {
      const dias = await db.dias.createMany({
        data: data.map((dia) => ({ nombre: dia.nombre }))
      })
      return new NextResponse(JSON.stringify(dias), {
          headers: { "Content-Type": "application/json" },
          status: 201,
        });  
    } else {
        const dia = await db.dias.create({
          data: {
            nombre: data.nombre
          }
        })
      return new NextResponse(JSON.stringify(dia), {
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
    const dias = await db.dias.findMany();
    return NextResponse.json(dias, { status: 200 });
  } catch (e: any) {
    return new NextResponse(e.message, { status: 500 });
  }
}