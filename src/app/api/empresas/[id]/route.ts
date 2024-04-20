import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  if (isNaN(id)) {return new NextResponse("Invalid ID", { status: 400 }) }
  try {
    const empresa = await db.empresa.findFirst({
      where: { id: id },
    });
    if (!empresa) {
      return new NextResponse(`empresa with ID ${id} not found.`, {
        status: 404,
      });
    }
    return NextResponse.json(empresa)
  } catch (e: any) {
    return new NextResponse(e.message, { status: 500 });
  }
}

export async function DELETE(req : Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  try {
    const result = await db.empresa.delete({
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
    const result = await db.empresa.update({
      where: { id: id },
      data: data,
    });
    if (!result) {
      return new NextResponse(`empresa with ID ${id} not found.`, {
        status: 404,
      });
    }
    return NextResponse.json({result}, {status:200})
  } catch (e: any) {
    return new NextResponse(e.message, {status:500})
  }
}