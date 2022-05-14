import { useEffect, useState } from 'hooks'
import { Suspense } from 'react'

import styles from "./Search.module.scss"
import { MovieApi } from 'utils/movieApi'
import { IMovieData } from "types/movie"

import BookMarkModal from "../../Modal"
import Header from "../../Header"
import Tabs from "../../Tabs"
import { useRecoilValue } from 'recoil'
import { BookMarkListAtom } from 'utils/atom'
import Loading from 'components/Loading/Loading'
import MovieCards from 'components/movieCards'

const Search = () => {
  const [apiMovieData, setApiMovieData] = useState<IMovieData[]>([])
  const [totalResult, setTotalResult] = useState(0)
  const [searchTitle, setSearchTitle] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [noMovie, setNoMovie] = useState(true)
  const [bookmarkIdList, setBookmarkIdList] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const bookmarkedMovies = useRecoilValue(BookMarkListAtom)
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null)
  const [isLoading, setisLoading] = useState(false)

  useEffect(() => {
    MovieApi({
      s: searchTitle,
      page
    }).then((res) => {
      if (res.data.Response === 'False') {
        setNoMovie(true)
      } else {
        setApiMovieData((prevState) => [...prevState,...res.data.Search])
        setTotalResult(parseInt(res.data.totalResults, 10))
        setNoMovie(false)
      }
      }).catch((error) => {
        return error.message
    })
  }, [page, searchTitle])

  useEffect(() => {
    setBookmarkIdList([])
    bookmarkedMovies.forEach((bookmark) => 
    apiMovieData.forEach((api) => 
    JSON.stringify(api) === JSON.stringify(bookmark) && setBookmarkIdList((prevState) => [...prevState, bookmark.imdbID])))
  },[apiMovieData, bookmarkedMovies])

  const testFetch = () =>
    // eslint-disable-next-line no-promise-executor-return
    new Promise((res) => setTimeout(res, 4000))

  useEffect(() => {
    let observer: IntersectionObserver
    if (target) {
      observer = new IntersectionObserver(async ([entry]) => {
        if (!entry.isIntersecting || totalResult < (page * 10)) return
        setisLoading(true)
        await testFetch()
        observer.unobserve(entry.target)
        setPage(prevState => prevState + 1) 
        setisLoading(false)
        observer.observe(target)
      }, {
        threshold: 1,
      })
      observer.observe(target)
    }
    return () => observer && observer.disconnect()
  }, [page, target, totalResult])

  return (
    <div className={styles.defaultStyle}>
      <Suspense fallback={<Loading />}>
        <header className={styles.header}>
          <Header setSearchTitle={setSearchTitle} setPage={setPage} setApiMovieData={setApiMovieData} />
        </header>
        <section className={styles.section}>
          {
          noMovie ?
            <p>검색 결과가 없습니다</p> :
            <Suspense fallback={<Loading />}>
              <p className={styles.result}>{totalResult} 건의 검색 결과</p>
              <ul className={styles.resultList}>
                {
                apiMovieData.map((movie) => 
                  <MovieCards key={movie.imdbID} movie={movie} setOpenModal={setOpenModal} bookmarkIdList={bookmarkIdList}  state='search' />
                  )}
                <div className="lastMovie" ref={setTarget}>{isLoading && <div className={styles.loading}>loading</div>}</div>
              </ul> 
            </Suspense>
          }
        </section>
        <nav className={styles.nav}>
          <Tabs />
        </nav>
        <BookMarkModal openModal={openModal} setOpenModal={setOpenModal} state='forBookmark' bookmarkIdList={bookmarkIdList} />
      </Suspense>
    </div>
  )
}

export default Search

// title recoil에 저장해서 탭 이동 후 검색 결과 유지되게 해주기 x
// api error 제대로 처리해주기 *
// api 계속 불러오는 거 처리해줘야함 *
// 이미지나 title 을 불러오지 못할 때 처리(대신 이미지도) *
// lazy를 사용해줄 수 있을 것 
// suspense 로 로딩 넣기(로딩 css 만들어주기)
// 로딩 시 탭 사라짐 현상
// input으로 검색어 바꾸면 apiMovieData 리스트도 삭제 *
// 재로딩이 계속 되니까 title을 recoil로 처리 해줘야 하나 x
// 이 컴포넌트에 head랑 footer태그를 같이 넣어줘야 할까 *
// 검색 결과 몇 건 삭제하거나 기능구현 *
// api불러올 때 마다 list에 데이터를 추가해주면 다른 검색어 일 때 결과 데이터가 붙어서 나옴 *
// 즐겨찾기 중복 알림 *
// 페이지수  한계 api 제한(더이상 로드되지 않게 막음) *
  /* if (!apiMovieData) return null */

  //  const handleWindowScroll = () => {
  //   setScrollLocation(window.scrollY)
  //   console.log(window.innerHeight)
  //   console.log(window.scrollY)
  //   console.log(document.body.scrollHeight)
  //   if (window.scrollY === window.innerHeight) {
  //     setPage((preState) => preState + 1)
  //     setApiMovieData((prevState) => [...prevState, ...apiData])
  //   } 
  // }

  // useEffect(() => {
  //   window.addEventListener('scroll', handleWindowScroll)
  //   return (() => {
  //     window.removeEventListener('scroll', handleWindowScroll)
  //   })
  // }, [scrollLocation])
  //

// import React, { lazy } from 'react';

// const AvatarComponent = lazy(() => import('./AvatarComponent'));

// const DetailsComponent = () => (
//   <div>
//     <AvatarComponent />
//   </div>
// )


  // const lastMovieEle = document.querySelectorAll('.lastMovie')

  // const observer = new IntersectionObserver( async entries => {
  //   const lastMovie = entries[0]
  //   if (!lastMovie.isIntersecting) return
  //   observer.unobserve(lastMovie.target)
  //   await setPage((prevState) => prevState + 1)
  //   await callMovieApi(page)
  //   observer.observe(lastMovie.target)
  // },{
  //   threshold: 1
  // })

  // observer.observe(lastMovieEle[0])
