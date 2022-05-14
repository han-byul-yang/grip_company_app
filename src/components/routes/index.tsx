import {BrowserRouter, Route, Routes} from 'react-router-dom'

import BookMark from './BookMark'
import Search from './Search'

const Router = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path='bookmark' element={<BookMark />} />
        </Routes>
      </BrowserRouter>
    )
}

export default Router

// router 구조 확실히 알고 고치기 *
// head 대신에 GNB