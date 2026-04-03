# THE AROMA SHOP — Official Homepage (Final)

**Pure Nature, Honest Formulation.**
USDA Organic · Vegan · Cruelty-Free · Halal · German Dermatest

---

## 프로젝트 개요

The Aroma Shop 공식 홈페이지 — 창업자 스토리, 초음파 오일 수용화 특허기술, 민감성 피부/가족 안전 포지셔닝, 국제 인증 기반 신뢰 메시지 중심의 **4개국어 정적 웹사이트**.

**지원 언어:** 한국어 (ko) · English (en) · 中文简体 (zh) · 日本語 (ja)

---

## ✅ 완료된 기능 전체 목록

### 🌐 공통 UI
| 항목 | 내용 |
|------|------|
| SEO 메타태그 | title, description, keywords, author |
| Open Graph | og:title/description/image/url/site_name |
| Twitter Card | summary_large_image |
| Canonical URL | https://www.thearomashop.com |
| 4개국어 전환 | ko/en/zh/ja + localStorage 저장 + 브라우저 자동 감지 |
| 공지바 | 4개 인증 메시지 자동 로테이션 (4초) |
| 네비게이션 | 스크롤 시 투명→불투명 전환, 모바일 햄버거 |
| 스크롤 애니메이션 | Intersection Observer reveal 효과 |
| 뒤로가기 버튼 | 스크롤 400px 이상 시 노출 |
| 라이트박스 | 인증서 이미지 클릭 → 전체화면 확대 (ESC 닫기) |
| 프린트 스타일 | @media print — 불필요 영역 숨김, 깔끔한 출력 |
| 접근성 | :focus-visible 키보드 네비게이션 지원 |

### 🌿 브랜드 섹션
- 히어로: USDA/Vegan/CF/Halal 뱃지, 패럴랙스 배경
- 브랜드 가치 4항목: 100% 자연유래 / 초음파기술 / 무첨가원칙 / 지속가능한 스마트 패키징
- 브랜드 철학: **8년+ 연구역사** 배지
- 초음파 기술 4단계 설명

### 🛍 컬렉션 (5개, 필터 포함)
| 컬렉션 | 제품 |
|--------|------|
| Tea Tree | Mist 100ml / Mask Pack / Spot Roll-on |
| Rose Essence ⭐ BEST | Toner 100ml / Emulsion 100ml / Jojoba Oil 50ml |
| Rosemary Scalp | Scalp Mist 100ml / Hair Growth Oil 60ml / Roll-on 10ml |
| Foot Care | Foot Care Mist 100ml / Foot Roll-on / Heel Balm (Aluminum Tin) |
| Mama Bloom | Belly Oil 100ml / Body Balm / Calming Mist |

- 모든 카드 USDA Organic 녹색 마크 표시
- 가격 완전 제거

### 🏆 인증 섹션

**인증 카드 6개**
- USDA Organic / Vegan Certified / Cruelty-Free / Halal Certified / German Dermatest / Atopy Skin Tested

**Trust Stats**
- **8+** 년 연구 경험 / **6개** 국제 인증 / **0%** 계면활성제&방부제 / **8+** 수출 국가

### 📄 공식 인증서 원본 섹션 — 최신 상태 (2026.03.31)

| 인증서 | 파일 | 상태 |
|--------|------|------|
| 🔬 한국 특허 | KR_patent.pdf (제10-1798198호) | ✅ 완료 |
| 🔬 미국 특허 | US_patent.pdf (200814 미국특허권_애드홈_removed.pdf) | ✅ 완료 |
| 🔬 캐나다 특허 | CA_patent.pdf | ✅ 완료 |
| 🔬 호주 특허 | AU_patent.pdf (AU 2017409611) | ✅ 완료 |
| 🔬 일본 특허 | JP_patent.pdf (6665976) | ✅ 완료 |
| 🔬 중국 특허 | CN_patent.pdf (201780003104X, 2021.07 등록) | ✅ 완료 |
| 🌿 USDA Organic | USDA_certificate.pdf (Control Union No.1780869186) + USDA.gov 공식조회 링크 | ✅ 완료 |
| 💚 Vegan | vegan1~3.jpg 갤러리 (VCG-039001/002/003, ~2026.05.24) | ✅ 완료 |
| 🌙 Halal | HALAL_certificate.pdf (KMFHC25-611) | ✅ 완료 |
| 🔵 German Dermatest | 이미지 슬롯 4개 (재업로드 필요) | ⏳ 대기 |
| ❤️ Cruelty-Free | — | ⏳ 대기 |

### 📖 창업자 스토리 / 성분 / 고객후기 / B2B / 뉴스레터 / 문의 / 푸터
- 창업자 인용문 + 아토피·여드름·탈모 근본원인 스토리
- 핵심 성분 9종 (Organic Tea Tree/Rose/Rosemary/Oregano/Thyme/Tamanu/Peppermint/Aloe Vera/Glycerin)
- 고객 후기 3건 (USA · Japan · China)
- B2B Export Catalog (MOQ 300/SKU, 8개국 수출)
- 문의 폼 (B2B/OEM/ODM/카탈로그/일반)
- 푸터: 사업자 정보, 컬렉션/브랜드/B2B 링크, 4개국어 전환

---

## 파일 구조

```
index.html                  메인 페이지 (SEO/OG 최적화 완료)
css/
  style.css                 전체 스타일 + 라이트박스 + 더마테스트 갤러리 + 프린트
js/
  i18n.js                   4개국어 번역 (ko/en/zh/ja)
  main.js                   동작 JS
certificates/
  KR_patent.pdf             한국 특허 제10-1798198호
  US_patent.pdf             미국 특허 (200814 미국특허권_애드홈_removed.pdf 교체본)
  CA_patent.pdf             캐나다 특허
  AU_patent.pdf             호주 특허 AU2017409611
  JP_patent.pdf             일본 특허 6665976
  CN_patent.pdf             중국 특허 201780003104X (2021.07)
  USDA_certificate.pdf      USDA Organic — Control Union No.1780869186
  HALAL_certificate.pdf     Halal — KMFHC25-611
images/
  vegan1.jpg                비건 인증서 — 로즈 에센스 페이스 오일 VCG-039003
  vegan2.jpg                비건 인증서 — 로즈 수딩 젤 VCG-039001
  vegan3.jpg                비건 인증서 — 로즈 에센스 토너 VCG-039002
  dermatest1~4.jpg          ← 재업로드 필요
```

---

## ⏳ 남은 작업

| 항목 | 비고 |
|------|------|
| German Dermatest 이미지 재업로드 | `images/dermatest1~4.jpg` |
| Cruelty-Free 인증서 업로드 | 이미지 또는 PDF |

---

## 🚀 배포

배포는 **Publish 탭**에서 진행합니다. Publish 탭 위치: 화면 상단 우측 탭 바에서 **"Publish"** 탭 클릭 → **"Publish"** 버튼 누르면 즉시 배포됩니다.

---

## 회사 정보

**THE AROMA SHOP (ADHOME CO., LTD.)**
사업자등록번호: 224-81-12042
주소: 167-5, Nampyeong-ro, Yangji-myeon, Cheoin-gu, Yongin-si, Gyeonggi-do, Korea
이메일: gelloy@gelloy.com | 전화: +82-10-6260-7822
웹사이트: www.thearomashop.com

*© 2026 THE AROMA SHOP. All rights reserved.*
