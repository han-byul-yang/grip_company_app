import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserView, MobileView} from 'react-device-detect'

import './styles/index.scss'
import reportWebVitals from './reportWebVitals'

import {RecoilRoot} from 'recoil'
import Router from 'routes'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <MobileView>
        <Router />
      </ MobileView>
      <BrowserView>
        <div style={{fontSize: '50px'}}>모바일 뷰 버전에서 확인해주세요</div>
      </BrowserView>
    </RecoilRoot>
  </React.StrictMode>
)

reportWebVitals()
