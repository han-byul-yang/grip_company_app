import Router from "./Router"
import styles from './App.module.scss'
import { MobileView, BrowserView } from "react-device-detect"

const App = () => {
  return (
    <>
      <MobileView>
        <div className={styles.defaultStyle}>
          <Router />
        </div>
      </ MobileView>
      <BrowserView>모바일 버전에서 확인해주세요</BrowserView>
    </>
  )
}

export default App