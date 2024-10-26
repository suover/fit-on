# FitOn

### 🔗 배포 URL : https://fiton.kr/

**운동과 건강 관련 쇼핑몰 및 종합 커뮤니티 웹 서비스**

쇼핑몰, 커뮤니티, 운동 루틴, 정보 게시판을 통해 다양한 운동 및 건강 정보를 제공

![fitonmain](https://github.com/user-attachments/assets/21fab55c-252f-4246-8db7-5d5d960e48fc)

## 🔗 바로가기

✅[노션](https://www.notion.so/Fit-On-4c9438e2fcd24edf95cf51f2d912b85f?pvs=21)
✅[피그잼](https://www.figma.com/board/b6zO3Q4VkQKkiNiJ7ZlHz4/FitOn-FigJam?node-id=0-1)
✅[프레젠테이션](https://www.miricanvas.com/v/13a1s7j)

- 프로젝트 과정을 모두 볼 수 있습니다.
- 팀원들의 회고록을 볼 수 있습니다.

## 👨‍👩‍👧‍👦 팀 소개

![스크린샷 2024-07-30 135827](https://github.com/user-attachments/assets/81b6e3ab-6a19-42a8-84f3-44a7874928ed)

## 💻 프로젝트 소개

### 💡프로젝트 주제

### FitOn

운동과 건강 관련 쇼핑몰 및 종합 커뮤니티 웹 서비스

### 💡개발 동기

운동과 건강에 대한 관심이 증가함에 따라, 많은 사람들이 체계적으로 운동 정보를 얻고,
운동 루틴을 기록하며, 운동 관련 용품을 쇼핑할 수 있는 종합적인 플랫폼의 필요성을 느껴 기획하게 되었습니다.

### 💡핵심 기능

- 사용자들이 운동 관련 정보를 쉽게 찾을 수 있도록 다양한 운동 루틴, 운동 팁, 운동 관련 정보를 제공하는 게시판을 구현했습니다.
- 운동을 하면서 겪는 어려움이나 성과를 공유하고, 서로 조언을 나눌 수 있는 커뮤니티를 구축하여 사용자들이 서로 소통하고 동기부여를 받을 수 있도록 했습니다.
- 운동용품, 보충제, 식품 등을 구매할 수 있는 쇼핑몰이 있습니다. 사용자는 다양한 상품을 한 곳에서 비교하고, 리뷰를 확인하며 다양한 운동 관련 용품을 쇼핑할 수 있습니다.
- 사용자 편의를 위해 일반 로그인뿐만 아니라 Google, Kakao, Naver 소셜 로그인 기능을 지원하며, 사용자가 자신의 개인 설정, 운동 루틴 등을 관리할 수 있는 마이 페이지를 제공합니다.
- 플랫폼의 효율적인 관리를 위해 관리자 페이지를 제공하여 게시판, 사용자, 상품 등을 관리할 수 있습니다.

### 💡개발 환경

<img width="100%" alt="수정본" src="https://github.com/user-attachments/assets/23c572a6-65be-4b67-ac8b-d066bfb25fcd">

- **Front-End**: React / TypeScript / Styled-Component / React-MUI / React-Quill

- **Back-End**: Java / Spring Boot / Gradle / MySQL / Mybatis / AWS

- **Tools**: IntelliJ IDEA / VS CODE / Figma

- **Collarboration**: Github / Notion / Discord

### 💡ERD

![스크린샷 2024-06-24 122129](https://github.com/user-attachments/assets/b54c50da-6699-4934-a170-3d2c7cf4e50e)

### ✅[ERD 링크](https://www.erdcloud.com/d/PhhZMaP3zEJExyz44)

### 💡프로젝트 구성

**📃 메인 페이지**

- 조회수 순위에 따른 인기상품 및 인기글 상위 노출
- 각 게시판 페이지 이동 및 로그인/회원가입 페이지 이동

![main](https://github.com/user-attachments/assets/6061b3c9-123a-4d8b-a6f4-679dd044655a)

**:ledger: 운동 정보 페이지**

- 운동 관련 정보 게시글 CRUD (관리자만 가능) / 댓글 및 대댓글 CRUD

![info](https://github.com/user-attachments/assets/903bc719-d500-49ca-b2a0-724c755e4363)

**:credit_card: 운동용품 쇼핑 페이지**

- 운동 관련 상품 판매 쇼핑몰 쇼핑리스트

![mall](https://github.com/user-attachments/assets/4ab5715d-bdc1-46b2-a00b-587b809c01ef)

- 상품 상세 페이지

![mallDetail](https://github.com/user-attachments/assets/244501ee-e069-4c58-b506-8e78e99ce52a)

- 장바구니 페이지 : 상품 수량 설정, 구매할 상품 선택 기능, 선택 상품 삭제 기능, 선택 상품 주문

![cart](https://github.com/user-attachments/assets/0bf2ca35-889e-43db-a67c-a245e2cae797)

- 상품 주문 페이지 : 카카오 주소 API, 주소지 저장, 결제 페이지 이동

![상품주문](https://github.com/user-attachments/assets/3c871137-0a2f-41b2-8c6c-433b9becabd8)

- 결제 기능 : KG 이니시스 결제 API

![결제기능](https://github.com/user-attachments/assets/d9bcf28b-af4c-4d0f-a2ce-997c5ab0a146)

**:muscle: 운동 관련 커뮤니티 페이지**

- 글 목록, 카테고리별 조회 및 조회수에 따른 인기글 조회

![communityboard](https://github.com/user-attachments/assets/02083eb8-0cf8-43e6-ba74-c58044b3264f)

**:runner: 운동 루틴 페이지**

- 운동 루틴 게시판 리스트

![루틴게시판](https://github.com/user-attachments/assets/d90506b4-8bb4-429d-a8d8-7291ed6f8fbe)

- 운동 루틴 게시글 작성 기능

![routine글쓰기](https://github.com/user-attachments/assets/18cae518-c08b-4862-b3f0-abd44cda9784)

**📃 마이 페이지**

- 작성한 글 수, 댓글 수, 받은 좋아요 수 조회 및 주문한 내역 조회

![maypage](https://github.com/user-attachments/assets/37980e6b-e0b3-4dd3-9bb7-d820aa2598bf)

- 프로필 이미지 추가 및 변경

![profileImg](https://github.com/user-attachments/assets/a2f7ece9-e24c-4dd6-b696-5c6e131dbf80)

**:bust_in_silhouette: 회원가입/로그인 페이지**

- 일반 로그인 및 카카오톡/네이버/구글 소셜 계정 연동 로그인

![login](https://github.com/user-attachments/assets/472cec42-0832-4bb2-8bb1-8e0eebf99447)

- 이메일/닉네임 중복 확인 및 유효성 검사, 비밀번호 조건 및 확인 기능

![signin2](https://github.com/user-attachments/assets/8702c65a-243a-476c-8251-a2dfc5a71ef9)

---

## 💡시연영상

### 📃메인페이지

![main_g](https://github.com/user-attachments/assets/8ecfe423-d8e8-46b4-b7a4-d2100bd40de8)

---

### 🔑 로그인

![login_g](https://github.com/user-attachments/assets/ee7a1355-44d8-4387-98b1-c572cbe7a6c2)

---

### 💳 쇼핑몰

![mall_g](https://github.com/user-attachments/assets/522775a0-3af9-485f-a1a6-e83ba63d0aeb)

---

### 👩🏻‍🤝‍👩🏻 커뮤니티 게시판

![community_g](https://github.com/user-attachments/assets/5e953485-0291-4345-963b-b4bd347e7fc7)

---

### 💪 루틴 게시판

![routine_g](https://github.com/user-attachments/assets/44c285ac-f568-4d3c-aca6-1d535f791068)

---

### 📰 운동 정보 게시판

![info_g](https://github.com/user-attachments/assets/02b20c31-54ca-45ea-a29c-ef0f00084118)

---

### 📔 마이페이지

![mypage_g](https://github.com/user-attachments/assets/b727da33-89c6-4388-af48-6337baaba785)

---

### ⌨ 댓글 & 대댓글 기능

![comment_g](https://github.com/user-attachments/assets/8bf3fbfd-3b3e-4931-8519-d4ac5e381988)

