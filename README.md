# adonde-app-Frontend

기술 스택 : RN, expo

본인의 역할 : PM, 프론트엔드, 디자인

팀원 : 백엔드(1명), 프론트엔드(본인)

- 앱에서 새로 추가되는 기능
  - 수익성을 고려한 광고기능
  - 지역의 날씨데이터
  - 지역 검색기능
  - shake모션을 이용한 랜덤추천기능

---

### navigation 구조

```bash
RootStack
├── MainTab
│   ├── Main
│   │    ├── Home
│   │    ├── StartingPoint
│   │    ├── Filter
│   │    ├── Result,ResultMap
│   │    └── Detail
│   │
│   ├── Search
│   │    ├── SearchMain
│   │    └── Detail
│   │
│   ├── Mypage
│   │    ├── MypageMain
│   │    └── Detail
│   │
│   └── Setting
│        ├── SettingMain
│        └── About
│
```

---

### 커밋 컨벤션

```
feat : 새로운 기능 추가
fix : 버그 수정
docs : 문서 수정
style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
refactor : 코드 리펙토링
test : 테스트 코드, 리펙토링 테스트 코드 추가
chore : 빌드 업무 수정, 패키지 매니저 수정
```
