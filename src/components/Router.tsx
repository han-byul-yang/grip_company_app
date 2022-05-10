import React from 'react'
import {BrowserRouter, HashRouter, Route, Routes} from 'react-router-dom'
import BookMark from './routes/BookMark'
import Search from './routes/Search'

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

// router 구조 확실히 알고 고치기