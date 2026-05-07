# 📋 [React 과제] Notion-Powered 개인 포트폴리오 사이트
> **사용자 중심의 UI/UX와 확장성을 고려한 Next.js 기반 포트폴리오 개발**

## 1. 프로젝트 개요
- **목표**: 정적인 포트폴리오의 한계를 넘어, Notion을 CMS(Content Management System)로 활용하여 콘텐츠 관리가 용이하고 유지보수가 뛰어난 웹사이트 구축
- **핵심 컨셉**: "Developer Experience + User Experience"
- **주요 특징**: Notion 데이터 실시간 연동, Hash 기반 모달 라우팅, 반응형 인터페이스

## 2. Tech Stack & Rationale
| 기술 | 선택 이유 |
| :--- | :--- |
| **Next.js (App Router)** | SSR/ISR을 통한 SEO 최적화 및 빠른 초기 로딩 속도 확보 |
| **TypeScript** | 정적 타입을 통한 코드 안정성 확보 및 개발 생산성 향상 |
| **Tailwind CSS** | 유틸리티 퍼스트 방식을 통한 신속한 디자인 시스템 구축 및 유지보수 용이성 |
| **Zustand** | 가벼운 상태 관리 라이브러리로 전역 모달 및 사용자 설정 관리 |
| **Framer Motion** | 선언적인 애니메이션 구현으로 고도화된 UI 인터랙션 제공 |

## 3. 핵심 기술 구현 (Technical Highlights)

### 🔗 Notion API 기반 CMS 연동
- `notion-client`와 `react-notion-x`를 활용하여 Notion의 복잡한 Block 구조를 React 컴포넌트로 완벽하게 변환
- 데이터 패칭 로직을 추상화하여 새로운 프로젝트 추가 시 별도의 코드 수정 없이 데이터만으로 업데이트 가능

### 🪟 Hash-based Modal Routing
- **문제**: 일반적인 모달은 새로고침 시 상태가 소실되거나 브라우저 뒤로가기 시 페이지가 이동함
- **해결**: `window.location.hash`를 감지하여 특정 프로젝트 ID에 따른 모달을 띄우는 로직 구현
- **결과**: 모달이 열린 상태에서도 고유 URL을 가질 수 있으며, 브라우저의 '뒤로 가기' 버튼으로 모달 닫기 지원 (사용자 경험 개선)

### 📱 반응형 Grid & Carousel
- 모바일 환경에서의 가독성을 위해 `CSS Grid`와 `Project Carousel`을 결합하여 최적화된 레이아웃 제공

## 4. 트러블슈팅 (Troubleshooting)

### 챌린지: Notion 이미지 렌더링 최적화
- **현상**: Notion API에서 제공하는 이미지 URL은 유효 기간이 짧아 이미지가 깨지는 현상 발생
- **해결**: Next.js의 `Image` 컴포넌트와 `unoptimized` 옵션을 적절히 배합하고, 필수 이미지는 로컬로 정적 호스팅하여 안정성 확보

### 챌린지: 복잡한 데이터 구조의 타입 정의
- **현상**: Notion API 응답 데이터의 타입이 복잡하여 런타임 에러 발생 위험
- **해결**: `ExtendedRecordMap` 등 라이브러리 제공 타입을 확장하고 인터페이스를 엄격하게 정의하여 Type-Safety 확보

## 5. 성과 및 배운 점
- **React 생태계 이해**: 단순 컴포넌트 개발을 넘어 데이터 흐름과 상태 관리의 중요성을 학습
- **API 연동 실무**: 외부 서비스(Notion)의 데이터를 정제하여 서비스에 맞게 가공하는 기술 습득
- **SEO & 성능**: Next.js의 렌더링 전략을 고민하며 웹 표준과 검색 최적화에 대한 깊은 이해

---
**제출자**: 임민규 (Hannam University, Computer Science)
