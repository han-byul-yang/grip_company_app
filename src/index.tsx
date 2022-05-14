import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import reportWebVitals from './reportWebVitals'
import App from './components/App'
import {BrowserView, MobileView} from 'react-device-detect'
import {RecoilRoot} from 'recoil'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

// 파일 구조 정리
// import 나열 순서 정리
// 최적화

// 즐겨찾기 삭제 창 띄워주기
// 무한 스크롤링
// 빈 페이지 시 무비 없음 화면 띄워주기
// 즐겨찾기 localstorage
// 검색 페이지에 즐겨찾기 영화 표시해주기(시간 남으면 즐겨찾기 중복 경고창 띄워주기)
// 즐겨찾기 드래그 앤 드랍
// 스타일 정리(폰트, 영화리스트, 탭 이동 색깔)