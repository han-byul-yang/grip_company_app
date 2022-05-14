import {BrowserRouter, Route, Routes} from 'react-router-dom'

import BookMark from './BookMark'
import Search from './Search'

const Router = () => {
    return (
      <BrowserRouter  basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path='bookmark' element={<BookMark />} />
        </Routes>
      </BrowserRouter>
    )
}

export default Router
