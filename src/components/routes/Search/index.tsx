import { useCallback, useEffect, useMemo, useState } from 'hooks'
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
  const [apiData, setApiData] = useState<IMovieData[]>([])
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
        setApiData((prevState) => [...prevState,...res.data.Search])
        setNoMovie(false)
      }
      }).catch((error) => {
        console.log(error.message)
    })
  }, [page, searchTitle])

  useEffect(() => {
    setBookmarkIdList([]) // 이름 직관적으로 변경 필요
    bookmarkedMovies.forEach((bookmark) => 
    apiData.forEach((api) => 
    JSON.stringify(api) === JSON.stringify(bookmark) && setBookmarkIdList((prevState) => [...prevState, bookmark.imdbID])))
  },[apiData, bookmarkedMovies])

  const testFetch = () =>
    // eslint-disable-next-line no-promise-executor-return
    new Promise((res) => setTimeout(res, 4000))

  useEffect(() => {
    let observer: IntersectionObserver
    if (target) {
      observer = new IntersectionObserver(async ([entry]) => {
        if (!entry.isIntersecting) return
        setisLoading(true)
        await testFetch()
        observer.unobserve(entry.target) // 새로 target이 설정되는 게 아니기 때문에 사실상 여기서는 필요 x
        setPage(prevState => prevState + 1) 
        setisLoading(false)
        observer.observe(target) // 새로 target이 설정되는 게 아니기 때문에 사실상 여기서는 필요 x
      }, {
        threshold: 1,
      })
      observer.observe(target)
    }
    return () => observer && observer.disconnect()
  }, [page, target])

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <header className={styles.header}>
          <Header setSearchTitle={setSearchTitle} setPage={setPage} setApiData={setApiData} />
        </header>
        <section className={styles.section}>
          {
          noMovie ?
            <p>검색 결과가 없습니다</p> :
            <Suspense fallback={<Loading />}>
              <ul className={styles.resultList}>
                {
                apiData?.map((movie) => 
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

// title recoil에 저장해서 탭 이동 후 검색 결과 유지되게 해주기
// api error 제대로 처리해주기
// api 계속 불러오는 거 처리해줘야함 
// 이미지나 title 을 불러오지 못할 때 처리(대신 이미지도)
// 재로딩이 계속 되니까 title을 recoil로 처리 해줘야 하나
// 이 컴포넌트에 head랑 footer태그를 같이 넣어줘야 할까 *
// suspense 로 로딩 넣기(로딩 css 만들어주기)
// 검색 결과 몇 건 삭제하거나 기능구현
// lazy를 사용해줄 수 있을 것 
// input으로 검색어 바꾸면 apiData 리스트도 삭제 *
// api불러올 때 마다 list에 데이터를 추가해주면 다른 검색어 일 때 결과 데이터가 붙어서 나옴 *
// 즐겨찾기 중복 알림
// 로딩 시 탭 사라짐 현상
// 무한 로딩 css
// 페이지수  한계 api 제한 
  /* if (!apiData) return null */

  //  const handleWindowScroll = () => {
  //   setScrollLocation(window.scrollY)
  //   console.log(window.innerHeight)
  //   console.log(window.scrollY)
  //   console.log(document.body.scrollHeight)
  //   if (window.scrollY === window.innerHeight) {
  //     setPage((preState) => preState + 1)
  //     setApiData((prevState) => [...prevState, ...apiData])
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
