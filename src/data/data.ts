export const portfolioData = {
  hero: {
    title: "Mingyu’s Portfolio",
    subtitle: "다양한 기술 스택을 유연하게 활용하여 효율적이고 안정적인 서비스를 구축합니다.",
    description: "사용자의 불편을 해소하고 서비스 가치를 실현하기 위해, 도구에 제한을 두지 않고 완성도 높은 소프트웨어를 개발합니다.",
  },
  about: {
    name: "임민규",
    email: "ddj03104@gmail.com",
    image: "/X6sj3.jpg",
    github: "https://github.com/nile27",
    university: "한남대학교 컴퓨터무인기술학과 컴퓨터 트랙 (졸업)",
    introduction: `사용자의 불편을 해소하는 데서 모든 개발이 시작된다고 믿습니다. 직관적인 UI/UX부터 안정적인 시스템 구조까지 서비스 전반의 완성도를 높여 사용자에게 최선의 경험을 전달하고자 합니다.

팀을 위해 스스로 해야 할 일을 찾아 실행하고, 원활한 소통을 통해 실질적인 기여를 해냈을 때 가장 큰 보람을 느낍니다. 함께 목표를 이루며 성취를 공유하는 개발자로 성장하고자 합니다.

웹 서비스부터 데스크톱 애플리케이션 개발까지 다양한 기술을 다뤄왔습니다. 화면 설계부터 서버/클라이언트 개발 및 배포까지 서비스의 라이프사이클 전반을 경험하며 역할 간의 흐름을 유기적으로 이해하려 노력했습니다.`,
  },
  careers: [
    {
      company: "대모산개발단",
      role: "프론트엔드 엔지니어 (인턴)",
      period: "2025.10.27 - 2025.11.26",
      tags: ["Next.js", "TypeScript"],
      details: [
        {
          title: "주요 역할 및 기여",
          items: [
            "프론트엔드 구현 전반 담당",
            "확장성과 유지보수를 고려한 UI 구조 설계",
            "사용자·관리자 페이지를 분리한 화면 구조 구현"
          ]
        },
        {
          title: "핵심 기능 구현 내용",
          items: [
            "관리자 대시보드(대시보드/콘텐츠/게시판) UI·기능 구현",
            "Recharts.js 기반 통계 시각화 기능 개발",
            "AWS S3 Presigned URL을 활용한 이미지 업로드 기능 구현"
          ]
        },
        {
          title: "프로젝트 성과",
          items: [
            "화면 설계 → 상태/데이터 연동 → 배포까지 FE 개발 흐름 경험",
            "관리자 기능(권한/관리 화면) 설계 경험"
          ]
        }
      ]
    }
  ],
  projects: [
    {
      title: "Notion_Portfolio - 포트폴리오 웹사이트",
      description: "Notion을 CMS로 활용해 콘텐츠를 실시간으로 관리하고, TanStack Query 백그라운드 프리페칭과 Dynamic Import를 활용하여 Lighthouse 성능 99점 및 검색 엔진 최적화(SEO)를 달성한 포트폴리오 사이트입니다.",
      tags: ["Next.js", "TypeScript", "react-notion-x", "TanStack Query", "Tailwind CSS", "Framer Motion"],
      notionId: "37961be3ce858008ab4cf3c8642f496e",
      image: "/logo/Notion_Portfolio.svg",
      categories: ["Next.js"],
    },
    {
      title: "DNF Discord Bot",
      description: "캐릭터 아이템 획득 알림을 제공하는 디스코드 봇 및 백엔드 데몬입니다.",
      tags: ["C#", ".NET 10.0", "Discord.Net", "SQLite", "네오플 공용 API"],
      notionId: "38061be3ce8580dfb962c851a0ca6a1b",
      image: "/logo/DNF Discord Bot.png",
      categories: ["C#"],
    },
    {
      title: "MarkFlow - 마크다운 문서 병합 데스크톱 앱",
      description: "여러 개로 나뉘어 작성된 마크다운 문서 조각들을 드래그 앤 드롭하여 배치하고, 관계를 시각화한 뒤 하나로 병합해 주는 C# WPF 기반 데스크톱 생산성 애플리케이션입니다.",
      tags: ["C#", "WPF", ".NET", "AvalonEdit", "Markdown"],
      notionId: "37a61be3ce8580569bf1ebd1f4c71d9d",
      image: "/logo/MarkFlow.png",
      categories: ["C#"],
    },
    {
      title: "SmartEye - 실시간 졸음 감지 프로그램",
      description: "MediaPipe Face Mesh 랜드마크로 눈 개폐 비율(EAR)을 계산하고, 이동 평균 필터링과 임계값 보정을 적용한 실시간 졸음 감지 데스크톱 프로그램입니다.",
      tags: ["Python", "MediaPipe", "Face Mesh", "Multi-Threading"],
      notionId: "37b61be3ce8580f39f30d9208a206f02",
      image: "/logo/SmartEye .svg",
      categories: ["Python"],
    },
    {
      title: "Fresh Recipe - 레시피 탐색 웹 서비스",
      description: "식품안전나라 공공 API를 연동하여 1,140여 개의 레시피를 실시간으로 탐색할 수 있으며, 동시성 요청 제어 및 무한 스크롤 성능이 적용된 웹 서비스입니다.",
      tags: ["JavaScript", "jQuery", "AJAX", "Public API"],
      notionId: "37261be3ce85802fbc91e93a025fd966",
      image: "/logo/Fresh recipe.svg",
      categories: ["JavaScript"],
    },
    {
      title: "데이터얼라인 - 데이터 정제 및 상관관계 분석 스크립트",
      description: "주기와 형식이 다른 공공 데이터를 Pandas로 정제·병합하여 경기 지수를 만들고, 실업률 등 지표 변동 대비 소비(술·담배 지출액) 반응의 상관관계를 통계적으로 산출하여 시각화 보고서를 자동 내보내는 스크립트입니다.",
      tags: ["Python", "Pandas", "Matplotlib", "Data Pipeline", "Statistics"],
      notionId: "37a61be3ce858051a0ecc5fb801448d7",
      image: "/logo/데이터얼라인.png",
      categories: ["Python"],
    },
    {
      title: "Slid to-do - 할 일 + 노트 플랫폼",
      description: "학습 및 작업을 할 일 목록으로 정리하고 노트를 작성하는 서비스입니다. Next.js API Route와 Middleware를 활용한 보안 및 인증 처리를 담당했습니다.",
      tags: ["Next.js", "TypeScript", "Zustand", "Tailwind CSS", "React-Query", "Framer Motion"],
      notionId: "28961be3ce858082a177f5c2af29bcc8",
      image: "/logo/Slid to-do.svg",
      categories: ["Next.js"],
    },
    {
      title: "CoinBrief - 실시간 코인 가격 및 정보 조회 플랫폼",
      description: "웹소켓과 Upbit API를 활용한 실시간 코인 시세 조회 서비스입니다. ApexCharts를 이용한 시각화와 이메일 OTP 인증을 구현했습니다.",
      tags: ["Next.js", "TypeScript", "Socket.io", "ApexCharts", "Firebase", "Express.js"],
      notionId: "1e861be3ce8581559a4de51225e13dcf",
      image: "/logo/CoinBrief.svg",
      categories: ["Next.js", "Express.js"],
    },
    {
      title: "Aight Now - AI기반 주식분석플랫폼",
      description: "AI 기반의 기업 분석 리포트 서비스입니다. 소셜 로그인과 DeepL API를 이용한 뉴스 번역 기능을 구현했습니다.",
      tags: ["Next.js", "TypeScript", "Next-Auth", "Firebase", "DeepL", "LangChain"],
      notionId: "21d61be3ce85805e9f30df5e192e4522",
      image: "/logo/Aight Now .jpg",
      categories: ["Next.js"],
    },
    {
      title: "My_Todo_Calender",
      description: "Express와 MongoDB를 연동한 풀스택 일정 관리 서비스입니다. 공공데이터 API를 활용한 공휴일 처리와 검색 기능을 구현했습니다.",
      tags: ["React", "TypeScript", "Redux-toolkit", "Express.js", "MongoDB"],
      notionId: "1e861be3ce8581c49f9acee307ac3a43",
      image: "/logo/My_Todo_Calendar.svg",
      categories: ["React", "Express.js"],
    },
    {
      title: "잇츠_(맛집 탐색 사이트)",
      description: "사용자 위치 기반 맛집 탐색 및 리뷰 공유 커뮤니티 플랫폼입니다. 지도 API 연동과 필터링 시스템을 통해 최적의 식당 정보를 제공합니다.",
      tags: ["React", "TypeScript", "Redux-toolkit", "Styled-Components"],
      notionId: "28961be3ce858071bcf7f97b9d1d8916",
      image: "/logo/잇츠 .svg",
      categories: ["React"],
    },

  ],
  education: {
    academic: [
      {
        institution: "한남대학교",
        program: "컴퓨터무인기술학과 컴퓨터 트랙 (졸업)",
        period: "2016.03 - 2023.02",
      },
      {
        institution: "Hannam Design Factory",
        program: "다학제간 협업 프로젝트 트랙 (수료)",
        period: "2019.03 - 2020.06",
        description: "다양한 전공자들과 협업하여 아이디어 구체화 및 Prototype 제작\n(K-Water 산학 협력 등)",
      },
    ],
    bootcamps: [
      {
        institution: "한국소프트웨어기술진흥협회",
        program: "AI를 활용한 Node.js와 JavaScript 기반 웹 개발자 양성",
        period: "2026.02 - 2026.07",
        description: "C·C++로 프로그래밍 기초 학습, C#으로 WinForms 데스크톱 앱 구현\n이후 React, Node.js/Express 기반 웹 개발 기술 학습",
      },
      {
        institution: "코드잇 스프린트",
        program: "심화 프론트엔드 엔지니어 부트캠프 (수료)",
        period: "2024.06 - 2024.08",
        description: "Next.js 기반 jest, Tailwind CSS 등 프론트엔드 현업에 필요한 심화 기술 강의 수강 및 팀 협업 프로젝트 진행",
      },
      {
        institution: "스나이퍼팩토리",
        program: "프로젝트 캠프: Next.js 1기 (수료)",
        period: "2024.06 - 2024.08",
        description: "TypeScript, Next.js를 통한 웹 개발 및 API Routes를 이용한 백엔드 교육, 기업 연계 팀 프로젝트 진행",
      },
      {
        institution: "코드스테이츠",
        program: "FrontEnd Engineering 과정 (수료)",
        period: "2022.12 - 2023.06",
        description: "JavaScript, React 기반 프론트엔드 개발 및 약 200여 개의 알고리즘 문제 풀이 협업 프로젝트 진행",
      },
    ],
  },
  awards: [
    {
      title: "컴퓨터공학과 학술제 장려상",
      organization: "한남대학교",
      date: "2022.06",
    },
    {
      title: "학생 창업유망팀 300 최종 선정",
      organization: "교육부, 과학기술정보통신부",
      date: "2020.08",
    },
    {
      title: "산학협력 페스티벌 캡스톤 디자인 경진대회 장려상",
      organization: "한남대학교",
      date: "2019.12",
    },
    {
      title: "Hannam Star Venture 상상창업경진대회 최우수상",
      organization: "한남대학교 창업지원단",
      date: "2019.12",
    },
    {
      title: "WTA 대전 하이테크 페어 아이디어 공모전 장려상",
      organization: "대전광역시, 세계과학도시연합",
      date: "2019.10",
    },
    {
      title: "학생 창업유망팀 300 최종 선정",
      organization: "교육부, 과학기술정보통신부",
      date: "2019.08",
    },
  ],
  skills: [
    // JavaScript & TypeScript
    {
      type: "single",
      name: "TypeScript",
      level: "Intermediate",
      description: "엄격한 타입 정의를 통해 코드의 안정성을 확보하고, 디버깅 효율을 높여 웹 프로젝트 개발에 활용합니다.",
      color: "#3178C6",
      glowColor: "rgba(49, 120, 198, 0.2)",
      category: "JavaScript & TypeScript",
    },
    {
      type: "single",
      name: "JavaScript",
      level: "Intermediate",
      description: "ES6+ 문법에 익숙하며, 비동기 데이터 처리(Promise, async/await) 및 DOM 조작을 원활하게 수행합니다.",
      color: "#F7DF1E",
      glowColor: "rgba(247, 223, 30, 0.15)",
      category: "JavaScript & TypeScript",
    },
    {
      type: "group",
      name: "Web Development",
      color: "#61DAFB",
      glowColor: "rgba(97, 218, 251, 0.2)",
      category: "JavaScript & TypeScript",
      subSkills: [
        {
          name: "Next.js",
          level: "Intermediate",
          description: "SSR/SSG 개념을 실무에 적용하여 속도가 빠른 프리페칭을 구현하고, 메타데이터와 JSON-LD를 통한 SEO를 설계합니다.",
          color: "#ffffff",
          role: "FE"
        },
        {
          name: "React",
          level: "Intermediate",
          description: "컴포넌트 단위 설계에 익숙하며, 훅(Hooks)과 Context API를 활용한 효과적인 상태 관리가 가능합니다.",
          color: "#61DAFB",
          role: "FE"
        },
        {
          name: "Express.js",
          level: "Basic",
          description: "Node.js 기반 REST API 서버를 구현하고, 라우터 설정 및 백엔드 서비스 연동을 경험했습니다.",
          color: "#339933",
          role: "BE"
        }
      ]
    },
    {
      type: "group",
      name: "State Management",
      color: "#FF4154",
      glowColor: "rgba(255, 65, 84, 0.2)",
      category: "JavaScript & TypeScript",
      subSkills: [
        {
          name: "React Query",
          level: "Intermediate",
          description: "서버 상태 관리 라이브러리로 활용하여 비동기 데이터 캐싱, 백그라운드 프리페칭 및 데이터 동기화를 효율적으로 처리합니다.",
          color: "#FF4154"
        },
        {
          name: "Redux",
          level: "Intermediate",
          description: "전역 상태 관리 라이브러리인 Redux-toolkit을 사용하여 컴포넌트 간 복잡한 데이터 흐름을 예측 가능하게 관리합니다.",
          color: "#764ABC"
        },
        {
          name: "Zustand",
          level: "Intermediate",
          description: "가볍고 직관적인 React 전역 상태 관리 라이브러리를 사용해 불필요한 리렌더링 없이 유연하게 전역 상태를 제어합니다.",
          color: "#453224"
        }
      ]
    },
    {
      type: "group",
      name: "CSS & Styling",
      color: "#06B6D4",
      glowColor: "rgba(6, 182, 212, 0.2)",
      category: "JavaScript & TypeScript",
      subSkills: [
        {
          name: "Tailwind CSS",
          level: "Intermediate",
          description: "유틸리티 퍼스트 클래스를 적극 활용하여 반응형 레이아웃 및 다크 모드 스타일링을 효율적으로 구현합니다.",
          color: "#06B6D4"
        },
        {
          name: "Styled-Components",
          level: "Intermediate",
          description: "CSS-in-JS 스타일링 라이브러리를 활용하여 컴포넌트 레벨에서 모듈화되고 동적인 스타일링을 설계합니다.",
          color: "#DB7093"
        },
        {
          name: "Framer Motion",
          level: "Basic",
          description: "React용 인터랙티브 애니메이션 및 모션 그래픽을 컴포넌트에 유연하게 연동합니다.",
          color: "#E10098"
        }
      ]
    },
    {
      type: "single",
      name: "MongoDB",
      level: "Basic",
      description: "NoSQL DB 데이터 모델 설계가 가능하며, Mongoose를 연동한 데이터 CRUD 기능을 구현할 수 있습니다.",
      color: "#47A248",
      glowColor: "rgba(71, 162, 72, 0.15)",
      category: "Database",
    },
    {
      type: "single",
      name: "Firebase",
      level: "Basic",
      description: "BaaS 플랫폼을 활용한 간편한 인증 기능(OAuth, OTP) 연동 및 실시간 데이터베이스 조회 기능을 경험했습니다.",
      color: "#FFCA28",
      glowColor: "rgba(255, 202, 40, 0.2)",
      category: "Database",
    },
    {
      type: "single",
      name: "SQLite",
      level: "Basic",
      description: "경량형 관계형 데이터베이스를 활용하여 로컬 데이터 저장 및 갱신 처리를 구현하고, 데스크톱 애플리케이션의 데이터 영속성을 관리해 보았습니다.",
      color: "#003B57",
      glowColor: "rgba(0, 59, 87, 0.15)",
      category: "Database",
    },

    // C# & .NET
    {
      type: "single",
      name: "C#",
      level: "Intermediate",
      description: "WPF, WinForms 기반 데스크톱 앱 개발 경험이 있으며, 객체지향 설계(OOP)와 클린 코드를 지향합니다.",
      color: "#9B4F96",
      glowColor: "rgba(155, 79, 150, 0.2)",
      category: "C# & .NET",
    },
    {
      type: "group",
      name: ".NET & WPF",
      color: "#512BD4",
      glowColor: "rgba(81, 43, 212, 0.2)",
      category: "C# & .NET",
      subSkills: [
        {
          name: ".NET",
          level: "Intermediate",
          description: "C# 개발 생태계 내에서 WPF 등 클라이언트 애플리케이션 개발의 핵심 프레임워크로 활용합니다.",
          color: "#512BD4"
        },
        {
          name: "WPF",
          level: "Intermediate",
          description: "XAML 레이아웃 구성, 데이터 바인딩, MVVM 패턴을 도입하여 구조적으로 완성도 높은 데스크톱 앱을 만듭니다.",
          color: "#178600"
        }
      ]
    },

    // Python
    {
      type: "single",
      name: "Python",
      level: "Basic",
      description: "Pandas 등을 활용한 데이터 정제 및 분석 스크립트 작성과 MediaPipe를 활용한 졸음 감지 프로그램 개발 경험이 있습니다.",
      color: "#3776AB",
      glowColor: "rgba(55, 118, 171, 0.2)",
      category: "Python",
    },
    {
      type: "group",
      name: "Data & ML Libraries",
      color: "#3776AB",
      glowColor: "rgba(55, 118, 171, 0.2)",
      category: "Python",
      subSkills: [
        {
          name: "Pandas",
          level: "Basic",
          description: "파이썬 데이터 핸들링 라이브러리를 활용해 대용량 csv/공공 데이터를 병합 및 데이터셋으로 정제합니다.",
          color: "#150458"
        },
        {
          name: "MediaPipe",
          level: "Basic",
          description: "실시간 기계 학습 모델을 구현하여 얼굴 랜드마크 인식 및 좌표값 기반의 졸음 상태를 감지합니다.",
          color: "#007FFF"
        }
      ]
    },

    // Tools & Cooperation
    {
      type: "group",
      name: "Tools & Cooperation",
      color: "#F05032",
      glowColor: "rgba(240, 80, 50, 0.2)",
      category: "Tools & Cooperation",
      subSkills: [
        {
          name: "Git",
          level: "Intermediate",
          description: "Git Flow 협업 전략을 이해하고, 브랜치 병합 및 충돌 해결을 통한 소스코드 버전 관리가 가능합니다.",
          color: "#F05032"
        },
        {
          name: "Figma",
          level: "Basic",
          description: "디자인 시안을 정밀하게 분석하고 마크업에 활용하며, 프로토타이핑을 통해 화면 설계 협업을 진행합니다.",
          color: "#F24E1E"
        },
        {
          name: "Claude & Claude Code",
          level: "Intermediate",
          description: "Claude LLM 및 Claude Code CLI를 활용한 코드 구현, 버그 디버깅, 자동화 워크플로우 연동 등을 통해 개발 생산성을 극대화합니다.",
          color: "#CC5A37"
        },
        {
          name: "Antigravity",
          level: "Intermediate",
          description: "Google DeepMind AI 코딩 에이전트를 이용한 대규모 리팩토링, 자동화 테스트 구축 및 프로젝트 마이그레이션을 페어 프로그래밍으로 수행합니다.",
          color: "#3B82F6"
        }
      ]
    }
  ],
};
