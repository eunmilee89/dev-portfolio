---
title: "완주하지 못한 선수"
date: "2026-06-14"
summary: "참가자와 완주자 명단을 정렬해 같은 위치끼리 비교하고, 처음 어긋나는 이름을 반환한다."
tags: ["정렬", "해시", "문자열"]
---

## 문제

마라톤 참가자 배열 `participant`와 완주자 배열 `completion`이 주어질 때, 완주하지 못한 단 한 명의 이름을 반환한다.

- 참가자 수는 1명 이상 100,000명 이하
- `completion`의 길이는 `participant`의 길이보다 1 작음
- 이름은 1자 이상 20자 이하의 알파벳 소문자
- 동명이인이 있을 수 있음

| participant                                         | completion                                 | return     |
| --------------------------------------------------- | ------------------------------------------ | ---------- |
| `["leo", "kiki", "eden"]`                           | `["eden", "kiki"]`                         | `"leo"`    |
| `["marina", "josipa", "nikola", "vinko", "filipa"]` | `["josipa", "filipa", "marina", "nikola"]` | `"vinko"`  |
| `["mislav", "stanko", "mislav", "ana"]`             | `["stanko", "ana", "mislav"]`              | `"mislav"` |

## 접근

두 명단을 같은 기준으로 정렬하면, 완주하지 못한 선수가 나오기 전까지는 같은 인덱스에 같은 이름이 놓인다. 처음으로 이름이 어긋나는 위치의 참가자가 답이다.

1. 두 배열을 복사해 사전순으로 정렬한다.
2. 앞에서부터 같은 인덱스의 이름을 비교한다.
3. 처음 다른 이름이 나오면 그 참가자를 반환한다.
4. 끝까지 같다면 완주하지 못한 선수는 정렬된 참가자 명단의 마지막 사람이다. 이때 `completion[i]`는 `undefined`라서 자연스럽게 비교에서 걸린다.

시간복잡도는 정렬에 따라 O(N log N)이다.

## 코드

```js
function solution(participant, completion) {
  const p = [...participant].sort();
  const c = [...completion].sort();

  for (let i = 0; i < p.length; i++) {
    if (p[i] !== c[i]) {
      return p[i];
    }
  }
}
```

## 다른 풀이: `Map`

이름별 인원수를 세면 정렬 없이 O(N)에 풀 수 있다. 동명이인이 있어도 개수로 처리되므로 문제없다.

```js
function solution(participant, completion) {
  const count = new Map();

  for (const name of participant) {
    count.set(name, (count.get(name) || 0) + 1);
  }

  for (const name of completion) {
    count.set(name, count.get(name) - 1);
  }

  for (const [name, n] of count) {
    if (n > 0) return name;
  }
}
```

> 동명이인 때문에 `Set`이나 `includes`로 "있는지 없는지"만 확인하면 틀린다. 이름이 몇 명인지를 세거나, 정렬로 같은 이름을 나란히 붙여 비교해야 한다.
