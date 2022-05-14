import Router from "./routes"
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
