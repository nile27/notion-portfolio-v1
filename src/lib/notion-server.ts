import { NotionAPI } from "notion-client"
import { portfolioData } from "@/data/data"
import { ExtendedRecordMap } from "notion-types"

const notion = new NotionAPI()

export async function getAllProjectRecordMaps() {
  try {
    const projectIds = portfolioData.projects
      .map(p => p.notionId)
      .filter(Boolean) as string[]

    const results = await Promise.all(
      projectIds.map(async (id) => {
        try {
          const recordMap = await notion.getPage(id)
          return { id, recordMap }
        } catch (error) {
          console.error(`Error fetching notion page ${id}:`, error)
          return { id, recordMap: null }
        }
      })
    )

    const recordMaps: Record<string, ExtendedRecordMap> = {}
    results.forEach(({ id, recordMap }) => {
      if (recordMap) {
        // 클라이언트와 매칭을 위해 하이픈 제거한 ID를 키로 사용
        const normalizedId = id.replace(/-/g, "")
        recordMaps[normalizedId] = recordMap
      }
    })

    return recordMaps
  } catch (error) {
    console.error("❌ 노션 데이터 통합 수집 중 오류 발생:", error)
    return {}
  }
}
