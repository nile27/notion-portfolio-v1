import { NextResponse } from "next/server"
import { getNotionPageData } from "@/lib/notion"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const pageId = searchParams.get("pageId")

  if (!pageId) {
    return NextResponse.json({ error: "pageId is required" }, { status: 400 })
  }

  const recordMap = await getNotionPageData(pageId)

  if (!recordMap) {
    return NextResponse.json({ error: "Failed to fetch Notion data" }, { status: 500 })
  }

  return NextResponse.json(recordMap)
}
