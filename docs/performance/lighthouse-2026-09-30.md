# Lighthouse 성능 개선 기록 — 2026-09-30

## 목적

배포 주소 `https://mingyu-portfolio.vercel.app/`를 시크릿 모드에서 직접 열어 실행한 Lighthouse 13.4.1 결과가 Performance 89점으로 하락한 원인을 기록하고, 이번에 적용한 개선과 재검증 절차를 남긴다.

측정 시각은 Lighthouse 보고서 기준 `2026-09-29T15:17:14.642Z`이며, 한국 시간으로는 2026-09-30 00:17경이다. 실행 환경은 Chrome 153, 데스크톱 에뮬레이션, simulated throttling이다.

## 변경 전 Lighthouse 기준선

| 항목 | 결과 | 개별 점수 | Performance 가중치 |
| --- | ---: | ---: | ---: |
| Performance | 89 | — | — |
| FCP | 0.8초 | 95 | 10% |
| LCP | 1.4초 | 83 | 25% |
| Speed Index | 1.3초 | 88 | 10% |
| TBT | 180ms | 84 | 30% |
| CLS | 0 | 100 | 25% |
| TTI | 1.4초 | 99 | 점수 비반영 |

가중 점수는 약 89.25점이다. 특히 가중치가 큰 LCP와 TBT가 전체 점수를 낮췄다.

기타 주요 진단값:

- 서버 응답 시간: 약 7ms. 서버 또는 Vercel의 TTFB가 주원인은 아니었다.
- 메인 스레드 작업: 약 1.4초.
- 가장 긴 태스크: 약 298ms.
- 전체 전송량: 약 2.74MB.
- 히어로 MP4: 약 1.4MB.
- 초기 문서: 전송 약 398KB, 압축 해제 후 약 3.95MB.
- 추가 RSC 응답: 전송 약 361KB, 압축 해제 후 약 3.27MB.
- 사용하지 않는 JavaScript 추정치: 약 59KB.
- 사용하지 않는 CSS 추정치: 약 42KB.
- 이미지 전달 낭비 추정치: 약 36KB. `antigravity_img.webp`가 1000×920 원본인데 약 15×14px로 표시됐다.
- 비합성 애니메이션: 13개. 주로 border color와 box-shadow 변화였다.
- Accessibility, Best Practices, SEO는 모두 100점이었다.

## 원인 분석

### 1. LCP 텍스트가 opacity 애니메이션 뒤에 표시됨

Lighthouse가 확인한 LCP 요소는 히어로 이미지가 아니라 `hero.subtitle`을 출력하는 `<p>`였다. 이 요소는 다음 애니메이션의 영향을 받았다.

- 부모 컨테이너가 `opacity: 0`에서 시작해 0.8초 동안 등장.
- 제목은 0.2초 지연 후 등장.
- 부제목은 0.4초 지연 후 0.8초 동안 등장.
- 설명은 0.6초 지연 후 1초 동안 등장.

보고서의 관측 LCP breakdown에서는 약 2.49초가 element render delay였다. 네트워크에서 LCP 리소스를 늦게 받은 문제가 아니라, 이미 전달된 텍스트를 애니메이션으로 늦게 보여준 것이 핵심이었다.

### 2. 모든 Notion 프로젝트 데이터가 초기 응답에 직렬화됨

변경 전 `src/app/page.tsx`는 서버 컴포넌트에서 다음 작업을 수행했다.

1. `await queryClient.prefetchQuery(["projects-data"])` 실행.
2. `getAllProjectRecordMaps()`가 등록된 프로젝트 13개의 Notion 페이지를 `Promise.all`로 요청.
3. 전체 결과를 `dehydrate(queryClient)`로 초기 RSC/HTML에 포함.
4. 브라우저가 모달을 열지 않아도 전체 record map을 다운로드·파싱·hydrate.

`Promise.all`은 서버의 Notion 요청을 병렬화하지만, 결과 데이터의 전송량과 브라우저 파싱 비용을 줄여주지는 않는다. 정적 페이지 캐시 덕분에 서버 응답 자체는 빨랐지만, 압축 해제 후 수 MB인 데이터가 초기 문서와 RSC에 포함되어 메인 스레드와 TBT에 부담을 줬다.

즉, 기존 구조는 “첫 화면 렌더 후 백그라운드 프리페치”가 아니라 “전체 Notion 데이터를 초기 페이지에 포함하는 서버 선행 프리페치”였다.

### 3. 이번 변경 범위 밖의 보조 원인

- `wave-untouched.mp4` 약 1.4MB.
- 초기 JavaScript와 CSS 중 사용하지 않는 코드.
- 실제 표시 크기보다 큰 일부 이미지.
- box-shadow와 border color를 변경하는 애니메이션.

이 항목들은 이번 1·2차 핵심 수정 이후 재측정 결과를 보고 후속 개선한다.

## 최종 적용 내용

### 히어로 LCP 즉시 표시

`src/components/hero/hero-section.tsx`에서 제목, 부제목, 설명과 그 부모의 초기 opacity/지연 애니메이션을 제거했다.

- 핵심 텍스트는 서버가 생성한 HTML의 첫 페인트부터 보인다.
- 버튼, 영상, 장식 요소의 애니메이션은 유지해 전체 시각적 성격은 보존했다.
- `prefers-reduced-motion`과 무관하게 핵심 콘텐츠가 숨겨져 기다리는 상태가 사라졌다.

### Notion 전체 프리페치는 유지

