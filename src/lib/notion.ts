import { NotionAPI } from "notion-client"
import { ExtendedRecordMap } from "notion-types"

const notion = new NotionAPI()

/**
 * 특정 노션 페이지의 데이터를 가져옵니다.
 * 서버 사이드(빌드 타임)와 API Route 모두에서 공용으로 사용됩니다.
 */
export async function getNotionPageData(pageId: string): Promise<ExtendedRecordMap | null> {
  if (!pageId) return null
  
  try {
    const recordMap = await notion.getPage(pageId)
    return recordMap
  } catch (error) {
    console.error(`Notion Fetch Error [${pageId}]:`, error)
    return null
  }
}
