import { NextResponse } from "next/server"
import { getAllProjectRecordMaps } from "@/lib/notion-server"

export async function GET() {
  const data = await getAllProjectRecordMaps()
  return NextResponse.json(data)
}
