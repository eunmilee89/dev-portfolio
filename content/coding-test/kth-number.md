---
title: "K번째수"
date: "2026-04-02"
summary: "명령마다 구간을 slice로 잘라 숫자 비교 함수로 정렬한 뒤 k번째 값을 꺼낸다."
tags: ["정렬", "배열", "구현"]
---

## 문제

배열 `array`의 `i`번째부터 `j`번째까지 잘라 정렬했을 때 `k`번째에 있는 수를 구한다. `[i, j, k]`를 원소로 가진 2차원 배열 `commands`의 모든 명령에 이 연산을 적용한 결과를 배열로 반환한다.

- `array`의 길이는 1 이상 100 이하
- `array`의 각 원소는 1 이상 100 이하
- `commands`의 길이는 1 이상 50 이하
- `commands`의 각 원소는 길이가 3

| array                   | commands                            | return      |
| ----------------------- | ----------------------------------- | ----------- |
| `[1, 5, 2, 6, 3, 7, 4]` | `[[2, 5, 3], [4, 4, 1], [1, 7, 3]]` | `[5, 6, 3]` |

## 접근

문제에서 말하는 위치는 1부터 세고 배열 인덱스는 0부터 시작하므로, 이 차이만 맞추면 그대로 구현하면 된다. `slice`는 원본을 바꾸지 않는 새 배열을 반환하므로 명령마다 원본 `array`를 안전하게 재사용할 수 있다.

1. 각 명령을 `[i, j, k]`로 구조 분해한다.
2. `array.slice(i - 1, j)`로 i번째부터 j번째까지 자른다. `slice`의 끝 인덱스는 포함되지 않으므로 `j`를 그대로 쓴다.
3. `sort((a, b) => a - b)`로 오름차순 정렬한다.
4. 정렬된 배열의 `k - 1` 인덱스 값을 결과에 담는다.

명령 수를 C, 배열 길이를 N이라 하면 시간복잡도는 O(C · N log N)이다.

## 코드

```js
function solution(array, commands) {
  const answer = [];

  for (const [i, j, k] of commands) {
    const sliced = array.slice(i - 1, j).sort((a, b) => a - b);
    answer.push(sliced[k - 1]);
  }

  return answer;
}
```

## 다른 풀이: `map`

명령 하나가 결과 하나로 대응되므로 `map`으로 바로 변환할 수 있다.

```js
function solution(array, commands) {
  return commands.map(
    ([i, j, k]) => array.slice(i - 1, j).sort((a, b) => a - b)[k - 1],
  );
}
```

> `sort()`에 비교 함수를 넘기지 않으면 원소를 문자열로 비교해 `[10, 2]`가 `[10, 2]` 그대로 남는다. 숫자 정렬에는 반드시 `(a, b) => a - b`를 넘긴다.
