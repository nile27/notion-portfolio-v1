# 🚀 Notion-Powered Portfolio: Performance & SEO Optimization
> **Lighthouse Performance 100점 달성 및 SEO 최적화를 목표로 한 기술 지향적 포트폴리오**

---

## 1. 기술 스택 (Tech Stack)
| 분류 | 기술 | 선택 이유 |
| :--- | :--- | :--- |
| **Framework** | **Next.js (App Router)** | 서버 컴포넌트 활용 및 최적화된 라우팅 시스템 이용 |
| **State** | **TanStack Query** | 데이터 캐싱 및 비동기 프리페칭(Pre-fetching) 구현 |
| **Styling** | **Tailwind CSS** | Zero-runtime CSS로 렌더링 성능 확보 및 디자인 생산성 향상 |
| **Animation** | **Framer Motion** | 고성능 애니메이션으로 사용자 경험(UX) 고도화 |
| **CMS** | **Notion API** | 별도의 DB 없이 콘텐츠를 관리할 수 있는 유연한 CMS 활용 |

---

## 2. 프로젝트 목표 (Project Goals)
*   **SEO 최적화**: 검색 엔진에서 내 포트폴리오가 잘 검색되도록 완벽한 메타 데이터 및 사이트맵 구조 설계.
*   **Lighthouse 100점**: 웹 표준과 성능 지표(Core Web Vitals)의 최정점을 달성하여 기술적 역량 증명.

---

## 3. 기능 설명 (Features & Strategies)

### 🔍 SEO 최적화 전략
*   **Semantic HTML**: 모든 페이지에 `<h1>`~`<h3>` 태그를 위계에 맞게 배치하고, `Section`, `Article` 등 의미론적 태그 사용.
*   **Dynamic Metadata**: 각 프로젝트의 정보를 기반으로 OpenGraph, Twitter Card 메타 데이터를 자동 생성하여 공유 시 가시성 극대화.
*   **Robots & Sitemap**: `robots.txt`와 `sitemap.xml`을 자동 생성하여 검색 로봇의 크롤링 효율 증대.

### ⚡ Lighthouse 퍼포먼스 향상 기법
*   **Dynamic Import**: 노션 렌더링에 필요한 대용량 라이브러리(react-notion-x)를 초기 번들에서 제외하고 모달이 열릴 때만 로드하여 **TBT(Total Blocking Time)** 최소화.
*   **Fetch Priority**: 히어로 이미지에 `fetchPriority="high"`를 적용하여 **LCP(Largest Contentful Paint)** 속도 개선.

### 🔄 렌더링 전략의 변화: ISR → CSR + Prefetching
*   **최초 선택 (ISR)**: 모든 노션 데이터를 빌드 타임에 가져와 HTML에 포함시켜 검색 엔진 최적화와 초기 속도를 잡으려 했습니다.
*   **문제 발견**: 노션 데이터가 HTML에 직접 포함되자 **HTML 용량이 약 1.6MB로 비대화**되어 오히려 네트워크 전송 속도가 느려지는 역효과 발생.
*   **최종 결정 (CSR + Prefetching)**: 
    *   메인 페이지는 서버 사이드에서 가볍게 렌더링하여 **SEO 점수를 유지**.
    *   프로젝트 상세 데이터는 페이지 로드 직후 **TanStack Query를 통해 백그라운드에서 미리 가져와 캐싱(Prefetching)**.
    *   이를 통해 **가벼운 초기 로딩**과 **지연 없는 모달 오픈**이라는 두 마리 토끼를 모두 잡았습니다.

---

## 4. 트러블 슈팅 (Troubleshooting)

### 🚨 도전 과제: ISR 방식의 퍼포먼스 하락 해결
*   **원인**: ISR로 생성된 거대 HTML이 브라우저의 파싱 시간을 늦춰 Lighthouse 점수가 80점대로 하락.
*   **해결**: 데이터를 HTML에 직접 주입하는 대신, 클라이언트 사이드에서 **비동기 프리페칭** 모델로 전환.
*   **성과**: HTML 사이즈 90% 감소 및 퍼포먼스 점수 **100점** 복구.

### 🖼️ 이미지 최적화 이슈
*   **원인**: 노션에서 제공하는 이미지 URL은 1시간의 유효 기간이 있어 빌드된 페이지에서 이미지가 깨지는 현상.
*   **해결**: Next.js의 `Image` 컴포넌트 캐싱 전략을 활용하고, 고정적인 에셋은 로컬 `/public` 경로로 관리하여 안정성 확보.

### 📈 Lighthouse 최종 결과 요약
*   **Performance**: 100 / **Accessibility**: 100 / **Best Practices**: 100 / **SEO**: 100
*   모든 지표를 **All-Green**으로 달성하며, 코드의 품질과 성능 최적화 능력을 동시에 검증했습니다.


