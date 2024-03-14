---
title: yarn berry 세팅하기
date: 20230429
info: yarn berry 공부해보자
coverImage: https://velog.velcdn.com/images/yoose1002/post/192e98b7-eb1b-45f3-a8df-d929ab0b1d34/image.png
---

yarn berry 가 나오게 된 과정

https://velog.io/@altmshfkgudtjr/yarn2%EC%99%80-%ED%95%A8%EA%BB%98-Plug-n-Play%EB%A5%BC-%EC%A0%81%EC%9A%A9%ED%95%B4%EB%B3%B4%EC%9E%90

> 결론적으로 node_modules 수백개의 패키지가 함께 의존성 설치되기 때문이다. yard berry 를 활용해서 더 이상 node_modules 가 아닌
> .yarn/cache 폴더에 해당 의존성의 정보가 저장되고, 아래와 같이 .pnp.js 파일에 의존성을 찾을 수 있는 정보가 기록됩니다.

yarn berry setting 과정
https://kasterra.github.io/setting-yarn-berry/
https://velog.io/@creco/next.js-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0

---

0. `next / react 로 프로젝트 세팅`

```ts
npx create-react-app@latest my-proj --template typescript  //react로 CRA
npx create-next-app@latest my-proj --template typescript //next 로 CNA
```

1. `yarn set version berry` or `yarn set version stable`-> yarn 버전을 berry 로 설치해준다.
2. `yarn install`
3. `yarn dlx @yarnpkg/sdks vscode` -> 타입 추론을 위해 vscode 를 세팅

- cmd + shift + p(윈도우는 ctrl + shift + p) 로 .yarn/sdks 로 설정

4. `yarn plugin import typescript`
5. `yarn add next@13.0.5` -> next 최신 버전
6. eslint / prettier 설정
   - `yarn add -D @typescript-eslint/eslint-plugin eslint-config-prettier eslint-plugin-prettier`

---
