---
title: Icon 컴포넌트에 color 넣어봅쉬다🌈 (ft. tailwind, twin.macro)
date: 20230505
info: 그 밈 작업 중에 발견한 것
coverImage: https://velog.velcdn.com/images/yoose1002/post/192e98b7-eb1b-45f3-a8df-d929ab0b1d34/image.png
---

그 밈 서비스는 tailwind 기반 css 를 작업하고 있다.
하지만 조금 더 유연하게 동적으로!! 디자인 하기 위해서 [twin.macro](https://github.com/ben-rogerson/twin.macro) 도 같이 도입했다.

1차 MVP 를 끝내고 다음 작업을 이어가다 아이콘 컴포넌트에 color를 넣는 과정에서 약간 수정할 일이 생겼다.

### 기존 코드

기존에 Icon 컴포넌트에서는 `twin.macro` 를 사용하기 전이라 color 를 할당할 때 color 객체에

```ts
const colors = {
  black: "[&_*]:fill-black [&_*]:stroke-black",
}
...

```

다음과 같이 fill 과 stroke 에 color 를 넣는 tailwind 클래스네임을 저장해서 사용했다.

그래서 Icon 을 사용할 때 다음과 같이

```

<Icon color="black" className ="~~"/>
```

이런 식으로 color 를 넘겨주면 Icon 컴포넌트 내에서 `className={colors[color]}` 를 통해 colors 객체로 color 를 넣어주었다.

### 최종 코드

![](https://velog.velcdn.com/images/yoose1002/post/893da7b2-3a0e-4040-b418-b26137dec044/image.png)

### 에러 발생 🧨

이렇게 잘 하다가 `twin.macro` 를 도입하게 되고 `twin.macro` 의 css 를 활용해서 원활하게 디자인 하던 중에 Icon 에 color 주입이 안되는 상황이 발생했다.....

_PR 에서 발췌.._
![](https://velog.velcdn.com/images/yoose1002/post/c191b462-e978-4ce9-8df6-308d3b0c38bf/image.png)
Icon 컴포넌트를 사용할 때 className 으로 스타일링하면 문제 없지만 `twin.macro` 의 css 를 사용해서 스타일링 하면 여기서 만들어진 className 과 colors객체 안에 있는 클래스 네임이 충돌이 나서 color 가 적용이 안된 것 이었다...!!!

![](https://velog.velcdn.com/images/yoose1002/post/081d2b02-0a37-4183-8e15-e2b9d277a3af/image.png)

위에 보이는 것처럼 twin.macro 의 css 는 임의의 클래스네임을 만드는 것과 같기 때문이다!

### 1차 수정

Icon 컴포넌트에서 기존의 클래스네임 동적 할당에서

- **twin.macro 의 `css` 로 color 주입**
- **colors 객체에는 클래스네임이 아닌 color set 만 저장**
- **stroke 에만 color 를 넣는 상황 고려**

를 생각하고 아래와 같이 리팩토링 했다.

```ts
//Icon.tsx
<Svg
      css={css`
        & * {
          stroke: ${colors[color]};
          ${!isStroke && `fill : ${colors[color]};`}
        }
      `}
```

그런데
**Icon 컴포넌트를 사용하는 쪽에서는**

- stroke 에만 color를 전달하기 위해 isStroke props 를 계속 넣어야 함
  - `<Icon color="gray" isStroke/>`

**Icon 컴포넌트 쪽에서는 **

- colors 객체에 계속 color 를 주입해야 됨

이 두가지에서 뭔가 찝찝했다..

### 2차 수정

역쉬나 똑똑한 팀원분들 코드 리뷰를 통해 앞서 말한 문제에 대한 개선점을 얻었다.

> Icon 컴포넌트에서 `stroke,fill,color` 를 props 로 전달받아서 stroke 만 쓸 땐 `<Icon stroke="gray-600"/>` 처럼 사용하는 건 어떨까?

```ts
- stroke='gray-600'//stroke 만 적용
- fill='gray-600' //fill만 적용
- color='gray-600' //둘다 적용
```

> color를 전달할 때 바로 className으로 할당하면 어떨까?
> => 불필요한 color 객체 없애도 됨!

라는 의견을 받고!! 훨씬 사용성 좋은 컴포넌트가 될 것 같아서 바로 다시 수정했다 🙌

### tailwind 동적 할당 웨않되

> color를 전달할 때 `gray-600`으로 전달해서 바로 className으로 할당하면 어떨까?

tw 나 className 을 활용해서
`[&_*]:fill-${color} [&_*]:stroke-{color}` 처럼 color만 주입시키고자 했다.

#### 하지만 tailwind 는 동적으로 클래스네임을 만들 수 업따..

![](https://velog.velcdn.com/images/yoose1002/post/11b786b4-e974-4f9c-8cbf-12e2652dc88a/image.png)

twin.macro 의 tw 나 className 은 동적으로 클래스네임 자체를 만들 수 없기 때문에 위의 방법으로는 할 수 없었다....

> Icon 컴포넌트에서 `stroke,fill,color` 를 props 로 전달받아서 stroke 만 쓸 땐 `<Icon stroke="gray-600"/>` 처럼 사용하는 건 어떨까?

또한 **stroke 에만 color 를 넣는 상황** 고려했을 때 클래스네임만으로 분기처리 하기에는 어려울 것 같았다.

### 결국 css 로 회귀

className 만으로는 모든 문제 해결할 수 없다고 판단되어
`twin.macro`의 css 로 생각을 전환했다.

> Icon 컴포넌트에서 `stroke,fill,color` 를 props 로 전달받아서 stroke 만 쓸 땐 `<Icon stroke="gray-600"/>` 처럼 사용하는 건 어떨까?

첫 번째 문제는 아래와 같이 구현하여 간단히 해결.

```ts
 <Svg
      css={css`
        & * {
          stroke: ${colors[stroke || color]};
          fill: ${colors[fill || color]};
        }
      `}
```

> color를 전달할 때 `gray-600`으로 전달해서 바로 className으로 할당하면 어떨까?

하지만 `twin.macro` 의 css에서는 tw의 컬러 코드 gray-600을 이해하지 못한다.

그 대신 `theme` 이라는 걸 사용해서
![](https://velog.velcdn.com/images/yoose1002/post/a41c5c14-e779-4258-8d8d-64e0677ed815/image.png)

위처럼 css 내에서도 tw 의 컬러코드를 사용할 수 있는데...
그러려면 `gray-600` => `gray.600` 으로 전환하는 작업이 필요했다.

JS 문자열 메소드로 바꿀 수 있지만 다시 콘솔창에 에러가 났다 하하 😅

### 이번에는 theme 에러

- ![](https://velog.velcdn.com/images/yoose1002/post/21f55bd1-41b3-4c28-8a4d-fe8f24dcfb59/image.png)

`theme` 에 완전한 문자열 (즉, 어떤 변수도 들어가선 안됨) 이 아니라서 에러가 났다.

결국 **colors 객체를 쓰는 건 타협을 볼 수 밖에 없었다**.. 그나마 color set 이 적은게 다행이랄까..

### 결론

1번째 쟁점은 해결했지만 2번째 쟁점이 아직 해결되지 않아 아직 리팩토링의 여지가 남아있다..
