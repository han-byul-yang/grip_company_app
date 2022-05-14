import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserView, MobileView} from 'react-device-detect'

import './styles/index.scss'
import reportWebVitals from './reportWebVitals'

import {RecoilRoot} from 'recoil'
import Router from 'components/routes'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <MobileView>
        <Router />
      </ MobileView>
      <BrowserView>
        <div style={{fontSize: '50px'}}>모바일 버전에서 확인해주세요</div>
      </BrowserView>
    </RecoilRoot>
  </React.StrictMode>
)

reportWebVitals()

// 파일 구조 정리 *
// import 나열 순서 정리 *
// 최적화 *
// 리드미 작성
// 브라우저 버전 글 화면 띄워주기 *

// 즐겨찾기 삭제 창 띄워주기
// 무한 스크롤링
// 빈 페이지 시 무비 없음 화면 띄워주기
// 즐겨찾기 localstorage
// 검색 페이지에 즐겨찾기 영화 표시해주기(시간 남으면 즐겨찾기 중복 경고창 띄워주기)
// 즐겨찾기 드래그 앤 드랍
// 스타일 정리(폰트, 영화리스트, 탭 이동 색깔)