import type { Project } from "./types";

const TASTEBOX_IMAGE_DIR = "/images/projects/tastebox";
const TODAY_LOG_IMAGE_DIR = "/images/projects/today-log";
const YOUTUBE_CLONE_IMAGE_DIR = "/images/projects/youtube-clone";
const BOOK_STORE_IMAGE_DIR = "/images/projects/book-store";

export const PROJECTS: Project[] = [
  {
    slug: "tastebox",
    badge: "TEAM PROJECT · FRONTEND",
    title: "TasteBox",
    tagline:
      "취향에 맞는 영화와 TV 콘텐츠를 발견하고, 나만의 컬렉션 보드로 모아두는 콘텐츠 추천 서비스",
    summary:
      "React 19 + TypeScript 기반 SPA로, 5인 팀(FE 3 · BE 2)에서 프론트엔드를 맡아 컬렉션 · 장르 도메인과 공통 기반을 구현했습니다.",
    links: [
      {
        label: "GitHub · Frontend",
        href: "https://github.com/StepUp2025/TasteBox-Frontend",
        variant: "primary",
        icon: "github",
      },
      {
        label: "GitHub · Backend",
        href: "https://github.com/StepUp2025/TasteBox-Backend",
        icon: "github",
      },
    ],
    heroMedia: { src: `${TASTEBOX_IMAGE_DIR}/hero.png`, alt: "메인 화면" },

    overview: {
      meta: [
        { label: "기간", value: "2025.06 ~ 2025.07 (1개월)" },
        { label: "인원", value: "5인 (프론트엔드 3 · 백엔드 2)" },
        { label: "역할", value: "프론트엔드" },
        { label: "구분", value: "팀 프로젝트 (StepUp2025)" },
      ],
      description:
        "영화 · TV 콘텐츠를 **탐색하고, 취향 장르를 설정하고, 컬렉션 보드로 모아보는** 개인화 추천 서비스입니다. 프론트엔드 팀원으로서 **컬렉션 · 장르 도메인 전체**와 함께 **MSW 목 서버, axios 클라이언트, 토스트 · 에러 페이지 같은 공통 기반**을 담당했고, 프로젝트 초기 세팅부터 반응형 마무리까지 45개의 PR로 기여했습니다.",
    },

    features: [
      {
        title: "컬렉션 보드 생성 · 수정 · 삭제",
        description:
          "제목 · 설명 · 썸네일을 입력해 컬렉션 보드를 만들고, react-hook-form + zod로 유효성을 검사합니다. 삭제는 확인 모달을 거치도록 했습니다.",
        media: {
          src: `${TASTEBOX_IMAGE_DIR}/collection-create.png`,
          alt: "컬렉션 보드 생성 화면",
        },
      },
      {
        title: "컬렉션 콘텐츠 관리",
        description:
          "컬렉션 상세에서 담긴 콘텐츠를 확인하고, 별도 편집 페이지에서 콘텐츠를 추가 · 삭제할 수 있습니다. 새 컬렉션을 만들 때 선택한 콘텐츠가 바로 담기도록 구현했습니다.",
        media: {
          src: `${TASTEBOX_IMAGE_DIR}/collection-edit.png`,
          alt: "컬렉션 콘텐츠 편집 화면",
        },
      },
      {
        title: "TV · 영화 장르별 탐색",
        description:
          "장르를 선택해 TV · 영화 콘텐츠를 장르별로 모아볼 수 있는 페이지를 구현했습니다.",
        media: { src: `${TASTEBOX_IMAGE_DIR}/genre.png`, alt: "장르 페이지 화면" },
      },
      {
        title: "영화 · TV 취향 장르 선택",
        description:
          "영화와 TV 시리즈의 선호 장르를 단계별로 선택하고, 이전 · 다음 페이지를 오가도 선택 값이 유지되도록 해 마지막 단계에서 한 번에 제출합니다.",
        media: {
          src: `${TASTEBOX_IMAGE_DIR}/preference.png`,
          alt: "영화 · TV 취향 장르 선택 화면",
        },
      },
    ],

    techStack: [
      {
        category: "FRONTEND",
        items: [
          {
            name: "React 19 + TypeScript",
            reason:
              "API 요청 · 응답 타입을 고정해 백엔드와의 계약을 코드로 드러내고, 협업 중 타입 불일치를 빌드 단계에서 잡기 위해 사용했습니다.",
          },
          {
            name: "TanStack Query v5",
            reason:
              "컬렉션 · 장르처럼 서버에서 오는 데이터를 커스텀 훅으로 감싸 캐싱 · 리페치를 위임하고, 클라이언트 상태와 분리하기 위해 사용했습니다.",
          },
          {
            name: "Zustand",
            reason:
              "인증 · 테마처럼 가볍지만 전역에서 필요한 상태를 보일러플레이트 없이 관리하기 위해 사용했습니다.",
          },
          {
            name: "react-hook-form + zod",
            reason:
              "컬렉션 생성 · 수정 폼의 유효성 규칙을 스키마로 선언해 생성과 수정 화면에서 같은 규칙을 재사용하기 위해 사용했습니다.",
          },
          {
            name: "styled-components",
            reason:
              "글로벌 테마와 공통 스타일을 토큰처럼 공유하고, props에 따라 달라지는 스타일을 컴포넌트 안에서 다루기 위해 사용했습니다.",
          },
          {
            name: "MSW v2",
            reason:
              "백엔드 API가 완성되기 전에도 명세 기반 핸들러로 화면을 먼저 개발 · 검증하기 위해 도입했습니다.",
          },
        ],
      },
      {
        category: "COLLABORATION",
        items: [
          {
            name: "Biome · Husky · commitlint",
            reason:
              "프론트엔드 3인이 같은 포맷 · 커밋 컨벤션을 지키도록 커밋 전에 자동으로 검사했습니다.",
          },
        ],
      },
    ],

    architecture: {
      notes: [
        {
          title: "FSD (Feature-Sliced Design)",
          description:
            "app · pages · widgets · features · entities · shared 레이어로 나눠, 팀원마다 맡은 도메인을 독립적으로 개발해도 충돌이 적도록 구성했습니다.",
        },
        {
          title: "인증 · 비인증 요청 분리",
          description:
            "axios 인스턴스를 httpClient와 authClient로 나눠, 토큰이 필요한 요청과 아닌 요청을 호출 지점에서 명확히 구분했습니다.",
        },
        {
          title: "Mock-First 개발",
          description:
            "MSW 실행 기반과 컬렉션 · 장르 핸들러를 먼저 만들어, 백엔드 완성 전에 화면 개발을 진행하고 이후 실제 API로 교체했습니다.",
        },
      ],
    },

    challenges: [
      {
        hash: "#328b255",
        title: "장르 선택 데이터 유지",
        problem:
          "취향 장르는 영화와 TV 시리즈를 한꺼번에 제출해야 해서, 영화 장르 선택 값을 다음 페이지(TV 장르 선택)까지 가져가야 했습니다.",
        cause:
          "선택 값이 컴포넌트 상태에만 있어, 이전 · 다음 버튼으로 페이지를 이동하면 앞에서 고른 장르가 사라졌습니다.",
        solution:
          "선택한 장르를 sessionStorage에 저장하고, 페이지 진입 시 저장된 값을 불러와 선택 상태를 복원하도록 했습니다.",
        result:
          "**이전 · 다음 버튼을 오가도 선택한 장르가 유지**되어, 마지막 단계에서 영화 · TV 장르를 한 번에 제출할 수 있게 되었습니다.",
      },
      {
        hash: "#88b67b5",
        title: "새 컬렉션 생성 시 콘텐츠 누락",
        problem:
          "콘텐츠를 담으려다 새 컬렉션을 만들면, 컬렉션은 생성되지만 담으려던 콘텐츠는 저장되지 않았습니다.",
        cause:
          "컬렉션 생성 페이지로 이동하면서 담으려던 콘텐츠 정보가 전달되지 않아, 생성 후 콘텐츠를 추가할 수 없었습니다.",
        solution:
          "이동 시 콘텐츠 id를 라우터 state로 넘기고, 생성 페이지에서 useLocation으로 받아 컬렉션 생성 성공 후 콘텐츠 추가 훅을 호출했습니다.",
        result:
          "**새 컬렉션을 만들면 담으려던 콘텐츠가 바로 추가된 상태**로 생성되도록 흐름을 완성했습니다.",
      },
      {
        hash: "#56f54ca",
        title: "호버 효과 불일치",
        problem:
          "카드 · 버튼 등 여러 요소의 호버 효과가 컴포넌트마다 제각각이라 화면 전체의 인터랙션이 일관되지 않았습니다.",
        cause:
          "호버 스타일을 컴포넌트마다 따로 작성해, 색 · 투명도 · 전환 속도가 서로 달랐습니다.",
        solution:
          "테마 색을 사용하는 공통 hoverOverlay 스타일을 만들어, 호버가 필요한 컴포넌트에서 재사용하도록 했습니다.",
        result:
          "**전체 화면의 호버 효과를 하나로 통일**하고, 수정이 필요할 때 한 곳만 바꾸면 되도록 했습니다.",
      },
      {
        hash: "#b6dd6bb",
        title: "불필요한 토큰 전송",
        problem:
          "모든 API 요청이 하나의 axios 인스턴스를 사용해, 토큰이 필요 없는 요청까지 인증 처리를 거쳤습니다.",
        cause:
          "인증이 필요한 요청과 필요 없는 요청을 구분하는 기준 없이 같은 클라이언트로 호출하고 있었습니다.",
        solution:
          "axios 인스턴스를 비인증용 httpClient와 요청 인터셉터로 토큰을 붙이는 authClient로 분리했습니다.",
        result:
          "**토큰이 필요한 요청에만 토큰을 실어 보내**고, 호출 지점에서 인증 여부가 명확히 드러나도록 했습니다.",
      },
    ],
  },
  {
    slug: "today-log",
    badge: "PERSONAL PROJECT · FRONTEND",
    title: "Today Log",
    tagline:
      "오늘 할 일을 빠르게 기록하고 완료해가며, 꾸준히 하고 싶은 습관은 포도알로 모아가는 투두 웹 애플리케이션",
    summary:
      "React 19 + TypeScript + Vite 기반 SPA로, 기획부터 디자인 · 개발 · 배포까지 혼자 진행한 개인 프로젝트입니다.",
    links: [
      {
        label: "Live Demo",
        href: "https://today-log.netlify.app/",
        variant: "primary",
        icon: "demo",
      },
      {
        label: "GitHub",
        href: "https://github.com/eunmilee89/todo-list-app",
        icon: "github",
      },
    ],
    heroMedia: { src: `${TODAY_LOG_IMAGE_DIR}/hero.png`, alt: "메인 화면" },

    overview: {
      meta: [
        {
          label: "기간",
          value: "2026.02 ~ 2026.03 (포도알 모으기 2026.11 추가)",
        },
        { label: "인원", value: "1인" },
        { label: "역할", value: "기획 · 디자인 · 프론트엔드" },
        { label: "구분", value: "개인 프로젝트" },
      ],
      description:
        "오늘 날짜를 기준으로 **할 일을 추가 · 완료 · 수정 · 고정 · 정렬**할 수 있는 투두 앱입니다. 모든 할 일을 마치면 컨페티로 성취감을 주고, 꾸준히 하고 싶은 습관은 **포도알 모으기** 페이지에서 하루 한 알씩 칠해 포도 한 송이를 완성하도록 했습니다. 서버 없이 **localStorage에 데이터와 테마를 저장**해 새로고침해도 상태가 유지됩니다.",
    },

    features: [
      {
        title: "인라인 편집 · 고정 · 드래그 정렬",
        description:
          "항목에 호버하면 편집 · 고정 · 삭제 버튼이 나타나고, 편집 시 그 자리에서 입력창으로 전환됩니다. 고정한 항목은 목록 상단에 유지되며, 드래그 핸들로 순서를 바꿀 수 있습니다.",
        media: {
          src: `${TODAY_LOG_IMAGE_DIR}/edit.png`,
          alt: "할 일 인라인 편집 화면",
        },
      },
      {
        title: "모두 완료 시 컨페티",
        description:
          "All · Active · Completed 필터로 항목을 나눠 보고, 모든 할 일을 완료하면 컨페티 애니메이션이 재생됩니다. 삭제 · 완료 삭제처럼 되돌릴 수 없는 작업은 확인 모달을 거칩니다.",
        media: {
          src: `${TODAY_LOG_IMAGE_DIR}/completed.png`,
          alt: "모든 할 일 완료 시 컨페티 화면",
        },
      },
      {
        title: "포도알 모으기",
        description:
          "목표 이름 · 포도알 개수 · 품종 색상을 정해 포도송이를 만들고, 하루에 한 알씩 칠해 진행률을 확인합니다. 한 송이를 모두 채우면 컨페티가 실행됩니다.",
        media: {
          src: `${TODAY_LOG_IMAGE_DIR}/grape-todo.png`,
          alt: "포도알 모으기 화면",
        },
      },
      {
        title: "다크 모드",
        description:
          "시스템 테마를 기본값으로 따르고, 헤더의 달 아이콘으로 전환한 테마는 localStorage에 저장해 다음 방문에도 유지됩니다.",
        media: {
          src: `${TODAY_LOG_IMAGE_DIR}/dark-mode.png`,
          alt: "다크 모드 화면",
        },
      },
    ],

    techStack: [
      {
        category: "FRONTEND",
        items: [
          {
            name: "React 19 + TypeScript",
            reason:
              "할 일 · 포도 데이터의 형태를 타입으로 고정해, 상태를 바꾸는 핸들러와 컴포넌트 props가 어긋나지 않도록 하기 위해 사용했습니다.",
          },
          {
            name: "Vite",
            reason:
              "서버 없이 동작하는 SPA라 빠른 개발 서버와 간단한 정적 빌드가 필요해 사용했습니다.",
          },
          {
            name: "React Router v7",
            reason:
              "투두 목록 · 포도 목록 · 포도 상세 페이지를 URL로 나누고, 없는 경로는 404 페이지로 보내기 위해 사용했습니다.",
          },
          {
            name: "CSS Modules",
            reason:
              "컴포넌트마다 스타일 범위를 분리해 클래스 이름 충돌 없이 다크 모드 · 반응형 스타일을 작성하기 위해 사용했습니다.",
          },
          {
            name: "@hello-pangea/dnd · canvas-confetti",
            reason:
              "드래그 정렬과 완료 애니메이션을 직접 구현하는 대신, 접근성과 동작이 검증된 라이브러리에 맡기기 위해 사용했습니다.",
          },
        ],
      },
    ],

    architecture: {
      notes: [
        {
          title: "Context로 테마 관리",
          description:
            "다크 모드 상태를 DarkModeContext로 감싸, 어떤 컴포넌트에서도 props 전달 없이 테마를 읽고 전환할 수 있도록 했습니다.",
        },
        {
          title: "localStorage 영속화",
          description:
            "할 일 · 포도 · 테마를 localStorage에 저장하고, useState의 지연 초기화로 첫 렌더링 때 한 번만 읽어오도록 했습니다.",
        },
        {
          title: "파생 상태는 렌더링 중 계산",
          description:
            "필터 결과 · 고정 항목 정렬 · 전체 완료 여부를 별도 상태로 두지 않고 할 일 배열에서 계산해, 상태가 서로 어긋나지 않도록 했습니다.",
        },
      ],
    },

    challenges: [
      {
        hash: "#b153aba",
        title: "수정할 때마다 스크롤 이동",
        problem:
          "할 일을 추가하면 새 항목으로 스크롤되도록 했는데, 기존 항목을 수정하거나 완료 체크할 때도 화면이 맨 아래로 이동했습니다.",
        cause:
          "스크롤 effect의 의존성이 todos 배열 전체여서, 항목 개수와 상관없이 배열이 바뀔 때마다 effect가 다시 실행됐습니다.",
        solution:
          "의존성을 todos.length로 바꿔, 항목 개수가 변할 때만 스크롤이 실행되도록 했습니다.",
        result:
          "**새 할 일을 추가할 때만 해당 위치로 이동**하고, 수정 · 체크 중에는 보던 위치가 유지되도록 했습니다.",
      },
      {
        hash: "#8690826",
        title: "배포 환경에서만 발생한 import 오류",
        problem:
          "로컬에서는 정상 동작하던 앱이 배포 빌드에서는 AddTodo 컴포넌트를 찾지 못해 실패했습니다.",
        cause:
          "폴더 이름을 addTodo에서 AddTodo로 바꿨지만, 대소문자를 구분하지 않는 Windows · Git 설정 때문에 저장소에는 이전 이름이 그대로 남아 있었습니다.",
        solution:
          "git에서 폴더 이름 변경을 명시적으로 반영해, 저장소의 경로와 import 경로의 대소문자를 일치시켰습니다.",
        result:
          "**대소문자를 구분하는 배포 환경에서도 빌드가 통과**하고, 이후 컴포넌트 폴더를 PascalCase로 통일했습니다.",
      },
      {
        hash: "#054a69d",
        title: "고정 항목 정렬과 드래그 순서 충돌",
        problem:
          "고정한 할 일을 목록 상단에 보여주면서도, 사용자가 드래그로 정한 순서는 유지해야 했습니다.",
        cause:
          "고정 여부에 따라 원본 배열 자체를 재정렬하면 드래그로 바꾼 순서가 덮어써졌습니다.",
        solution:
          "원본 배열은 그대로 두고, 렌더링할 때 필터 결과를 복사해 고정 여부로만 정렬하도록 했습니다.",
        result:
          "**고정 항목은 항상 상단에, 나머지는 드래그한 순서대로** 보이도록 두 요구사항을 함께 만족시켰습니다.",
      },
    ],
  },
  {
    slug: "youtube-clone",
    badge: "PERSONAL PROJECT · FRONTEND",
    title: "YouTube Clone",
    tagline:
      "YouTube Data API v3를 연동해 인기 영상 탐색, 검색, 영상 재생, 댓글 조회까지 구현한 YouTube 클론 웹 애플리케이션",
    summary:
      "React 19 + TypeScript + TanStack Query 기반 SPA로, 실제 API와 목 데이터를 갈아끼울 수 있는 구조로 설계한 개인 프로젝트입니다.",
    links: [
      {
        label: "Live Demo",
        href: "https://youtube-clone-coding-project-2026.netlify.app/",
        variant: "primary",
        icon: "demo",
      },
      {
        label: "GitHub",
        href: "https://github.com/eunmilee89/Youtube",
        icon: "github",
      },
    ],
    heroMedia: {
      src: `${YOUTUBE_CLONE_IMAGE_DIR}/hero.png`,
      alt: "인기 영상 홈 화면",
    },

    overview: {
      meta: [
        { label: "기간", value: "2026.04 ~ 2026.08" },
        { label: "인원", value: "1인" },
        { label: "역할", value: "프론트엔드" },
        { label: "구분", value: "개인 프로젝트" },
      ],
      description:
        "**YouTube Data API v3**로 인기 영상 피드, 키워드 검색, 영상 재생, 댓글 · 답글 조회를 구현한 클론 프로젝트입니다. API 쿼터가 소진돼도 개발을 이어갈 수 있도록 **실제 API 클래스와 목 데이터 클래스를 같은 인터페이스로 분리**하고, Context로 주입해 한 곳에서 전환하도록 했습니다. 목록 · 댓글은 **useInfiniteQuery + IntersectionObserver**로 무한 스크롤을 적용했습니다.",
    },

    features: [
      {
        title: "인기 영상 홈 피드",
        description:
          "홈 화면에서 YouTube의 인기 영상(mostPopular) 목록을 불러와 카드 그리드로 보여주고, useInfiniteQuery + IntersectionObserver로 스크롤이 끝에 닿으면 다음 페이지를 이어서 불러옵니다.",
        media: {
          src: `${YOUTUBE_CLONE_IMAGE_DIR}/hero.png`,
          alt: "인기 영상 홈 화면",
        },
      },
      {
        title: "키워드 검색 · 무한 스크롤",
        description:
          "헤더의 검색창으로 키워드를 입력하면 관련 영상 목록을 보여주고, 스크롤이 끝에 닿으면 다음 페이지를 자동으로 불러옵니다. 로딩 중에는 스켈레톤 UI를 표시합니다.",
        media: {
          src: `${YOUTUBE_CLONE_IMAGE_DIR}/search.png`,
          alt: "키워드 검색 결과 화면",
        },
      },
      {
        title: "영상 재생 · 관련 영상",
        description:
          "영상 재생 페이지에서 채널 정보와 설명(더보기 · 접기)을 보여주고, 옆에 관련 영상 목록을 배치했습니다. 화면이 좁아지면 관련 영상이 아래로 이동하도록 반응형으로 구성했습니다.",
        media: {
          src: `${YOUTUBE_CLONE_IMAGE_DIR}/watch.png`,
          alt: "영상 재생 화면",
        },
      },
      {
        title: "댓글 · 답글",
        description:
          "댓글과 답글을 최신순 · 인기순으로 불러오고, 좋아요 · 싫어요를 누르면 아이콘 상태가 바뀝니다. 댓글도 무한 스크롤로 이어서 불러옵니다.",
        media: {
          src: `${YOUTUBE_CLONE_IMAGE_DIR}/comment.png`,
          alt: "댓글 영역 화면",
        },
      },
    ],

    techStack: [
      {
        category: "FRONTEND",
        items: [
          {
            name: "React 19 + TypeScript",
            reason:
              "YouTube API 응답 구조(검색 · 영상 · 채널 · 댓글)를 타입으로 정의해, 응답마다 다른 id 형태를 타입 가드로 안전하게 구분하기 위해 사용했습니다.",
          },
          {
            name: "TanStack Query v5",
            reason:
              "영상 · 채널 · 댓글 데이터를 캐싱하고, useInfiniteQuery의 pageToken 기반 페이지네이션으로 무한 스크롤을 구현하기 위해 사용했습니다.",
          },
          {
            name: "Tailwind CSS v4",
            reason:
              "카드 · 재생 페이지처럼 화면 크기별로 레이아웃이 크게 바뀌는 UI를 유틸리티 클래스로 빠르게 반응형 처리하기 위해 사용했습니다.",
          },
          {
            name: "React Router v7",
            reason:
              "홈 · 검색 결과 · 영상 재생 · 채널 페이지를 URL로 나누고, 검색 키워드를 navigate state로 넘겨 관련 영상에 활용하기 위해 사용했습니다.",
          },
          {
            name: "axios · timeago.js",
            reason:
              "API 요청을 인스턴스로 묶어 공통 파라미터를 관리하고, 업로드 날짜를 '3일 전'처럼 상대 시간으로 표시하기 위해 사용했습니다.",
          },
        ],
      },
    ],

    architecture: {
      notes: [
        {
          title: "Youtube / FakeYoutube 클래스 분리",
          description:
            "실제 API를 호출하는 Youtube 클래스와 public/data의 JSON을 읽는 FakeYoutube 클래스가 같은 메서드를 제공하도록 해, 호출하는 쪽 코드를 바꾸지 않고 데이터 소스를 전환할 수 있게 했습니다.",
        },
        {
          title: "Context로 API 주입",
          description:
            "YoutubeApiProvider에서 사용할 클라이언트를 정하고 useYoutubeApi 훅으로 꺼내 쓰도록 해, 컴포넌트가 구체 구현에 의존하지 않도록 했습니다.",
        },
        {
          title: "역할별 컴포넌트 폴더",
          description:
            "api · context · hooks · pages · components(channel · comment · common · video) · util로 나눠, 재사용 UI와 페이지 단위 코드를 구분했습니다.",
        },
      ],
    },

    challenges: [
      {
        hash: "#a711cd2",
        title: "목 데이터에서 무한 스크롤 미동작",
        problem:
          "실제 API에서는 무한 스크롤이 되는데, 목 데이터로 전환하면 첫 페이지만 보이고 다음 페이지를 불러오지 않았습니다.",
        cause:
          "FakeYoutube가 items 배열만 반환하거나 nextPageToken을 undefined로 고정해, useInfiniteQuery가 다음 페이지가 없다고 판단했습니다.",
        solution:
          "FakeYoutube의 반환값을 실제 API와 같은 { items, nextPageToken } 형태로 통일했습니다.",
        result:
          "**목 데이터에서도 실제 API와 똑같이 무한 스크롤이 동작**해, 쿼터 소진 중에도 스크롤 흐름을 검증할 수 있게 되었습니다.",
      },
      {
        hash: "#03a888d",
        title: "인기 영상에서 관련 영상 미표시",
        problem:
          "검색 결과에서 들어간 영상은 옆에 관련 영상이 보였지만, 인기 영상에서 들어간 영상은 관련 영상 목록이 비어 있었습니다.",
        cause:
          "검색 응답은 id가 { videoId } 객체이고 인기 영상 응답은 id가 문자열이라, 검색 응답 형태만 가정한 코드가 인기 영상 데이터를 처리하지 못했습니다.",
        solution:
          "id 타입으로 두 응답을 구분하는 isSearchResultItem 타입 가드를 만들고, keyword가 없으면 인기 영상을 불러와 같은 카드로 렌더링하도록 했습니다.",
        result:
          "**진입 경로와 상관없이 관련 영상이 표시**되고, 두 응답 타입을 한 컴포넌트에서 안전하게 다루게 되었습니다.",
      },
      {
        hash: "#bb86c5a",
        title: "배포 후 새로고침 시 404",
        problem:
          "Netlify 배포 후 홈이 아닌 페이지(/watch, /results)에서 새로고침하면 404 페이지가 나타났습니다.",
        cause:
          "클라이언트 라우팅 경로를 서버가 실제 파일 경로로 찾으려 했지만, 정적 빌드에는 index.html 하나만 있었습니다.",
        solution:
          "public/_redirects에 모든 경로를 index.html로 돌려주는 규칙을 추가했습니다.",
        result:
          "**어떤 경로에서 새로고침하거나 링크로 바로 들어와도** React Router가 페이지를 정상적으로 렌더링하게 되었습니다.",
      },
    ],
  },
  {
    slug: "book-store",
    badge: "PERSONAL PROJECT · FULLSTACK",
    title: "Book Store",
    tagline:
      "도서 탐색부터 리뷰 · 좋아요 · 장바구니 · 주문까지 온라인 서점의 핵심 흐름을 구현한 풀스택 이커머스 웹 애플리케이션",
    summary:
      "React 19 + TypeScript 프론트엔드와 Express + MariaDB REST API 서버를 모두 직접 구현한 프로그래머스 풀스택 과정 프로젝트입니다.",
    links: [
      {
        label: "GitHub · Frontend",
        href: "https://github.com/eunmilee89/prgms-book-store-frontend",
        variant: "primary",
        icon: "github",
      },
      {
        label: "GitHub · Backend",
        href: "https://github.com/eunmilee89/prgms-book-store-backend",
        icon: "github",
      },
    ],
    heroMedia: { src: `${BOOK_STORE_IMAGE_DIR}/hero.png`, alt: "메인 화면" },

    overview: {
      meta: [
        {
          label: "기간",
          value: "2025.03 ~ 2025.05 (리디자인 2026.11)",
        },
        { label: "인원", value: "1인" },
        { label: "역할", value: "프론트엔드 · 백엔드" },
        { label: "구분", value: "개인 프로젝트 (프로그래머스 풀스택 과정)" },
      ],
      description:
        "도서 목록 · 상세 · 리뷰 · 좋아요 · 장바구니 · 주문까지 **이커머스의 핵심 흐름을 프론트엔드와 백엔드 양쪽에서 직접 구현**한 온라인 서점입니다. 백엔드는 **Express + MariaDB로 REST API와 JWT 인증**을 만들고, 주문처럼 여러 테이블을 함께 바꾸는 요청은 **트랜잭션**으로 묶었습니다. 프론트엔드는 **TanStack Query로 서버 상태를, Zustand로 인증 · 토스트 상태를** 나눠 관리하고, 라이트 / 다크 테마와 모바일 반응형을 지원합니다.",
    },

    features: [
      {
        title: "카테고리 필터 · 무한 스크롤",
        description:
          "카테고리 · 신간 필터를 쿼리스트링으로 유지하고, 그리드 / 리스트 보기를 전환할 수 있습니다. useInfiniteQuery + IntersectionObserver로 스크롤이 끝에 닿으면 다음 페이지를 불러옵니다.",
        media: {
          src: `${BOOK_STORE_IMAGE_DIR}/books.png`,
          alt: "도서 목록 화면",
        },
      },
      {
        title: "도서 상세 · 리뷰 · 좋아요",
        description:
          "도서 정보와 표지 확대 모달, 상세 설명 · 목차 · 리뷰 탭을 제공합니다. 좋아요는 로그인한 사용자 기준으로 추가 · 취소되며, 결과를 토스트로 알려줍니다.",
        media: {
          src: `${BOOK_STORE_IMAGE_DIR}/book-detail.png`,
          alt: "도서 상세 화면",
        },
      },
      {
        title: "장바구니 선택 · 주문 요약",
        description:
          "개별 · 전체 선택으로 주문할 도서를 고르면, 선택한 도서 기준으로 총 수량과 총 금액을 계산해 요약합니다. 선택한 항목만 주문서로 넘어갑니다.",
        media: {
          src: `${BOOK_STORE_IMAGE_DIR}/cart.png`,
          alt: "장바구니 화면",
        },
      },
      {
        title: "주문서 작성 · 주소 찾기",
        description:
          "React Hook Form으로 배송 정보를 검증하고, 다음(카카오) 우편번호 서비스로 주소를 검색합니다. 주문이 완료되면 주문 내역에서 주문별 도서 목록을 펼쳐볼 수 있습니다.",
        media: {
          src: `${BOOK_STORE_IMAGE_DIR}/order.png`,
          alt: "주문서 작성 화면",
        },
      },
    ],

    techStack: [
      {
        category: "FRONTEND",
        items: [
          {
            name: "React 19 + TypeScript",
            reason:
              "도서 · 장바구니 · 주문 모델을 타입으로 정의해, 서버 응답과 화면에서 쓰는 데이터 형태가 어긋나는 지점을 컴파일 단계에서 찾기 위해 사용했습니다.",
          },
          {
            name: "TanStack Query v5",
            reason:
              "도서 목록 · 상세처럼 서버에서 오는 데이터를 캐싱하고, useInfiniteQuery로 페이지 단위 무한 스크롤을 구현하기 위해 사용했습니다.",
          },
          {
            name: "Zustand",
            reason:
              "로그인 상태와 토스트 목록처럼 여러 화면에서 공유하는 클라이언트 상태를 가볍게 관리하기 위해 사용했습니다.",
          },
          {
            name: "styled-components",
            reason:
              "테마 토큰을 ThemeProvider로 내려 라이트 / 다크 테마를 한 번에 전환하고, 미디어 쿼리를 테마에 함께 정의해 반응형을 처리하기 위해 사용했습니다.",
          },
          {
            name: "React Hook Form",
            reason:
              "회원가입 · 로그인 · 주문서 폼의 유효성 검사를 선언적으로 작성하고, 입력마다 리렌더링되지 않도록 하기 위해 사용했습니다.",
          },
          {
            name: "MSW v2 · Faker",
            reason:
              "리뷰 · 배너처럼 백엔드에 아직 없는 API를 목 데이터로 응답해, 서버 구현과 상관없이 화면을 먼저 만들기 위해 사용했습니다.",
          },
        ],
      },
      {
        category: "BACKEND",
        items: [
          {
            name: "Node.js + Express",
            reason:
              "도메인별 라우터와 컨트롤러를 분리해 회원 · 도서 · 좋아요 · 장바구니 · 주문 REST API를 구성하기 위해 사용했습니다.",
          },
          {
            name: "MariaDB (mysql2)",
            reason:
              "도서 · 주문처럼 관계가 뚜렷한 데이터를 테이블로 정규화하고, 주문 API는 mysql2/promise의 트랜잭션으로 묶기 위해 사용했습니다.",
          },
          {
            name: "JWT · crypto",
            reason:
              "로그인 시 발급한 토큰으로 사용자를 식별하고, 비밀번호는 pbkdf2 + salt로 해시해 저장하기 위해 사용했습니다.",
          },
        ],
      },
    ],

    architecture: {
      notes: [
        {
          title: "라우터 · 컨트롤러 분리",
          description:
            "routes는 URI와 컨트롤러 매핑만 담당하고, 비즈니스 로직과 쿼리는 도메인별 Controller에 두어 API가 늘어나도 파일 역할이 섞이지 않도록 했습니다.",
        },
        {
          title: "토큰 기반 사용자 식별",
          description:
            "요청 Body로 받던 userId를 없애고, ensureAuthorization으로 토큰을 검증해 꺼낸 id만 사용하도록 해 다른 사용자의 데이터를 조작할 수 없게 했습니다.",
        },
        {
          title: "API 모듈 · 커스텀 훅 계층",
          description:
            "api 폴더에서 axios 요청과 응답 변환을, hooks에서 상태 관리를 맡겨, 페이지 컴포넌트는 훅이 돌려주는 데이터로 화면만 그리도록 했습니다.",
        },
      ],
    },

    challenges: [
      {
        hash: "#d7efdf3",
        title: "주문 도중 실패 시 데이터 불일치",
        problem:
          "주문은 배송 정보 저장 → 주문 생성 → 주문 도서 저장 → 장바구니 삭제를 차례로 실행하는데, 중간 단계가 실패해도 앞 단계의 데이터는 그대로 남았습니다.",
        cause:
          "네 개의 쿼리가 각각 독립적으로 커밋되어, 하나가 실패해도 이미 실행된 쿼리를 되돌릴 방법이 없었습니다.",
        solution:
          "하나의 커넥션에서 beginTransaction으로 네 쿼리를 묶고, 실패하면 rollback, 모두 성공하면 commit하도록 바꿨습니다. 장바구니 조회 · 삭제 조건에 user_id도 추가했습니다.",
        result:
          "**주문이 전부 성공하거나 전부 취소**되어, 배송 정보만 남거나 장바구니만 지워지는 불일치가 사라졌습니다.",
      },
      {
        hash: "#258dbe4",
        title: "서버 응답 필드명 불일치",
        problem:
          "도서 목록의 카테고리 버튼이 빈 칸으로 보이고, 장바구니의 표지가 모두 같으며 도서를 누르면 /books/undefined로 이동했습니다.",
        cause:
          "서버는 category_id · category_name · book_id처럼 스네이크 케이스로 응답하는데, 프론트 모델은 id · name · bookId를 기대하고 있었습니다.",
        solution:
          "API 모듈에 응답 타입을 따로 정의하고, 요청 함수에서 응답을 프론트 모델 형태로 변환해 반환하도록 했습니다.",
        result:
          "**변환을 API 계층 한 곳에서 처리**해, 컴포넌트는 서버 응답 형태를 몰라도 되고 카테고리 · 장바구니가 정상적으로 표시되었습니다.",
      },
      {
        hash: "#9b9c1f2",
        title: "주소 찾기 후 주소가 입력되지 않음",
        problem:
          "주소 찾기 팝업에서 주소를 선택해도 주문서의 주소 입력란이 채워지지 않았습니다.",
        cause:
          "우편번호 서비스의 완료 콜백 이름을 oncomplete가 아닌 oncompleted로 잘못 적어, 콜백이 한 번도 호출되지 않았습니다.",
        solution:
          "콜백 이름을 oncomplete로 고치고, 사용자가 도로명 · 지번 중 무엇을 골랐는지에 따라 해당 주소를 넘기도록 했습니다.",
        result:
          "**선택한 주소가 입력란에 바로 채워지고**, 사용자가 고른 주소 형식이 그대로 반영되었습니다.",
      },
      {
        hash: "#410f9eb",
        title: "중복 좋아요 요청 시 400 응답",
        problem:
          "이미 좋아요한 도서에 다시 좋아요 요청이 들어오면, 원인을 알 수 없는 400 응답만 돌아왔습니다.",
        cause:
          "likes 테이블의 (user_id, liked_book_id) 복합 키 중복 오류를 다른 DB 오류와 구분하지 않고 모두 400으로 처리했습니다.",
        solution:
          "에러 코드가 ER_DUP_ENTRY이면 409 Conflict와 안내 메시지를 응답하도록 분기했습니다.",
        result:
          "**중복 좋아요를 409로 명확히 구분**해, 클라이언트가 상황에 맞는 메시지를 보여줄 수 있게 되었습니다.",
      },
    ],
  },
];
