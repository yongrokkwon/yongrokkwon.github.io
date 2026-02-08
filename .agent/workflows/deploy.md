---
description: 배포 절차 및 트러블슈팅 가이드
---

# 배포 가이드 (Deployment Guide)

이 문서는 프로젝트의 배포 절차와 자주 발생하는 빌드 오류 해결 방법을 설명합니다.

## 배포 절차

이 프로젝트는 Github Pages(`gh-pages` 브랜치)를 통해 배포됩니다.

### 1. 배포 명령어 실행

터미널에서 다음 명령어를 실행하면, `gatsby build`를 수행하고 결과물을 `gh-pages` 브랜치에 자동으로 업로드합니다.

// turbo

```bash
npm run deploy
```

> **참고**: 이 명령어는 `package.json`의 `scripts`에 정의되어 있으며, `gatsby build` 후 `gh-pages -d public`을 순차적으로 실행합니다.

### 2. 소스 코드 커밋 및 푸시

배포가 성공했다면, 변경된 소스 코드(`src/` 등)도 원격 저장소(`main` 브랜치)에 반영해야 합니다.

```bash
git add .
git commit -m "작업 내용 요약"
git push origin main
```

---

## 트러블슈팅 (Troubleshooting)

### 빌드 오류: "Couldn't find temp query result for /404/"

`npm run deploy` (또는 `gatsby build`) 실행 시 다음과 같은 에러가 발생하며 빌드가 실패할 수 있습니다.

```
ERROR
UNHANDLED REJECTION Couldn't find temp query result for "/404/".
Error: Couldn't find temp query result for "/404/".
```

#### 원인

Gatsby의 빌드 과정에서 페이지(`src/pages/404.js`)에 GraphQL 쿼리가 없을 때, 간헐적으로 페이지 데이터를 생성하지 못해 발생하는 오류입니다.

#### 해결 방법

`src/pages/404.js` 파일에 의미 없는(dummy) GraphQL 쿼리를 추가하여 빌드 시스템이 정상적으로 페이지 데이터를 생성하도록 유도합니다.

**수정 예시 (`src/pages/404.js`):**

```javascript
import React from 'react';
import { graphql } from 'gatsby'; // graphql 임포트 추가

// ... 기존 컴포넌트 코드 ...

// 아래와 같이 더미 쿼리를 추가합니다.
export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default NotFoundPage;
```

이 코드를 추가한 후 다시 `npm run deploy`를 실행하면 정상적으로 빌드 및 배포가 진행됩니다.
