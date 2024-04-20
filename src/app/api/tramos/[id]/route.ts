import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  if (isNaN(id)) {return new NextResponse("Invalid ID", { status: 400 }) }
  try {
    const tramo = await db.tramo.findFirst({
      where: { id: id },
    });
    if (!tramo) {
      return new NextResponse(`tramo with ID ${id} not found.`, {
        status: 404,
      });
    }
    return NextResponse.json(tramo)
  } catch (e: any) {
    return new NextResponse(e.message, { status: 500 });
  }
}

export async function DELETE(req : Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  try {
    const result = await db.tramo.delete({
      where: { id: id },
    });
    return NextResponse.json({result}, { status: 200 });
  } catch (e: any) {
    return new NextResponse(e.message, { status: 500 });
  }
}

export async function PUT(req : Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const data = await req.json()
  try {
    const result = await db.tramo.update({
      where: { id: id },
      data: data,
    });
    if (!result) {
      return new NextResponse(`tramo with ID ${id} not found.`, {
        status: 404,
      });
    }
    return NextResponse.json({result}, {status:200})
  } catch (e: any) {
    return new NextResponse(e.message, {status:500})
  }
}