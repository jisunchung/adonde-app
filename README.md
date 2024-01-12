# 어디든 앱 개발

기존 [어디든 웹 프로젝트](https://github.com/forrestpark/adonde.kr?tab=readme-ov-file) 를 앱으로 만든 프로젝트

기술 스택 : RN, Expo, Javascript, Node.js, css

본인의 역할 : PM, 프론트엔드, 디자인

팀원 : 백엔드(1명), 프론트엔드(본인)

### + 앱에서 새로 추가되는 기능

    - 수익성을 고려한 광고기능
    - 지역의 날씨데이터
    - 지역 검색기능
    - shake모션을 이용한 랜덤추천기능

#### 유저플로우

<img width="739" alt="스크린샷 2023-10-16 오전 8 53 02" src="https://github.com/adonde-app/Frontend/assets/65282581/2d034e46-172e-4404-8e99-984a8b45bd3f">

#### api 명세서

[api 명세서](https://stop-line-world.tistory.com/7)

<img width="581" alt="스크린샷 2023-10-16 오전 8 51 31" src="https://github.com/adonde-app/Frontend/assets/65282581/8cffb085-3883-4029-aff9-a7e3bd534212">

#### 와이어프레임

<img width="689" alt="스크린샷 2023-10-16 오전 8 51 51" src="https://github.com/adonde-app/Frontend/assets/65282581/fddef272-2cb6-44b1-a55f-481449e9c6bb">

#### 협업과정

##### - trelllo, google docs 사용

<img width="1511" alt="스크린샷 2023-10-15 오전 12 09 16" src="https://github.com/adonde-app/Frontend/assets/65282581/5eac5cfa-ceba-458b-af3e-749e5ffe67af">
<img width="1454" alt="스크린샷 2023-10-15 오전 12 26 12" src="https://github.com/adonde-app/Frontend/assets/65282581/135d07ff-0042-4a05-b738-08549245693e">
<img width="1116" alt="스크린샷 2023-10-15 오전 12 25 52" src="https://github.com/adonde-app/Frontend/assets/65282581/ebeeaab7-8ce9-4feb-b24b-458e049bae6e">
<img width="1311" alt="스크린샷 2023-10-15 오전 12 09 52" src="https://github.com/adonde-app/Frontend/assets/65282581/6ca955f7-fb9b-49df-936e-6a5fbd39b78f">

##### 커밋컨벤션

<img width="1249" alt="스크린샷 2023-10-16 오전 10 06 34" src="https://github.com/adonde-app/Frontend/assets/65282581/104316ad-e21b-4607-9644-c556d10e4bcc">

##### 리팩토링 (진행중..)

[리팩토링 과정](https://stop-line-world.tistory.com/15)
<img width="385" alt="스크린샷 2023-10-16 오전 9 16 27" src="https://github.com/adonde-app/Frontend/assets/65282581/647f5eda-6bc3-4ab6-917d-52fb07be208e">
<img width="349" alt="스크린샷 2023-10-16 오전 9 16 14" src="https://github.com/adonde-app/Frontend/assets/65282581/1f07374f-4cb8-46dc-82a0-02a8bbc8aad5">

##### 시연 영상

[개발 시연 영상](https://www.youtube.com/watch?v=CnPyl5-3AvI)

#### 커밋컨벤션

<img width="1249" alt="스크린샷 2023-10-16 오전 10 06 34" src="https://github.com/adonde-app/Frontend/assets/65282581/104316ad-e21b-4607-9644-c556d10e4bcc">

#### 리팩토링 (진행중..)

[리팩토링 과정](https://stop-line-world.tistory.com/category/%EC%96%B4%EB%94%94%EB%93%A0%20%EC%95%B1%20%EA%B0%9C%EB%B0%9C%EA%B8%B0/2%EC%B0%A8%20%EA%B5%AC%ED%98%84)

예시 : 거리 선택 필터를 사용자가 이해하기 쉽도록 지도를 첨부해서 시각화함

#### 시연 영상

[개발 시연 영상](https://www.youtube.com/watch?v=CnPyl5-3AvI)

##### 실행 방법 : expo 앱 다운로드 → 아래 qr코드를 찍어 앱을 열어준다

<img width="434" alt="스크린샷 2023-10-15 오전 12 32 10" src="https://github.com/adonde-app/Frontend/assets/65282581/4e7cd076-e4f0-42f9-9e62-0cdf1d72dba0">
<img width="440" alt="스크린샷 2023-10-15 오전 12 31 58" src="https://github.com/adonde-app/Frontend/assets/65282581/c5c60ff7-d040-4dc6-9767-1ec5578c0206">

---

## navigation 구조

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

## 커밋 컨벤션

```
feat : 새로운 기능 추가
fix : 버그 수정
docs : 문서 수정
style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
refactor : 코드 리펙토링
test : 테스트 코드, 리펙토링 테스트 코드 추가
chore : 빌드 업무 수정, 패키지 매니저 수정
```
