import Router from "./routes"
import styles from './App.module.scss'
import { MobileView, BrowserView } from "react-device-detect"

const App = () => {
  return (
    <>
      <MobileView>
        <Router />
      </ MobileView>
      <BrowserView>모바일 버전에서 확인해주세요</BrowserView>
    </>
  )
}

export default App

// 리드미 작성
// 브라우저 버전 글 화면 띄워주기