초기 응답에서 Notion 데이터를 제거하고 카드 hover 시 단건 API를 호출하는 구조도 검증했다. 이 구조에서는 초기 HTML이 118,502 bytes까지 줄었지만, 사용자가 카드를 바로 클릭하거나 모바일에서 터치하면 API 요청이 끝나지 않아 추가 대기가 발생할 수 있었다.

프로젝트 클릭 후 Notion API를 추가로 기다리지 않는 기존 UX를 우선하기로 결정해 다음 구조를 유지했다.

1. 서버가 프로젝트 13개의 Notion 데이터를 병렬로 가져온다.
2. React Query 캐시를 초기 페이지에 hydrate한다.
3. 모달은 이미 준비된 데이터를 사용하므로 클릭 후 Notion API를 새로 호출하지 않는다.

따라서 118KB는 단건 API 실험 결과이며 최종 배포 구조의 초기 문서 크기가 아니다. 포트폴리오 성과 수치로 사용하지 않는다.

## 로컬 검증 결과

2026-09-30 단건 API 실험 당시 검증값:

- `npm run build`: 성공.
- 변경 파일 대상 ESLint: 성공.
- 전체 `npm run lint`: 기존 `notion2folio` CommonJS 소스, navbar, skills 컴포넌트의 선행 린트 오류 때문에 실패. 이번 변경에서 새로 발생한 오류는 없다.
- 초기 HTML 크기: 118,502 bytes.
- 초기 HTML에서 `recordMap`, `collection_query` 문자열이 검출되지 않음.
- 등록 프로젝트 단건 API 첫 요청: 200, 272,000 bytes, 약 1.85초.
- 동일 API 서버 캐시 후 요청: 200, 272,000 bytes, 약 28ms.
- 미등록 프로젝트 API: 404, 약 5ms.
- Playwright 브라우저 검증: 첫 카드 hover 시 단건 API가 한 번 호출되고, 클릭 후 dialog와 Notion 본문이 정상 표시됨.

이 실험은 클릭 후 추가 API 대기를 없애려는 요구사항 때문에 최종적으로 되돌렸다. 현재 코드 검증값과 최종 배포 정보는 아래에 별도로 기록한다.

전체 프리페치 복원 후 로컬 검증값:

- `npm run build`: 성공.
- 변경 파일 대상 ESLint: 성공.
- 초기 HTML 크기: 3,949,279 bytes.
- 초기 HTML에서 `collection_query` 13개 확인.
- 첫 프로젝트 카드를 클릭했을 때 `/api/projects` 추가 요청 없음.
- dialog와 Notion 본문 정상 표시. 로컬 환경에서 클릭부터 Notion 본문 표시까지 약 1.84초가 걸렸으며, 이는 추가 Notion API 요청 시간이 아니라 모달 코드 로딩과 Notion 본문 렌더링을 포함한 시간이다.

## 배포 후 재측정 절차

### 최종 배포 및 스모크 테스트

전체 프리페치를 복원하고 히어로 핵심 텍스트의 지연 애니메이션만 제거한 버전을 2026-09-30에 배포했다.

- 프로덕션 배포: `https://mingyu-portfolio-odz29g7te-nile27s-projects.vercel.app`
- 운영 별칭: `https://mingyu-portfolio.vercel.app`
- 운영 초기 HTML 크기: 3,971,484 bytes.
- 운영 초기 HTML에서 `collection_query` 13개 확인.
- 첫 프로젝트 카드 클릭 후 dialog와 Notion 본문 정상 표시.
- 클릭 과정에서 `/api/projects` 추가 요청 0건. 서버에서 준비해 hydrate한 전체 프로젝트 데이터를 사용했다.
- 헤드리스 브라우저 검증 환경에서 클릭부터 Notion 본문 표시까지 약 2.04초가 걸렸다. 이 값은 Lighthouse 점수가 아니며 실행 환경에 따라 달라질 수 있다.

배포 및 기능 스모크 테스트는 완료했지만, Lighthouse 재측정은 실제 Chrome 시크릿 창에서 아래 절차로 별도 수행해야 한다.

1. 배포가 완료될 때까지 기다린다.
2. Chrome 시크릿 창을 새로 연다.
3. DevTools를 열고 Lighthouse로 이동한다.
4. 기존과 동일하게 Desktop, Navigation, Performance를 선택한다.
5. 다른 탭과 확장 프로그램의 영향을 최소화한다.
6. 최소 3회 측정하고 중앙값을 기록한다.
7. 첫 화면을 측정할 때 프로젝트 카드를 hover하거나 클릭하지 않는다.
8. 아래 표에 결과를 추가한다.

| 측정 | Performance | FCP | LCP | Speed Index | TBT | CLS | 초기 문서/RSC 특이사항 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| 변경 전 | 89 | 0.8초 | 1.4초 | 1.3초 | 180ms | 0 | 전체 Notion 데이터 포함, 텍스트 지연 애니메이션 적용 |
| 배포 후 1회 | — | — | — | — | — | — | — |
| 배포 후 2회 | — | — | — | — | — | — | — |
| 배포 후 3회 | — | — | — | — | — | — | — |

## 기대 효과와 다음 판단 기준

최종 변경은 LCP 텍스트의 인위적인 표시 지연만 제거한다. 전체 Notion 데이터는 모달 즉시 표시를 위해 초기 응답에 계속 포함된다. 따라서 초기 문서 크기와 TBT 관련 병목은 남아 있으며, 재측정 결과를 기존 89점과 비교해야 한다.

점수가 충분히 개선되지 않으면 모달 즉시 표시 UX를 유지할 수 있는 다른 데이터 축소 방식이나 히어로 MP4 최적화를 별도 검토한다.
