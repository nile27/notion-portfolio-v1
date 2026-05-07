import { NotionAPI } from "notion-client"
import { portfolioData } from "@/data/data"
import { ExtendedRecordMap } from "notion-types"

// 서버 사이드 전용 노션 클라이언트 인스턴스
const notion = new NotionAPI()

/**
 * 모든 프로젝트의 노션 recordMap을 병렬로 가져오는 함수 (ISR용)
 */
export async function getAllProjectRecordMaps(): Promise<Record<string, ExtendedRecordMap>> {
  console.log("🚀 모든 프로젝트의 노션 데이터를 수집 시작합니다...")
  
  // 프로젝트 데이터에서 notionId가 있는 항목만 필터링
  const projectIds = portfolioData.projects
    .map(project => project.notionId)
    .filter((id): id is string => !!id)

  const recordMaps: Record<string, ExtendedRecordMap> = {}

  try {
    // 모든 프로젝트의 데이터를 병렬(Parallel)로 수집하여 시간 단축
    const results = await Promise.all(
      projectIds.map(async (id) => {
        try {
          const recordMap = await notion.getPage(id)
          return { id, recordMap }
        } catch (error) {
          console.error(`❌ 노션 ID(${id}) 데이터 페칭 실패:`, error)
          return { id, recordMap: null }
        }
      })
    )

    // 수집된 데이터를 객체 형태로 변환 (ID를 정규화하여 하이픈 제거)
    results.forEach(({ id, recordMap }) => {
      if (recordMap) {
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
